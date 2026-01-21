#!/usr/bin/env python3
"""Backfill benchmark data for historical commits.

Usage:
    python scripts/backfill_benchmarks.py [--commits N] [--output FILE]

This script:
1. Gets the last N commits on main (or a specified list)
2. Checks out each commit
3. Builds and runs benchmarks
4. Collects results in github-action-benchmark format
5. Outputs a data.js file that can seed the gh-pages branch

Note: Run from repo root. Requires clean working directory.
"""

import argparse
import json
import os
import subprocess
import sys
import tempfile
from datetime import datetime
from pathlib import Path


def run(cmd, check=True, capture=True, cwd=None):
    """Run a shell command."""
    result = subprocess.run(
        cmd,
        shell=True,
        capture_output=capture,
        text=True,
        cwd=cwd,
    )
    if check and result.returncode != 0:
        print(f"Command failed: {cmd}")
        print(result.stderr)
        return None
    return result.stdout.strip() if capture else result


def get_commits(n=10, branch="main"):
    """Get last N commit SHAs from branch."""
    output = run(f"git log {branch} --oneline -n {n} --format='%H'")
    if not output:
        return []
    return output.strip().split("\n")


def get_commit_info(sha):
    """Get commit metadata."""
    timestamp = run(f"git show -s --format=%cI {sha}")
    message = run(f"git show -s --format=%s {sha}")
    return {
        "sha": sha,
        "timestamp": timestamp,
        "message": message[:50] + "..." if len(message) > 50 else message,
    }


def build_at_commit(sha, repo_root):
    """Checkout commit and build."""
    print(f"  Checking out {sha[:8]}...")
    run(f"git checkout {sha}", cwd=repo_root)

    print("  Building Fortran...")
    result = run("make -C external/fortran clean && make -C external/fortran", cwd=repo_root)
    if result is None:
        return False

    print("  Building C interface...")
    result = run("make -C external/c_interface clean && make -C external/c_interface", cwd=repo_root)
    if result is None:
        return False

    return True


def run_benchmarks(repo_root):
    """Run benchmarks and return results."""
    results = {}

    # Set serial environment
    env = os.environ.copy()
    env["OMP_NUM_THREADS"] = "1"
    env["OPENBLAS_NUM_THREADS"] = "1"
    env["MKL_NUM_THREADS"] = "1"

    # Check if phase2_bench.py exists (newer commits)
    bench_script = Path(repo_root) / "bench" / "phase2_bench.py"
    if bench_script.exists():
        print("  Running phase2 tomography benchmark...")
        with tempfile.NamedTemporaryFile(suffix=".json", delete=False) as f:
            tomo_file = f.name

        proc = subprocess.run(
            f"python bench/phase2_bench.py tomography "
            f"--iters 3 --warmup 1 "
            f"--nshadow 64 --ngrid 9 --n-sel 16 --n-full 32 "
            f"--json-out {tomo_file}",
            shell=True,
            capture_output=True,
            text=True,
            cwd=repo_root,
            env=env,
        )

        if proc.returncode == 0 and Path(tomo_file).exists():
            data = json.loads(Path(tomo_file).read_text())
            for r in data.get("runs", []):
                results["phase2_tomography"] = {
                    "value": r["stats"]["mean"],
                    "unit": "s",
                }
            Path(tomo_file).unlink()

        print("  Running phase2 many-small benchmark...")
        with tempfile.NamedTemporaryFile(suffix=".json", delete=False) as f:
            small_file = f.name

        proc = subprocess.run(
            f"python bench/phase2_bench.py many-small "
            f"--iters 3 --warmup 1 "
            f"--outer 8192 --inner 5 --n 8 "
            f"--json-out {small_file}",
            shell=True,
            capture_output=True,
            text=True,
            cwd=repo_root,
            env=env,
        )

        if proc.returncode == 0 and Path(small_file).exists():
            data = json.loads(Path(small_file).read_text())
            for r in data.get("runs", []):
                results["phase2_many_small"] = {
                    "value": r["stats"]["mean"],
                    "unit": "s",
                }
            Path(small_file).unlink()

    # Run pytest benchmarks (should work on most commits)
    print("  Running pytest benchmarks...")
    with tempfile.NamedTemporaryFile(suffix=".json", delete=False) as f:
        pytest_file = f.name

    proc = subprocess.run(
        f"python -m pytest tests/test_performance_timings.py "
        f"--benchmark-json={pytest_file} "
        f"--benchmark-min-rounds=3 -q",
        shell=True,
        capture_output=True,
        text=True,
        cwd=repo_root,
        env=env,
    )

    if proc.returncode == 0 and Path(pytest_file).exists():
        data = json.loads(Path(pytest_file).read_text())
        for b in data.get("benchmarks", []):
            results[b["name"]] = {
                "value": b["stats"]["mean"],
                "unit": "s",
            }
        Path(pytest_file).unlink()

    return results


