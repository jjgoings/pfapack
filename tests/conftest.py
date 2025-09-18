"""Test-wide profiling helpers for optional cProfile collection."""
from __future__ import annotations

import cProfile
import os
import re
from pathlib import Path

import pytest

PROFILE_FLAG_ENV = "PFAPACK_PROFILE_TESTS"
PROFILE_DIR_ENV = "PFAPACK_PROFILE_DIR"


def pytest_addoption(parser: pytest.Parser) -> None:
    """Expose CLI toggles so profiling can be driven by pytest options."""
    group = parser.getgroup("pfapack profiling")
    group.addoption(
        "--pfapack-profile-tests",
        action="store_true",
        default=False,
        help="Enable cProfile collection for each test case.",
    )
    group.addoption(
        "--pfapack-profile-dir",
        action="store",
        default=None,
        metavar="DIR",
        help="Directory to write .prof files (defaults to artifacts/profile).",
    )


def _flag_enabled(value: str | None) -> bool:
    if value is None:
        return False
    return value.lower() not in {"", "0", "false", "no"}


def _should_profile(config: pytest.Config) -> bool:
    if config.getoption("--pfapack-profile-tests"):
        return True
    return _flag_enabled(os.environ.get(PROFILE_FLAG_ENV))


def _profile_dir(config: pytest.Config) -> Path:
    cli_dir = config.getoption("--pfapack-profile-dir")
    if cli_dir:
        return Path(cli_dir)
    env_dir = os.environ.get(PROFILE_DIR_ENV)
    if env_dir:
        return Path(env_dir)
    return Path("artifacts/profile")


def _profile_path(nodeid: str, directory: Path) -> Path:
    sanitized = re.sub(r"[^A-Za-z0-9_.-]", "_", nodeid)
    return directory / f"{sanitized}.prof"


@pytest.fixture(autouse=True)
def pfapack_profile_tests(request: pytest.FixtureRequest) -> None:
    """Optionally profile each test and dump stats to individual files."""
    if not _should_profile(request.config):
        yield
        return

    profiler = cProfile.Profile()
    profiler.enable()
    try:
        yield
    finally:
        profiler.disable()
        output_dir = _profile_dir(request.config)
        output_dir.mkdir(parents=True, exist_ok=True)
        stats_path = _profile_path(request.node.nodeid, output_dir)
        profiler.dump_stats(stats_path)
