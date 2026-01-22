window.BENCHMARK_DATA = {
  "lastUpdate": 1769106052009,
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
          "id": "a5ed4c943e0fe689b4314182e45081301160d406",
          "message": "Increase CI benchmark problem sizes for more representative performance measurements",
          "timestamp": "2026-01-21T13:49:12-08:00",
          "tree_id": "996c8136d0329bb55a25070ffbd94fe5228360a2",
          "url": "https://github.com/jjgoings/pfapack/commit/a5ed4c943e0fe689b4314182e45081301160d406"
        },
        "date": 1769032343674,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "python_loop",
            "value": 0.0026213369285700444,
            "range": "± 0.001665",
            "unit": "s",
            "extra": "min=0.001633 max=0.013309"
          },
          {
            "name": "c_loop",
            "value": 0.00028011671585903466,
            "range": "± 0.000516",
            "unit": "s",
            "extra": "min=0.000229 max=0.011211"
          },
          {
            "name": "batched_3d",
            "value": 0.00004481147214156439,
            "range": "± 0.000026",
            "unit": "s",
            "extra": "min=0.000038 max=0.000794"
          },
          {
            "name": "batched_4d",
            "value": 0.000014641229802024375,
            "range": "± 0.000009",
            "unit": "s",
            "extra": "min=0.000013 max=0.000304"
          },
          {
            "name": "phase2_tomography",
            "value": 0.1175728250000077,
            "range": "± 0.014857",
            "unit": "s",
            "extra": "n_sel=32"
          },
          {
            "name": "phase2_many_small",
            "value": 0.11251970860000142,
            "range": "± 0.005697",
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
        "date": 1769032462852,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "python_loop",
            "value": 0.001974292373949324,
            "range": "± 0.000641",
            "unit": "s",
            "extra": "min=0.001638 max=0.006194"
          },
          {
            "name": "c_loop",
            "value": 0.00032093710994855946,
            "range": "± 0.000486",
            "unit": "s",
            "extra": "min=0.000228 max=0.008339"
          },
          {
            "name": "batched_3d",
            "value": 0.00005168953913755784,
            "range": "± 0.000062",
            "unit": "s",
            "extra": "min=0.000038 max=0.002457"
          },
          {
            "name": "batched_4d",
            "value": 0.00001601009306594606,
            "range": "± 0.00002",
            "unit": "s",
            "extra": "min=0.000013 max=0.001422"
          },
          {
            "name": "phase2_tomography",
            "value": 0.10832015800000364,
            "range": "± 0.011203",
            "unit": "s",
            "extra": "n_sel=32"
          },
          {
            "name": "phase2_many_small",
            "value": 0.1166834081999923,
            "range": "± 0.020167",
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
        "date": 1769060893923,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "python_loop",
            "value": 0.0026602383960686806,
            "range": "± 0.001078",
            "unit": "s",
            "extra": "min=0.001666 max=0.008579"
          },
          {
            "name": "c_loop",
            "value": 0.0003746803316150923,
            "range": "± 0.000966",
            "unit": "s",
            "extra": "min=0.000223 max=0.023102"
          },
          {
            "name": "batched_3d",
            "value": 0.00005421622334114786,
            "range": "± 0.00005",
            "unit": "s",
            "extra": "min=0.000038 max=0.002328"
          },
          {
            "name": "batched_4d",
            "value": 0.000021838265574305863,
            "range": "± 0.000069",
            "unit": "s",
            "extra": "min=0.000012 max=0.004008"
          },
          {
            "name": "phase2_tomography",
            "value": 0.1304996751999994,
            "range": "± 0.01158",
            "unit": "s",
            "extra": "n_sel=32"
          },
          {
            "name": "phase2_many_small",
            "value": 0.10839844980000066,
            "range": "± 0.007469",
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
        "date": 1769105303256,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "python_loop",
            "value": 0.0028237339246119163,
            "range": "± 0.001294",
            "unit": "s",
            "extra": "min=0.001658 max=0.014084"
          },
          {
            "name": "c_loop",
            "value": 0.0003511944650110645,
            "range": "± 0.001042",
            "unit": "s",
            "extra": "min=0.000232 max=0.021827"
          },
          {
            "name": "batched_3d",
            "value": 0.00006859890753512098,
            "range": "± 0.000098",
            "unit": "s",
            "extra": "min=0.000038 max=0.002937"
          },
          {
            "name": "batched_4d",
            "value": 0.000019124000324729283,
            "range": "± 0.000038",
            "unit": "s",
            "extra": "min=0.000012 max=0.002899"
          },
          {
            "name": "phase2_tomography",
            "value": 0.12351379140000063,
            "range": "± 0.00908",
            "unit": "s",
            "extra": "n_sel=32"
          },
          {
            "name": "phase2_many_small",
            "value": 0.13670015820000572,
            "range": "± 0.017627",
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
        "date": 1769105482258,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "c_loop",
            "value": 0.00017188747999981048,
            "range": "± 0.000199",
            "unit": "s",
            "extra": "min=0.000129 max=0.002090"
          },
          {
            "name": "batched_4d",
            "value": 0.00002030240000010508,
            "range": "± 0.000003",
            "unit": "s",
            "extra": "min=0.000019 max=0.000039"
          },
          {
            "name": "phase2_tomography",
            "value": 0.1098578582000016,
            "range": "± 0.003753",
            "unit": "s",
            "extra": "n_sel=32"
          },
          {
            "name": "phase2_many_small",
            "value": 0.12049057499999663,
            "range": "± 0.004501",
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
        "date": 1769105968055,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "c_loop",
            "value": 0.00040524414999822513,
            "range": "± 0.000472",
            "unit": "s",
            "extra": "min=0.000134 max=0.004314"
          },
          {
            "name": "batched_4d",
            "value": 0.00003226039999731256,
            "range": "± 0.000033",
            "unit": "s",
            "extra": "min=0.000019 max=0.000245"
          },
          {
            "name": "phase2_tomography",
            "value": 0.1160420748000206,
            "range": "± 0.007306",
            "unit": "s",
            "extra": "n_sel=32"
          },
          {
            "name": "phase2_many_small",
            "value": 0.10770775820001291,
            "range": "± 0.009204",
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
        "date": 1769105978649,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "c_loop",
            "value": 0.00023155788999929428,
            "range": "± 0.000304",
            "unit": "s",
            "extra": "min=0.000114 max=0.001805"
          },
          {
            "name": "batched_4d",
            "value": 0.000080828350001525,
            "range": "± 0.000061",
            "unit": "s",
            "extra": "min=0.000038 max=0.000559"
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
        "date": 1769105985266,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "c_loop",
            "value": 0.00021879041000033794,
            "range": "± 0.000185",
            "unit": "s",
            "extra": "min=0.000113 max=0.001062"
          },
          {
            "name": "batched_4d",
            "value": 0.00004610875000054193,
            "range": "± 0.000031",
            "unit": "s",
            "extra": "min=0.000037 max=0.000246"
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
        "date": 1769105985902,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "c_loop",
            "value": 0.0001245200199977603,
            "range": "± 0.000057",
            "unit": "s",
            "extra": "min=0.000109 max=0.000679"
          },
          {
            "name": "batched_4d",
            "value": 0.000040749130001529465,
            "range": "± 0.000007",
            "unit": "s",
            "extra": "min=0.000037 max=0.000101"
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
        "date": 1769106010682,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "c_loop",
            "value": 0.00015610572999321447,
            "range": "± 0.000162",
            "unit": "s",
            "extra": "min=0.000132 max=0.001759"
          },
          {
            "name": "batched_4d",
            "value": 0.00004035909000322135,
            "range": "± 0.000007",
            "unit": "s",
            "extra": "min=0.000038 max=0.000093"
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
        "date": 1769106033641,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "c_loop",
            "value": 0.00013517162000127315,
            "range": "± 0.000071",
            "unit": "s",
            "extra": "min=0.000122 max=0.000831"
          },
          {
            "name": "batched_4d",
            "value": 0.000018628299999932098,
            "range": "± 0.000001",
            "unit": "s",
            "extra": "min=0.000018 max=0.000030"
          },
          {
            "name": "phase2_tomography",
            "value": 0.09515777499999842,
            "range": "± 0.002054",
            "unit": "s",
            "extra": "n_sel=32"
          },
          {
            "name": "phase2_many_small",
            "value": 0.11861769180000295,
            "range": "± 0.015228",
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
        "date": 1769106041341,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "c_loop",
            "value": 0.00014548377999915374,
            "range": "± 0.000081",
            "unit": "s",
            "extra": "min=0.000132 max=0.000939"
          },
          {
            "name": "batched_4d",
            "value": 0.000021710870000219985,
            "range": "± 0.000002",
            "unit": "s",
            "extra": "min=0.000021 max=0.000037"
          },
          {
            "name": "phase2_tomography",
            "value": 0.14021249980000902,
            "range": "± 0.010532",
            "unit": "s",
            "extra": "n_sel=32"
          },
          {
            "name": "phase2_many_small",
            "value": 0.1707155747999991,
            "range": "± 0.006791",
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
        "date": 1769106051101,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "c_loop",
            "value": 0.00014211667999802557,
            "range": "± 0.000074",
            "unit": "s",
            "extra": "min=0.000129 max=0.000870"
          },
          {
            "name": "batched_4d",
            "value": 0.000019395339999448426,
            "range": "± 0.000002",
            "unit": "s",
            "extra": "min=0.000019 max=0.000034"
          },
          {
            "name": "phase2_tomography",
            "value": 0.10170422480000525,
            "range": "± 0.002226",
            "unit": "s",
            "extra": "n_sel=32"
          },
          {
            "name": "phase2_many_small",
            "value": 0.09084318339999413,
            "range": "± 0.005014",
            "unit": "s",
            "extra": "outer=65536 n=8"
          }
        ]
      }
    ]
  }
}