window.BENCHMARK_DATA = {
  "lastUpdate": 1769109780455,
  "repoUrl": "https://github.com/jjgoings/pfapack",
  "entries": {
    "PFAPACK Performance (ubuntu-latest)": [
      {
        "commit": {
          "author": {
            "name": "jjgoings",
            "username": "jjgoings",
            "email": "jjgoings@gmail.com"
          },
          "committer": {
            "name": "jjgoings",
            "username": "jjgoings",
            "email": "jjgoings@gmail.com"
          },
          "id": "61ae64e6ab7ac7490ddc3e54d9bbc50ee9ec04a7",
          "message": "superbatching",
          "timestamp": "2024-07-31T22:44:29Z",
          "url": "https://github.com/jjgoings/pfapack/commit/61ae64e6ab7ac7490ddc3e54d9bbc50ee9ec04a7"
        },
        "date": 1769107967162,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "python_loop",
            "value": 0.0030682402300003277,
            "range": "\u00b1 0.000227",
            "unit": "s",
            "extra": "min=0.002992 max=0.005241"
          },
          {
            "name": "c_loop",
            "value": 0.00028028654999999957,
            "range": "\u00b1 0.000033",
            "unit": "s",
            "extra": "min=0.000263 max=0.000534"
          },
          {
            "name": "batched_3d",
            "value": 6.282981000026667e-05,
            "range": "\u00b1 0.000008",
            "unit": "s",
            "extra": "min=0.000058 max=0.000109"
          },
          {
            "name": "batched_4d",
            "value": 7.072177999972951e-05,
            "range": "\u00b1 0.000014",
            "unit": "s",
            "extra": "min=0.000064 max=0.000172"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "jjgoings",
            "username": "jjgoings",
            "email": "jjgoings@gmail.com"
          },
          "committer": {
            "name": "jjgoings",
            "username": "jjgoings",
            "email": "jjgoings@gmail.com"
          },
          "id": "0761f01bb615a85b46895d14417e9dfdee838bc4",
          "message": "everything is c-contig",
          "timestamp": "2024-10-31T22:00:19Z",
          "url": "https://github.com/jjgoings/pfapack/commit/0761f01bb615a85b46895d14417e9dfdee838bc4"
        },
        "date": 1769107971215,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "python_loop",
            "value": 0.0030618643799985535,
            "range": "\u00b1 0.00013",
            "unit": "s",
            "extra": "min=0.002994 max=0.003891"
          },
          {
            "name": "c_loop",
            "value": 0.0002752286600002662,
            "range": "\u00b1 0.000032",
            "unit": "s",
            "extra": "min=0.000258 max=0.000497"
          },
          {
            "name": "batched_3d",
            "value": 8.460333000101628e-05,
            "range": "\u00b1 0.000017",
            "unit": "s",
            "extra": "min=0.000076 max=0.000156"
          },
          {
            "name": "batched_4d",
            "value": 8.92349099973444e-05,
            "range": "\u00b1 0.000013",
            "unit": "s",
            "extra": "min=0.000082 max=0.000159"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "jjgoings",
            "username": "jjgoings",
            "email": "jjgoings@gmail.com"
          },
          "committer": {
            "name": "jjgoings",
            "username": "jjgoings",
            "email": "jjgoings@gmail.com"
          },
          "id": "a028f71f3aca3907d0a2421d4929f13f9596b43d",
          "message": "work with complex128 in interleaved fashion",
          "timestamp": "2024-11-23T00:23:03Z",
          "url": "https://github.com/jjgoings/pfapack/commit/a028f71f3aca3907d0a2421d4929f13f9596b43d"
        },
        "date": 1769108010196,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "python_loop",
            "value": 0.0031667720000007195,
            "range": "\u00b1 0.000193",
            "unit": "s",
            "extra": "min=0.003041 max=0.003989"
          },
          {
            "name": "c_loop",
            "value": 0.0002757891199991036,
            "range": "\u00b1 0.00004",
            "unit": "s",
            "extra": "min=0.000254 max=0.000521"
          },
          {
            "name": "batched_3d",
            "value": 6.119458000014788e-05,
            "range": "\u00b1 0.000008",
            "unit": "s",
            "extra": "min=0.000057 max=0.000112"
          },
          {
            "name": "batched_4d",
            "value": 6.86113500000829e-05,
            "range": "\u00b1 0.000011",
            "unit": "s",
            "extra": "min=0.000064 max=0.000163"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "jjgoings",
            "username": "jjgoings",
            "email": "jjgoings@gmail.com"
          },
          "committer": {
            "name": "jjgoings",
            "username": "jjgoings",
            "email": "jjgoings@gmail.com"
          },
          "id": "7d310f121649f62c253bc07b9632cbd8492ec513",
          "message": "single alloc",
          "timestamp": "2024-11-26T19:40:52Z",
          "url": "https://github.com/jjgoings/pfapack/commit/7d310f121649f62c253bc07b9632cbd8492ec513"
        },
        "date": 1769107984762,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "python_loop",
            "value": 0.003179353549999746,
            "range": "\u00b1 0.000429",
            "unit": "s",
            "extra": "min=0.003014 max=0.005818"
          },
          {
            "name": "c_loop",
            "value": 0.00035066485999692533,
            "range": "\u00b1 0.00004",
            "unit": "s",
            "extra": "min=0.000325 max=0.000602"
          },
          {
            "name": "batched_3d",
            "value": 5.1926429998445654e-05,
            "range": "\u00b1 0.000004",
            "unit": "s",
            "extra": "min=0.000050 max=0.000075"
          },
          {
            "name": "batched_4d",
            "value": 8.660581999947681e-05,
            "range": "\u00b1 0.000013",
            "unit": "s",
            "extra": "min=0.000080 max=0.000179"
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
            "range": "\u00b1 0.000413",
            "unit": "s",
            "extra": "min=0.003551 max=0.007884"
          },
          {
            "name": "c_loop",
            "value": 0.0006400404788734634,
            "range": "\u00b1 0.000337",
            "unit": "s",
            "extra": "min=0.000591 max=0.011896"
          },
          {
            "name": "batched_3d",
            "value": 8.303651291198309e-05,
            "range": "\u00b1 0.000016",
            "unit": "s",
            "extra": "min=0.000077 max=0.000215"
          },
          {
            "name": "batched_4d",
            "value": 2.2640001137531208e-05,
            "range": "\u00b1 0.000006",
            "unit": "s",
            "extra": "min=0.000021 max=0.000133"
          },
          {
            "name": "phase2_tomography",
            "value": 0.23156770020000012,
            "range": "\u00b1 0.002836",
            "unit": "s",
            "extra": "n_sel=32"
          },
          {
            "name": "phase2_many_small",
            "value": 0.124480033399999,
            "range": "\u00b1 0.000148",
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
            "range": "\u00b1 0.000162",
            "unit": "s",
            "extra": "min=0.003654 max=0.006131"
          },
          {
            "name": "c_loop",
            "value": 0.0006349760974981553,
            "range": "\u00b1 0.000351",
            "unit": "s",
            "extra": "min=0.000582 max=0.012367"
          },
          {
            "name": "batched_3d",
            "value": 8.5017518208085e-05,
            "range": "\u00b1 0.000018",
            "unit": "s",
            "extra": "min=0.000078 max=0.000334"
          },
          {
            "name": "batched_4d",
            "value": 2.2845820713504267e-05,
            "range": "\u00b1 0.000006",
            "unit": "s",
            "extra": "min=0.000022 max=0.000131"
          },
          {
            "name": "phase2_tomography",
            "value": 0.23107453680000845,
            "range": "\u00b1 0.002768",
            "unit": "s",
            "extra": "n_sel=32"
          },
          {
            "name": "phase2_many_small",
            "value": 0.12332988599999908,
            "range": "\u00b1 0.000568",
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
          "id": "7e848b3450a01489b9279592b66658d1732a4f3b",
          "message": "Add benchmark CI with performance tracking on Ubuntu and macOS",
          "timestamp": "2026-01-21T20:55:19Z",
          "url": "https://github.com/jjgoings/pfapack/commit/7e848b3450a01489b9279592b66658d1732a4f3b"
        },
        "date": 1769107983439,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "python_loop",
            "value": 0.0030619436999975848,
            "range": "\u00b1 0.00005",
            "unit": "s",
            "extra": "min=0.003021 max=0.003443"
          },
          {
            "name": "c_loop",
            "value": 0.00033366439999952033,
            "range": "\u00b1 0.000032",
            "unit": "s",
            "extra": "min=0.000315 max=0.000562"
          },
          {
            "name": "batched_3d",
            "value": 3.347525000066298e-05,
            "range": "\u00b1 0.000008",
            "unit": "s",
            "extra": "min=0.000031 max=0.000103"
          },
          {
            "name": "batched_4d",
            "value": 3.3128350000311e-05,
            "range": "\u00b1 0.000006",
            "unit": "s",
            "extra": "min=0.000031 max=0.000072"
          },
          {
            "name": "phase2_tomography",
            "value": 0.23955356100000813,
            "range": "\u00b1 0.003638",
            "unit": "s",
            "extra": "n_sel=32"
          },
          {
            "name": "phase2_many_small",
            "value": 0.1518573751999952,
            "range": "\u00b1 0.000233",
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
          "id": "d0ba699e9590f449c1558fafea069de77c4e9991",
          "message": "Optimize batched Pfaffian: workspace reuse, transpose elimination, consistent singular handling",
          "timestamp": "2026-01-21T21:29:33Z",
          "url": "https://github.com/jjgoings/pfapack/commit/d0ba699e9590f449c1558fafea069de77c4e9991"
        },
        "date": 1769107997316,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "python_loop",
            "value": 0.0030832933100002433,
            "range": "\u00b1 0.000056",
            "unit": "s",
            "extra": "min=0.003041 max=0.003517"
          },
          {
            "name": "c_loop",
            "value": 0.0003617244999999514,
            "range": "\u00b1 0.000039",
            "unit": "s",
            "extra": "min=0.000338 max=0.000629"
          },
          {
            "name": "batched_3d",
            "value": 3.217814000024077e-05,
            "range": "\u00b1 0.000008",
            "unit": "s",
            "extra": "min=0.000030 max=0.000102"
          },
          {
            "name": "batched_4d",
            "value": 3.189212999942015e-05,
            "range": "\u00b1 0.000003",
            "unit": "s",
            "extra": "min=0.000031 max=0.000051"
          },
          {
            "name": "phase2_tomography",
            "value": 0.23241580240000131,
            "range": "\u00b1 0.001663",
            "unit": "s",
            "extra": "n_sel=32"
          },
          {
            "name": "phase2_many_small",
            "value": 0.12336373079999988,
            "range": "\u00b1 0.001051",
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
            "range": "\u00b1 0.000039",
            "unit": "s",
            "extra": "min=0.003641 max=0.003874"
          },
          {
            "name": "c_loop",
            "value": 0.0006365233936168683,
            "range": "\u00b1 0.000338",
            "unit": "s",
            "extra": "min=0.000586 max=0.011832"
          },
          {
            "name": "batched_3d",
            "value": 8.0287793157701e-05,
            "range": "\u00b1 0.000016",
            "unit": "s",
            "extra": "min=0.000075 max=0.000239"
          },
          {
            "name": "batched_4d",
            "value": 2.061992995989886e-05,
            "range": "\u00b1 0.000006",
            "unit": "s",
            "extra": "min=0.000019 max=0.000129"
          },
          {
            "name": "phase2_tomography",
            "value": 0.22819884499999715,
            "range": "\u00b1 0.001492",
            "unit": "s",
            "extra": "n_sel=32"
          },
          {
            "name": "phase2_many_small",
            "value": 0.09623029260000919,
            "range": "\u00b1 0.000434",
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
          "id": "0825d76f7b87c61a84cb00f726782b317df8063b",
          "message": "Optimize Parlett-Reid factorization: fused division, internal BLAS-1 kernels, batched row swaps",
          "timestamp": "2026-01-22T05:43:03Z",
          "url": "https://github.com/jjgoings/pfapack/commit/0825d76f7b87c61a84cb00f726782b317df8063b"
        },
        "date": 1769107990487,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "python_loop",
            "value": 0.0030772194699991927,
            "range": "\u00b1 0.000078",
            "unit": "s",
            "extra": "min=0.003023 max=0.003585"
          },
          {
            "name": "c_loop",
            "value": 0.0003506058700003223,
            "range": "\u00b1 0.000034",
            "unit": "s",
            "extra": "min=0.000328 max=0.000560"
          },
          {
            "name": "batched_3d",
            "value": 2.6618490000771544e-05,
            "range": "\u00b1 0.000008",
            "unit": "s",
            "extra": "min=0.000025 max=0.000098"
          },
          {
            "name": "batched_4d",
            "value": 2.7284489997896345e-05,
            "range": "\u00b1 0.000004",
            "unit": "s",
            "extra": "min=0.000026 max=0.000053"
          },
          {
            "name": "phase2_tomography",
            "value": 0.23692486819999772,
            "range": "\u00b1 0.009584",
            "unit": "s",
            "extra": "n_sel=32"
          },
          {
            "name": "phase2_many_small",
            "value": 0.0960460659999967,
            "range": "\u00b1 0.000181",
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
          "id": "32fe4dd5f01ef711964fbfade41f94506a8dcdc8",
          "message": "Preserve benchmark scripts when running historical benchmarks to enable phase2 tests on old commits",
          "timestamp": "2026-01-22T11:14:30-08:00",
          "tree_id": "504c8b3e3ed832e615d32c1fd9928f1e0d970809",
          "url": "https://github.com/jjgoings/pfapack/commit/32fe4dd5f01ef711964fbfade41f94506a8dcdc8"
        },
        "date": 1769109417826,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "python_loop",
            "value": 0.0030782233299996163,
            "range": "\u00b1 0.000117",
            "unit": "s",
            "extra": "min=0.002988 max=0.003835"
          },
          {
            "name": "c_loop",
            "value": 0.0003323742000006291,
            "range": "\u00b1 0.000033",
            "unit": "s",
            "extra": "min=0.000314 max=0.000566"
          },
          {
            "name": "batched_3d",
            "value": 2.6980169999148984e-05,
            "range": "\u00b1 0.000008",
            "unit": "s",
            "extra": "min=0.000025 max=0.000097"
          },
          {
            "name": "batched_4d",
            "value": 2.766626999687105e-05,
            "range": "\u00b1 0.000003",
            "unit": "s",
            "extra": "min=0.000026 max=0.000046"
          },
          {
            "name": "phase2_tomography",
            "value": 0.23442130359999852,
            "range": "\u00b1 0.006919",
            "unit": "s",
            "extra": "n_sel=32"
          },
          {
            "name": "phase2_many_small",
            "value": 0.09601172719999909,
            "range": "\u00b1 0.000102",
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
          "id": "08c2592da2410df7c19aac4fda66da4bbd730571",
          "message": "Fallback to empty JSON when phase2 benchmarks fail (API compatibility)",
          "timestamp": "2026-01-22T11:20:23-08:00",
          "tree_id": "a640d17de5528640612d4acb72dd96b4c41b63f5",
          "url": "https://github.com/jjgoings/pfapack/commit/08c2592da2410df7c19aac4fda66da4bbd730571"
        },
        "date": 1769109780054,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "python_loop",
            "value": 0.003095743400000117,
            "range": "\u00b1 0.000115",
            "unit": "s",
            "extra": "min=0.003007 max=0.003828"
          },
          {
            "name": "c_loop",
            "value": 0.00033900803999998175,
            "range": "\u00b1 0.000041",
            "unit": "s",
            "extra": "min=0.000310 max=0.000612"
          },
          {
            "name": "batched_3d",
            "value": 2.8564819999843393e-05,
            "range": "\u00b1 0.000008",
            "unit": "s",
            "extra": "min=0.000026 max=0.000099"
          },
          {
            "name": "batched_4d",
            "value": 2.958037999917451e-05,
            "range": "\u00b1 0.000005",
            "unit": "s",
            "extra": "min=0.000028 max=0.000067"
          },
          {
            "name": "phase2_tomography",
            "value": 0.23184933779999994,
            "range": "\u00b1 0.005820",
            "unit": "s",
            "extra": "n_sel=32"
          },
          {
            "name": "phase2_many_small",
            "value": 0.09936541899999725,
            "range": "\u00b1 0.000172",
            "unit": "s",
            "extra": "outer=65536 n=8"
          }
        ]
      }
    ]
  }
}