def format_for_gh_benchmark(all_results):
    """Format results for github-action-benchmark data.js format."""
    # Group by benchmark name
    benchmarks = {}
    for commit_sha, commit_data in all_results.items():
        for bench_name, bench_result in commit_data.get("results", {}).items():
            if bench_name not in benchmarks:
                benchmarks[bench_name] = []
            benchmarks[bench_name].append({
                "commit": {
                    "id": commit_sha,
                    "message": commit_data["info"]["message"],
                    "timestamp": commit_data["info"]["timestamp"],
                },
                "date": int(datetime.fromisoformat(
                    commit_data["info"]["timestamp"].replace("Z", "+00:00")
                ).timestamp() * 1000),
                "value": bench_result["value"],
                "unit": bench_result["unit"],
            })

    # Sort each benchmark by date
    for name in benchmarks:
        benchmarks[name].sort(key=lambda x: x["date"])

    return benchmarks


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--commits", "-n", type=int, default=10,
        help="Number of recent commits to benchmark (default: 10)"
    )
    parser.add_argument(
        "--branch", "-b", default="main",
        help="Branch to get commits from (default: main)"
    )
    parser.add_argument(
        "--output", "-o", default="backfill-data.json",
        help="Output file (default: backfill-data.json)"
    )
    parser.add_argument(
        "--sha", action="append",
        help="Specific SHA(s) to benchmark (can be repeated)"
    )
    args = parser.parse_args()

    repo_root = Path(__file__).parent.parent.resolve()
    os.chdir(repo_root)

    # Check for clean working directory
    status = run("git status --porcelain")
    if status:
        print("Error: Working directory not clean. Commit or stash changes first.")
        print(status)
        sys.exit(1)

    # Get current branch to restore later
    original_ref = run("git rev-parse --abbrev-ref HEAD")
    if original_ref == "HEAD":
        original_ref = run("git rev-parse HEAD")

    # Get commits to benchmark
    if args.sha:
        commits = args.sha
    else:
        commits = get_commits(args.commits, args.branch)

    if not commits:
        print("No commits found")
        sys.exit(1)

    print(f"Benchmarking {len(commits)} commits...")

    all_results = {}

    try:
        for i, sha in enumerate(commits):
            print(f"\n[{i+1}/{len(commits)}] Commit {sha[:8]}")

            info = get_commit_info(sha)
            print(f"  Message: {info['message']}")

            if not build_at_commit(sha, repo_root):
                print(f"  SKIP: Build failed")
                continue

            results = run_benchmarks(repo_root)

            if results:
                all_results[sha] = {
                    "info": info,
                    "results": results,
                }
                print(f"  OK: {len(results)} benchmarks")
            else:
                print(f"  SKIP: No benchmark results")

    finally:
        # Restore original branch
        print(f"\nRestoring {original_ref}...")
        run(f"git checkout {original_ref}")
        run("make -C external/fortran clean && make -C external/fortran")
        run("make -C external/c_interface clean && make -C external/c_interface")

    if not all_results:
        print("No results collected")
        sys.exit(1)

    # Output results
    output_path = Path(args.output)

    # Raw results
    output_path.write_text(json.dumps(all_results, indent=2))
    print(f"\nRaw results: {output_path}")

    # Format for gh-benchmark
    gh_format = format_for_gh_benchmark(all_results)
    gh_path = output_path.with_suffix(".gh.json")
    gh_path.write_text(json.dumps(gh_format, indent=2))
    print(f"GH-benchmark format: {gh_path}")

    # Summary
    print(f"\nSummary: {len(all_results)} commits benchmarked")
    for sha, data in all_results.items():
        print(f"  {sha[:8]}: {list(data['results'].keys())}")


if __name__ == "__main__":
    main()
