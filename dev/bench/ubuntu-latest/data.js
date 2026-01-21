window.BENCHMARK_DATA = {
  "lastUpdate": 1769031380294,
  "repoUrl": "https://github.com/jjgoings/pfapack",
  "entries": {
    "PFAPACK Performance (ubuntu-latest)": [
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
        "date": 1769030392516,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "python_loop",
            "value": 0.003730483936255878,
            "range": "± 0.000051",
            "unit": "s",
            "extra": "min=0.003665 max=0.004174"
          },
          {
            "name": "c_loop",
            "value": 0.0006358896012601126,
            "range": "± 0.000386",
            "unit": "s",
            "extra": "min=0.000586 max=0.013423"
          },
          {
            "name": "batched_3d",
            "value": 0.00008595877906987295,
            "range": "± 0.000016",
            "unit": "s",
            "extra": "min=0.000080 max=0.000333"
          },
          {
            "name": "batched_4d",
            "value": 0.00002580524568528663,
            "range": "± 0.000006",
            "unit": "s",
            "extra": "min=0.000024 max=0.000158"
          },
          {
            "name": "phase2_tomography",
            "value": 0.010254115400005048,
            "range": "± 0.000208",
            "unit": "s",
            "extra": "n_sel=16"
          },
          {
            "name": "phase2_many_small",
            "value": 0.019041141199994626,
            "range": "± 0.000032",
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
        "date": 1769031380007,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "python_loop",
            "value": 0.003708165248000796,
            "range": "± 0.000045",
            "unit": "s",
            "extra": "min=0.003643 max=0.003926"
          },
          {
            "name": "c_loop",
            "value": 0.0006382905860829082,
            "range": "± 0.000368",
            "unit": "s",
            "extra": "min=0.000576 max=0.012572"
          },
          {
            "name": "batched_3d",
            "value": 0.00008229020545592125,
            "range": "± 0.000016",
            "unit": "s",
            "extra": "min=0.000076 max=0.000195"
          },
          {
            "name": "batched_4d",
            "value": 0.00002230612484733056,
            "range": "± 0.000007",
            "unit": "s",
            "extra": "min=0.000021 max=0.000158"
          },
          {
            "name": "phase2_tomography",
            "value": 0.009788729200010948,
            "range": "± 0.000027",
            "unit": "s",
            "extra": "n_sel=16"
          },
          {
            "name": "phase2_many_small",
            "value": 0.015645005399994714,
            "range": "± 0.000486",
            "unit": "s",
            "extra": "outer=8192 n=8"
          }
        ]
      }
    ]
  }
}