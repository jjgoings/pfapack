window.BENCHMARK_DATA = {
  "lastUpdate": 1769106001485,
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
          "id": "4d5e4dbd85db498f2b7cf3ba9c4f0d9d0b3405af",
          "message": "Merge pull request #7 from jjgoings/fortran-optimizations\n\nOptimize Parlett-Reid factorization for small matrices",
          "timestamp": "2026-01-21T21:45:51-08:00",
          "tree_id": "6075e65401c6bba038b7584ef43ec407446db01e",
          "url": "https://github.com/jjgoings/pfapack/commit/4d5e4dbd85db498f2b7cf3ba9c4f0d9d0b3405af"
        },
        "date": 1769060902557,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "python_loop",
            "value": 0.00370461780784321,
            "range": "± 0.000039",
            "unit": "s",
            "extra": "min=0.003641 max=0.003874"
          },
          {
            "name": "c_loop",
            "value": 0.0006365233936168683,
            "range": "± 0.000338",
            "unit": "s",
            "extra": "min=0.000586 max=0.011832"
          },
          {
            "name": "batched_3d",
            "value": 0.000080287793157701,
            "range": "± 0.000016",
            "unit": "s",
            "extra": "min=0.000075 max=0.000239"
          },
          {
            "name": "batched_4d",
            "value": 0.00002061992995989886,
            "range": "± 0.000006",
            "unit": "s",
            "extra": "min=0.000019 max=0.000129"
          },
          {
            "name": "phase2_tomography",
            "value": 0.22819884499999715,
            "range": "± 0.001492",
            "unit": "s",
            "extra": "n_sel=32"
          },
          {
            "name": "phase2_many_small",
            "value": 0.09623029260000919,
            "range": "± 0.000434",
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
          "id": "270bd5d50b4b27aa6464ba7dd84275215ebc3b67",
          "message": "Add workflow_dispatch to run benchmarks on historical commits",
          "timestamp": "2026-01-22T10:05:55-08:00",
          "tree_id": "7be1557190e9a34b8f1daf4d23ca91729cfe9eb9",
          "url": "https://github.com/jjgoings/pfapack/commit/270bd5d50b4b27aa6464ba7dd84275215ebc3b67"
        },
        "date": 1769105296494,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "python_loop",
            "value": 0.0037197493749995796,
            "range": "± 0.000135",
            "unit": "s",
            "extra": "min=0.003636 max=0.005211"
          },
          {
            "name": "c_loop",
            "value": 0.0006151999801037423,
            "range": "± 0.000362",
            "unit": "s",
            "extra": "min=0.000573 max=0.012860"
          },
          {
            "name": "batched_3d",
            "value": 0.00007929202268965503,
            "range": "± 0.000016",
            "unit": "s",
            "extra": "min=0.000074 max=0.000219"
          },
          {
            "name": "batched_4d",
            "value": 0.00002010797937936427,
            "range": "± 0.000006",
            "unit": "s",
            "extra": "min=0.000019 max=0.000142"
          },
          {
            "name": "phase2_tomography",
            "value": 0.23162937619999865,
            "range": "± 0.002983",
            "unit": "s",
            "extra": "n_sel=32"
          },
          {
            "name": "phase2_many_small",
            "value": 0.0960374167999987,
            "range": "± 0.000176",
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
          "id": "252733461bcc90aaf53e12525ff660c20f75bd8b",
          "message": "Make benchmark workflow compatible with old commits (self-contained benchmark script)",
          "timestamp": "2026-01-22T10:09:01-08:00",
          "tree_id": "0ec8ab12ce35737db083b2ac1bf1c65500b052b3",
          "url": "https://github.com/jjgoings/pfapack/commit/252733461bcc90aaf53e12525ff660c20f75bd8b"
        },
        "date": 1769105479756,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "c_loop",
            "value": 0.0003541449500005456,
            "range": "± 0.000031",
            "unit": "s",
            "extra": "min=0.000320 max=0.000572"
          },
          {
            "name": "batched_4d",
            "value": 0.000027685770000402954,
            "range": "± 0.000004",
            "unit": "s",
            "extra": "min=0.000026 max=0.000055"
          },
          {
            "name": "phase2_tomography",
            "value": 0.23510594500000365,
            "range": "± 0.008335",
            "unit": "s",
            "extra": "n_sel=32"
          },
          {
            "name": "phase2_many_small",
            "value": 0.09587984219999726,
            "range": "± 0.000144",
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
          "id": "c6109b669c31c32fe474f000c7a2c764357f57e8",
          "message": "Fix checkout for historical commits: need full fetch depth for SHA refs",
          "timestamp": "2026-01-22T10:16:47-08:00",
          "tree_id": "dc7af4b63ecc851d8a122b9a325f13b2cdc5dd2f",
          "url": "https://github.com/jjgoings/pfapack/commit/c6109b669c31c32fe474f000c7a2c764357f57e8"
        },
        "date": 1769105975312,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "c_loop",
            "value": 0.0003524494100005882,
            "range": "± 0.000037",
            "unit": "s",
            "extra": "min=0.000314 max=0.000626"
          },
          {
            "name": "batched_4d",
            "value": 0.00002890188000009175,
            "range": "± 0.000005",
            "unit": "s",
            "extra": "min=0.000027 max=0.000060"
          },
          {
            "name": "phase2_tomography",
            "value": 0.23059944540000288,
            "range": "± 0.001737",
            "unit": "s",
            "extra": "n_sel=32"
          },
          {
            "name": "phase2_many_small",
            "value": 0.09603271340000105,
            "range": "± 0.00029",
            "unit": "s",
            "extra": "outer=65536 n=8"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "jjgoings",
            "username": "jjgoings",
            "email": "3915169+jjgoings@users.noreply.github.com"
          },
          "committer": {
            "name": "jjgoings",
            "username": "jjgoings",
            "email": "3915169+jjgoings@users.noreply.github.com"
          },
          "id": "7caf1dff77fcfaaed09383085f3f51d7058b6248",
          "message": "Fix SHA checkout: fetch full history then manually checkout commit",
          "timestamp": "2026-01-22T18:18:22Z",
          "url": "https://github.com/jjgoings/pfapack/commit/7caf1dff77fcfaaed09383085f3f51d7058b6248"
        },
        "date": 1769105984341,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "c_loop",
            "value": 0.00030375293000005853,
            "range": "± 0.00004",
            "unit": "s",
            "extra": "min=0.000257 max=0.000490"
          },
          {
            "name": "batched_4d",
            "value": 0.00006952670000089256,
            "range": "± 0.000012",
            "unit": "s",
            "extra": "min=0.000064 max=0.000128"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "jjgoings",
            "username": "jjgoings",
            "email": "3915169+jjgoings@users.noreply.github.com"
          },
          "committer": {
            "name": "jjgoings",
            "username": "jjgoings",
            "email": "3915169+jjgoings@users.noreply.github.com"
          },
          "id": "7caf1dff77fcfaaed09383085f3f51d7058b6248",
          "message": "Fix SHA checkout: fetch full history then manually checkout commit",
          "timestamp": "2026-01-22T18:18:22Z",
          "url": "https://github.com/jjgoings/pfapack/commit/7caf1dff77fcfaaed09383085f3f51d7058b6248"
        },
        "date": 1769105990945,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "c_loop",
            "value": 0.0002185851199976696,
            "range": "± 0.000029",
            "unit": "s",
            "extra": "min=0.000204 max=0.000440"
          },
          {
            "name": "batched_4d",
            "value": 0.000056011889998899275,
            "range": "± 0.000009",
            "unit": "s",
            "extra": "min=0.000053 max=0.000139"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "jjgoings",
            "username": "jjgoings",
            "email": "3915169+jjgoings@users.noreply.github.com"
          },
          "committer": {
            "name": "jjgoings",
            "username": "jjgoings",
            "email": "3915169+jjgoings@users.noreply.github.com"
          },
          "id": "7caf1dff77fcfaaed09383085f3f51d7058b6248",
          "message": "Fix SHA checkout: fetch full history then manually checkout commit",
          "timestamp": "2026-01-22T18:18:22Z",
          "url": "https://github.com/jjgoings/pfapack/commit/7caf1dff77fcfaaed09383085f3f51d7058b6248"
        },
        "date": 1769105990810,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "c_loop",
            "value": 0.00029412505000038893,
            "range": "± 0.000033",
            "unit": "s",
            "extra": "min=0.000261 max=0.000499"
          },
          {
            "name": "batched_4d",
            "value": 0.00006938987000012276,
            "range": "± 0.000015",
            "unit": "s",
            "extra": "min=0.000062 max=0.000152"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "jjgoings",
            "username": "jjgoings",
            "email": "3915169+jjgoings@users.noreply.github.com"
          },
          "committer": {
            "name": "jjgoings",
            "username": "jjgoings",
            "email": "3915169+jjgoings@users.noreply.github.com"
          },
          "id": "7caf1dff77fcfaaed09383085f3f51d7058b6248",
          "message": "Fix SHA checkout: fetch full history then manually checkout commit",
          "timestamp": "2026-01-22T18:18:22Z",
          "url": "https://github.com/jjgoings/pfapack/commit/7caf1dff77fcfaaed09383085f3f51d7058b6248"
        },
        "date": 1769105999276,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "c_loop",
            "value": 0.0003608133200003749,
            "range": "± 0.000037",
            "unit": "s",
            "extra": "min=0.000319 max=0.000616"
          },
          {
            "name": "batched_4d",
            "value": 0.00006738610000041945,
            "range": "± 0.000011",
            "unit": "s",
            "extra": "min=0.000062 max=0.000153"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "jjgoings",
            "username": "jjgoings",
            "email": "3915169+jjgoings@users.noreply.github.com"
          },
          "committer": {
            "name": "jjgoings",
            "username": "jjgoings",
            "email": "3915169+jjgoings@users.noreply.github.com"
          },
          "id": "7caf1dff77fcfaaed09383085f3f51d7058b6248",
          "message": "Fix SHA checkout: fetch full history then manually checkout commit",
          "timestamp": "2026-01-22T18:18:22Z",
          "url": "https://github.com/jjgoings/pfapack/commit/7caf1dff77fcfaaed09383085f3f51d7058b6248"
        },
        "date": 1769106001018,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "c_loop",
            "value": 0.0003587597599999981,
            "range": "± 0.000038",
            "unit": "s",
            "extra": "min=0.000324 max=0.000623"
          },
          {
            "name": "batched_4d",
            "value": 0.00003396937999937677,
            "range": "± 0.000004",
            "unit": "s",
            "extra": "min=0.000032 max=0.000059"
          },
          {
            "name": "phase2_tomography",
            "value": 0.23497449279999785,
            "range": "± 0.001512",
            "unit": "s",
            "extra": "n_sel=32"
          },
          {
            "name": "phase2_many_small",
            "value": 0.15499373440000283,
            "range": "± 0.005132",
            "unit": "s",
            "extra": "outer=65536 n=8"
          }
        ]
      }
    ]
  }
}