window.BENCHMARK_DATA = {
  "lastUpdate": 1769032471054,
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
      },
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
          "id": "405679593cb8b6fa6bbd1eba9e54d577151c4961",
          "message": "Ignore .code directory",
          "timestamp": "2026-01-21T13:36:47-08:00",
          "tree_id": "c87329302e18f937ffcb728ce5104744f528b137",
          "url": "https://github.com/jjgoings/pfapack/commit/405679593cb8b6fa6bbd1eba9e54d577151c4961"
        },
        "date": 1769031570693,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "python_loop",
            "value": 0.0030782676623378126,
            "range": "± 0.000058",
            "unit": "s",
            "extra": "min=0.003025 max=0.003432"
          },
          {
            "name": "c_loop",
            "value": 0.0005212286617071205,
            "range": "± 0.000362",
            "unit": "s",
            "extra": "min=0.000490 max=0.013398"
          },
          {
            "name": "batched_3d",
            "value": 0.00007590090225454313,
            "range": "± 0.000015",
            "unit": "s",
            "extra": "min=0.000071 max=0.000215"
          },
          {
            "name": "batched_4d",
            "value": 0.00002095325397541052,
            "range": "± 0.000006",
            "unit": "s",
            "extra": "min=0.000020 max=0.000151"
          },
          {
            "name": "phase2_tomography",
            "value": 0.010604116999999746,
            "range": "± 0.000166",
            "unit": "s",
            "extra": "n_sel=16"
          },
          {
            "name": "phase2_many_small",
            "value": 0.016674798599999006,
            "range": "± 0.000067",
            "unit": "s",
            "extra": "outer=8192 n=8"
          }
        ]
      },
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
          "id": "a5ed4c943e0fe689b4314182e45081301160d406",
          "message": "Increase CI benchmark problem sizes for more representative performance measurements",
          "timestamp": "2026-01-21T13:49:12-08:00",
          "tree_id": "996c8136d0329bb55a25070ffbd94fe5228360a2",
          "url": "https://github.com/jjgoings/pfapack/commit/a5ed4c943e0fe689b4314182e45081301160d406"
        },
        "date": 1769032345420,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "python_loop",
            "value": 0.003696938382812598,
            "range": "± 0.000413",
            "unit": "s",
            "extra": "min=0.003551 max=0.007884"
          },
          {
            "name": "c_loop",
            "value": 0.0006400404788734634,
            "range": "± 0.000337",
            "unit": "s",
            "extra": "min=0.000591 max=0.011896"
          },
          {
            "name": "batched_3d",
            "value": 0.00008303651291198309,
            "range": "± 0.000016",
            "unit": "s",
            "extra": "min=0.000077 max=0.000215"
          },
          {
            "name": "batched_4d",
            "value": 0.000022640001137531208,
            "range": "± 0.000006",
            "unit": "s",
            "extra": "min=0.000021 max=0.000133"
          },
          {
            "name": "phase2_tomography",
            "value": 0.23156770020000012,
            "range": "± 0.002836",
            "unit": "s",
            "extra": "n_sel=32"
          },
          {
            "name": "phase2_many_small",
            "value": 0.124480033399999,
            "range": "± 0.000148",
            "unit": "s",
            "extra": "outer=65536 n=8"
          }
        ]
      },
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
          "id": "b1a3c6fc1af879d964a03410fca658da4bc6bdde",
          "message": "Drop Python 3.9 support (EOL), require Python 3.10+",
          "timestamp": "2026-01-21T13:52:04-08:00",
          "tree_id": "570dc49f17d745273659c57cc582e72df5871094",
          "url": "https://github.com/jjgoings/pfapack/commit/b1a3c6fc1af879d964a03410fca658da4bc6bdde"
        },
        "date": 1769032470163,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "python_loop",
            "value": 0.003730990164659505,
            "range": "± 0.000162",
            "unit": "s",
            "extra": "min=0.003654 max=0.006131"
          },
          {
            "name": "c_loop",
            "value": 0.0006349760974981553,
            "range": "± 0.000351",
            "unit": "s",
            "extra": "min=0.000582 max=0.012367"
          },
          {
            "name": "batched_3d",
            "value": 0.000085017518208085,
            "range": "± 0.000018",
            "unit": "s",
            "extra": "min=0.000078 max=0.000334"
          },
          {
            "name": "batched_4d",
            "value": 0.000022845820713504267,
            "range": "± 0.000006",
            "unit": "s",
            "extra": "min=0.000022 max=0.000131"
          },
          {
            "name": "phase2_tomography",
            "value": 0.23107453680000845,
            "range": "± 0.002768",
            "unit": "s",
            "extra": "n_sel=32"
          },
          {
            "name": "phase2_many_small",
            "value": 0.12332988599999908,
            "range": "± 0.000568",
            "unit": "s",
            "extra": "outer=65536 n=8"
          }
        ]
      }
    ]
  }
}