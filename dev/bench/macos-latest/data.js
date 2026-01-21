window.BENCHMARK_DATA = {
  "lastUpdate": 1769031393451,
  "repoUrl": "https://github.com/jjgoings/pfapack",
  "entries": {
    "PFAPACK Performance (macos-latest)": [
      {
        "commit": {
          "author": {
            "email": "3915169+jjgoings@users.noreply.github.com",
            "name": "jjgoings",
            "username": "jjgoings"
          },
          "committer": {
            "email": "3915169+jjgoings@users.noreply.github.com",
            "name": "jjgoings",
            "username": "jjgoings"
          },
          "distinct": true,
          "id": "c0499f3b30b07e105d718877b6eacd01e21f49e1",
          "message": "Fix macOS CI: create gfortran/gcc symlinks for Homebrew gcc-14",
          "timestamp": "2026-01-21T13:15:00-08:00",
          "tree_id": "50b9e1d25812dd8df48ba13a41723bde07d4812c",
          "url": "https://github.com/jjgoings/pfapack/commit/c0499f3b30b07e105d718877b6eacd01e21f49e1"
        },
        "date": 1769030386546,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "python_loop",
            "value": 0.0019734370430697632,
            "range": "± 0.000999",
            "unit": "s",
            "extra": "min=0.001585 max=0.013097"
          },
          {
            "name": "c_loop",
            "value": 0.0003025982153845829,
            "range": "± 0.000456",
            "unit": "s",
            "extra": "min=0.000223 max=0.008330"
          },
          {
            "name": "batched_3d",
            "value": 0.00006495990167123496,
            "range": "± 0.000070",
            "unit": "s",
            "extra": "min=0.000040 max=0.001415"
          },
          {
            "name": "batched_4d",
            "value": 0.000017715582635593267,
            "range": "± 0.000010",
            "unit": "s",
            "extra": "min=0.000016 max=0.001005"
          },
          {
            "name": "phase2_tomography",
            "value": 0.00685860800001592,
            "range": "± 0.002903",
            "unit": "s",
            "extra": "n_sel=16"
          },
          {
            "name": "phase2_many_small",
            "value": 0.02142986659998769,
            "range": "± 0.002964",
            "unit": "s",
            "extra": "outer=8192 n=8"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "3915169+jjgoings@users.noreply.github.com",
            "name": "Joshua Goings",
            "username": "jjgoings"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "6016ef2b688174a39e212b44382d5439e733c42d",
          "message": "Merge pull request #6 from jjgoings/faster-batching\n\nOptimize batched Pfaffian computation",
          "timestamp": "2026-01-21T13:33:49-08:00",
          "tree_id": "cafc0beda999845a08646a08940e4dabd5e8d225",
          "url": "https://github.com/jjgoings/pfapack/commit/6016ef2b688174a39e212b44382d5439e733c42d"
        },
        "date": 1769031391849,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "python_loop",
            "value": 0.002527825025001107,
            "range": "± 0.00131",
            "unit": "s",
            "extra": "min=0.001660 max=0.009153"
          },
          {
            "name": "c_loop",
            "value": 0.0003867814024684821,
            "range": "± 0.000657",
            "unit": "s",
            "extra": "min=0.000231 max=0.012709"
          },
          {
            "name": "batched_3d",
            "value": 0.00007381400534468904,
            "range": "± 0.000106",
            "unit": "s",
            "extra": "min=0.000038 max=0.003436"
          },
          {
            "name": "batched_4d",
            "value": 0.00002550897972802604,
            "range": "± 0.00005",
            "unit": "s",
            "extra": "min=0.000013 max=0.001683"
          },
          {
            "name": "phase2_tomography",
            "value": 0.007473966399982146,
            "range": "± 0.002161",
            "unit": "s",
            "extra": "n_sel=16"
          },
          {
            "name": "phase2_many_small",
            "value": 0.01649834159999273,
            "range": "± 0.002162",
            "unit": "s",
            "extra": "outer=8192 n=8"
          }
        ]
      }
    ]
  }
}