window.BENCHMARK_DATA = {
  "lastUpdate": 1769112861920,
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
        "date": 1769109989801,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "python_loop",
            "value": 0.003088310039999982,
            "range": "± 0.000048",
            "unit": "s",
            "extra": "min=0.003043 max=0.003435"
          },
          {
            "name": "c_loop",
            "value": 0.00030465313999940237,
            "range": "± 0.000034",
            "unit": "s",
            "extra": "min=0.000282 max=0.000510"
          },
          {
            "name": "batched_3d",
            "value": 0.000060966549999648125,
            "range": "± 0.000007",
            "unit": "s",
            "extra": "min=0.000058 max=0.000110"
          },
          {
            "name": "batched_4d",
            "value": 0.00006735028999955262,
            "range": "± 0.000009",
            "unit": "s",
            "extra": "min=0.000063 max=0.000138"
          },
          {
            "name": "phase2_many_small",
            "value": 0.5643701415999999,
            "range": "± 0.007458",
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
        "date": 1769109987394,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "python_loop",
            "value": 0.0030536386199997876,
            "range": "± 0.000055",
            "unit": "s",
            "extra": "min=0.002996 max=0.003415"
          },
          {
            "name": "c_loop",
            "value": 0.0002768835699995975,
            "range": "± 0.000033",
            "unit": "s",
            "extra": "min=0.000261 max=0.000510"
          },
          {
            "name": "batched_3d",
            "value": 0.00005877076000018633,
            "range": "± 0.000006",
            "unit": "s",
            "extra": "min=0.000056 max=0.000105"
          },
          {
            "name": "batched_4d",
            "value": 0.00006568734000026665,
            "range": "± 0.00001",
            "unit": "s",
            "extra": "min=0.000062 max=0.000149"
          },
          {
            "name": "phase2_many_small",
            "value": 0.5343886623999993,
            "range": "± 0.00281",
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
        "date": 1769109984568,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "python_loop",
            "value": 0.003079936769999847,
            "range": "± 0.000078",
            "unit": "s",
            "extra": "min=0.002997 max=0.003522"
          },
          {
            "name": "c_loop",
            "value": 0.00027456968000024064,
            "range": "± 0.00003",
            "unit": "s",
            "extra": "min=0.000258 max=0.000486"
          },
          {
            "name": "batched_3d",
            "value": 0.00006051457000182836,
            "range": "± 0.000006",
            "unit": "s",
            "extra": "min=0.000058 max=0.000101"
          },
          {
            "name": "batched_4d",
            "value": 0.00006685340000046835,
            "range": "± 0.000009",
            "unit": "s",
            "extra": "min=0.000063 max=0.000139"
          },
          {
            "name": "phase2_many_small",
            "value": 0.5343145090000064,
            "range": "± 0.004478",
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
        "date": 1769109989516,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "python_loop",
            "value": 0.003112745819998395,
            "range": "± 0.000081",
            "unit": "s",
            "extra": "min=0.003051 max=0.003704"
          },
          {
            "name": "c_loop",
            "value": 0.00033658400000120993,
            "range": "± 0.000033",
            "unit": "s",
            "extra": "min=0.000318 max=0.000601"
          },
          {
            "name": "batched_3d",
            "value": 0.00003386707999993632,
            "range": "± 0.000004",
            "unit": "s",
            "extra": "min=0.000033 max=0.000060"
          },
          {
            "name": "batched_4d",
            "value": 0.00006697248999898875,
            "range": "± 0.00001",
            "unit": "s",
            "extra": "min=0.000062 max=0.000140"
          },
          {
            "name": "phase2_many_small",
            "value": 0.572861564599998,
            "range": "± 0.009292",
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
            "range": "± 0.00005",
            "unit": "s",
            "extra": "min=0.003021 max=0.003443"
          },
          {
            "name": "c_loop",
            "value": 0.00033366439999952033,
            "range": "± 0.000032",
            "unit": "s",
            "extra": "min=0.000315 max=0.000562"
          },
          {
            "name": "batched_3d",
            "value": 0.00003347525000066298,
            "range": "± 0.000008",
            "unit": "s",
            "extra": "min=0.000031 max=0.000103"
          },
          {
            "name": "batched_4d",
            "value": 0.000033128350000311,
            "range": "± 0.000006",
            "unit": "s",
            "extra": "min=0.000031 max=0.000072"
          },
          {
            "name": "phase2_tomography",
            "value": 0.23955356100000813,
            "range": "± 0.003638",
            "unit": "s",
            "extra": "n_sel=32"
          },
          {
            "name": "phase2_many_small",
            "value": 0.1518573751999952,
            "range": "± 0.000233",
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
            "range": "± 0.000056",
            "unit": "s",
            "extra": "min=0.003041 max=0.003517"
          },
          {
            "name": "c_loop",
            "value": 0.0003617244999999514,
            "range": "± 0.000039",
            "unit": "s",
            "extra": "min=0.000338 max=0.000629"
          },
          {
            "name": "batched_3d",
            "value": 0.00003217814000024077,
            "range": "± 0.000008",
            "unit": "s",
            "extra": "min=0.000030 max=0.000102"
          },
          {
            "name": "batched_4d",
            "value": 0.00003189212999942015,
            "range": "± 0.000003",
            "unit": "s",
            "extra": "min=0.000031 max=0.000051"
          },
          {
            "name": "phase2_tomography",
            "value": 0.23241580240000131,
            "range": "± 0.001663",
            "unit": "s",
            "extra": "n_sel=32"
          },
          {
            "name": "phase2_many_small",
            "value": 0.12336373079999988,
            "range": "± 0.001051",
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
            "range": "± 0.000078",
            "unit": "s",
            "extra": "min=0.003023 max=0.003585"
          },
          {
            "name": "c_loop",
            "value": 0.0003506058700003223,
            "range": "± 0.000034",
            "unit": "s",
            "extra": "min=0.000328 max=0.000560"
          },
          {
            "name": "batched_3d",
            "value": 0.000026618490000771544,
            "range": "± 0.000008",
            "unit": "s",
            "extra": "min=0.000025 max=0.000098"
          },
          {
            "name": "batched_4d",
            "value": 0.000027284489997896345,
            "range": "± 0.000004",
            "unit": "s",
            "extra": "min=0.000026 max=0.000053"
          },
          {
            "name": "phase2_tomography",
            "value": 0.23692486819999772,
            "range": "± 0.009584",
            "unit": "s",
            "extra": "n_sel=32"
          },
          {
            "name": "phase2_many_small",
            "value": 0.0960460659999967,
            "range": "± 0.000181",
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
            "range": "± 0.000117",
            "unit": "s",
            "extra": "min=0.002988 max=0.003835"
          },
          {
            "name": "c_loop",
            "value": 0.0003323742000006291,
            "range": "± 0.000033",
            "unit": "s",
            "extra": "min=0.000314 max=0.000566"
          },
          {
            "name": "batched_3d",
            "value": 0.000026980169999148984,
            "range": "± 0.000008",
            "unit": "s",
            "extra": "min=0.000025 max=0.000097"
          },
          {
            "name": "batched_4d",
            "value": 0.00002766626999687105,
            "range": "± 0.000003",
            "unit": "s",
            "extra": "min=0.000026 max=0.000046"
          },
          {
            "name": "phase2_tomography",
            "value": 0.23442130359999852,
            "range": "± 0.006919",
            "unit": "s",
            "extra": "n_sel=32"
          },
          {
            "name": "phase2_many_small",
            "value": 0.09601172719999909,
            "range": "± 0.000102",
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
            "range": "± 0.000115",
            "unit": "s",
            "extra": "min=0.003007 max=0.003828"
          },
          {
            "name": "c_loop",
            "value": 0.00033900803999998175,
            "range": "± 0.000041",
            "unit": "s",
            "extra": "min=0.000310 max=0.000612"
          },
          {
            "name": "batched_3d",
            "value": 0.000028564819999843393,
            "range": "± 0.000008",
            "unit": "s",
            "extra": "min=0.000026 max=0.000099"
          },
          {
            "name": "batched_4d",
            "value": 0.00002958037999917451,
            "range": "± 0.000005",
            "unit": "s",
            "extra": "min=0.000028 max=0.000067"
          },
          {
            "name": "phase2_tomography",
            "value": 0.23184933779999994,
            "range": "± 0.005820",
            "unit": "s",
            "extra": "n_sel=32"
          },
          {
            "name": "phase2_many_small",
            "value": 0.09936541899999725,
            "range": "± 0.000172",
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
          "id": "e31946b61492080979f772bfcc1d6cf2521e645e",
          "message": "Make phase2_bench backwards-compatible: skip tomography if functions unavailable",
          "timestamp": "2026-01-22T11:24:54-08:00",
          "tree_id": "56997cf1094fe639eec9433b944fe4c617b598d7",
          "url": "https://github.com/jjgoings/pfapack/commit/e31946b61492080979f772bfcc1d6cf2521e645e"
        },
        "date": 1769110049375,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "python_loop",
            "value": 0.0030975655899987942,
            "range": "± 0.000045",
            "unit": "s",
            "extra": "min=0.003049 max=0.003443"
          },
          {
            "name": "c_loop",
            "value": 0.00033835928999906176,
            "range": "± 0.000032",
            "unit": "s",
            "extra": "min=0.000317 max=0.000565"
          },
          {
            "name": "batched_3d",
            "value": 0.000027119019999872763,
            "range": "± 0.000008",
            "unit": "s",
            "extra": "min=0.000025 max=0.000098"
          },
          {
            "name": "batched_4d",
            "value": 0.000028228929999443153,
            "range": "± 0.000005",
            "unit": "s",
            "extra": "min=0.000026 max=0.000064"
          },
          {
            "name": "phase2_tomography",
            "value": 0.22933371039999315,
            "range": "± 0.001269",
            "unit": "s",
            "extra": "n_sel=32"
          },
          {
            "name": "phase2_many_small",
            "value": 0.09664027039999609,
            "range": "± 0.000993",
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
          "id": "4a8a06258bfb4ef04ad5fce0cd3490e63f93bd1a",
          "message": "Fix historical benchmark script backup/restore for macOS: use RUNNER_TEMP instead of /tmp",
          "timestamp": "2026-01-22T11:36:37-08:00",
          "tree_id": "c0c045b656fc904b6fc1ec6d7e0e9e8a2be10cef",
          "url": "https://github.com/jjgoings/pfapack/commit/4a8a06258bfb4ef04ad5fce0cd3490e63f93bd1a"
        },
        "date": 1769110759565,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "python_loop",
            "value": 0.0032226995199997077,
            "range": "± 0.000532",
            "unit": "s",
            "extra": "min=0.002996 max=0.006104"
          },
          {
            "name": "c_loop",
            "value": 0.00033213788999972846,
            "range": "± 0.000035",
            "unit": "s",
            "extra": "min=0.000310 max=0.000588"
          },
          {
            "name": "batched_3d",
            "value": 0.00002765395999944076,
            "range": "± 0.00001",
            "unit": "s",
            "extra": "min=0.000025 max=0.000098"
          },
          {
            "name": "batched_4d",
            "value": 0.00002722138999956769,
            "range": "± 0.000003",
            "unit": "s",
            "extra": "min=0.000026 max=0.000047"
          },
          {
            "name": "phase2_tomography",
            "value": 0.2280584422000004,
            "range": "± 0.00124",
            "unit": "s",
            "extra": "n_sel=32"
          },
          {
            "name": "phase2_many_small",
            "value": 0.09641648280000367,
            "range": "± 0.000972",
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
          "id": "edec33e0c6cdb2bd914d366844fbd9fedd86a962",
          "message": "Fix cp -a behavior difference between BSD (macOS) and GNU (Linux) coreutils",
          "timestamp": "2026-01-22T11:39:06-08:00",
          "tree_id": "06e15ee3e85af70d98a3d59c4a5198d673a34d48",
          "url": "https://github.com/jjgoings/pfapack/commit/edec33e0c6cdb2bd914d366844fbd9fedd86a962"
        },
        "date": 1769110894735,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "python_loop",
            "value": 0.003060542470001337,
            "range": "± 0.000129",
            "unit": "s",
            "extra": "min=0.002971 max=0.003822"
          },
          {
            "name": "c_loop",
            "value": 0.00033037073000400594,
            "range": "± 0.000049",
            "unit": "s",
            "extra": "min=0.000304 max=0.000679"
          },
          {
            "name": "batched_3d",
            "value": 0.00002713768999910826,
            "range": "± 0.000008",
            "unit": "s",
            "extra": "min=0.000025 max=0.000097"
          },
          {
            "name": "batched_4d",
            "value": 0.000027909109998063287,
            "range": "± 0.000004",
            "unit": "s",
            "extra": "min=0.000027 max=0.000060"
          },
          {
            "name": "phase2_tomography",
            "value": 0.2286993901999949,
            "range": "± 0.000739",
            "unit": "s",
            "extra": "n_sel=32"
          },
          {
            "name": "phase2_many_small",
            "value": 0.09558495919998222,
            "range": "± 0.000107",
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
          "id": "db10efd4b11ccb85baa8a384edaffaf7407cfacb",
          "message": "Clean up restored benchmark scripts before storing results to avoid git conflicts",
          "timestamp": "2026-01-22T11:53:54-08:00",
          "tree_id": "f276412c0cbb2bf126c3e8f6b655845ebad11d9e",
          "url": "https://github.com/jjgoings/pfapack/commit/db10efd4b11ccb85baa8a384edaffaf7407cfacb"
        },
        "date": 1769111793068,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "python_loop",
            "value": 0.0030688790399997857,
            "range": "± 0.000052",
            "unit": "s",
            "extra": "min=0.003006 max=0.003437"
          },
          {
            "name": "c_loop",
            "value": 0.00033637597999941704,
            "range": "± 0.000036",
            "unit": "s",
            "extra": "min=0.000311 max=0.000582"
          },
          {
            "name": "batched_3d",
            "value": 0.000026896730000345313,
            "range": "± 0.000008",
            "unit": "s",
            "extra": "min=0.000025 max=0.000097"
          },
          {
            "name": "batched_4d",
            "value": 0.000027424400000768402,
            "range": "± 0.000003",
            "unit": "s",
            "extra": "min=0.000026 max=0.000043"
          },
          {
            "name": "phase2_tomography",
            "value": 0.2278307968000007,
            "range": "± 0.001636",
            "unit": "s",
            "extra": "n_sel=32"
          },
          {
            "name": "phase2_many_small",
            "value": 0.09953816340000117,
            "range": "± 0.004116",
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
            "email": "jjgoings@gmail.com"
          },
          "committer": {
            "name": "jjgoings",
            "username": "jjgoings",
            "email": "jjgoings@gmail.com"
          },
          "id": "b2813eadc805f6ef0c99203eced9b026ec997571",
          "message": "more opts",
          "timestamp": "2024-11-26T20:07:38Z",
          "url": "https://github.com/jjgoings/pfapack/commit/b2813eadc805f6ef0c99203eced9b026ec997571"
        },
        "date": 1769112766991,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "python_loop",
            "value": 0.0030727150600002064,
            "range": "± 0.000123",
            "unit": "s",
            "extra": "min=0.002983 max=0.003886"
          },
          {
            "name": "c_loop",
            "value": 0.00033516944999959717,
            "range": "± 0.000037",
            "unit": "s",
            "extra": "min=0.000313 max=0.000590"
          },
          {
            "name": "batched_3d",
            "value": 0.000032802860000487045,
            "range": "± 0.000004",
            "unit": "s",
            "extra": "min=0.000031 max=0.000059"
          },
          {
            "name": "batched_4d",
            "value": 0.000033511559999794825,
            "range": "± 0.000009",
            "unit": "s",
            "extra": "min=0.000031 max=0.000107"
          },
          {
            "name": "phase2_many_small",
            "value": 0.15415602600000114,
            "range": "± 0.00753",
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
          "id": "8ec472e327664673d2c68bf550202b07827eaf8b",
          "message": "fortran layout",
          "timestamp": "2025-09-18T17:23:56Z",
          "url": "https://github.com/jjgoings/pfapack/commit/8ec472e327664673d2c68bf550202b07827eaf8b"
        },
        "date": 1769112861673,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "python_loop",
            "value": 0.003139200950000145,
            "range": "± 0.000152",
            "unit": "s",
            "extra": "min=0.003026 max=0.003776"
          },
          {
            "name": "c_loop",
            "value": 0.0003510737499996708,
            "range": "± 0.000049",
            "unit": "s",
            "extra": "min=0.000318 max=0.000630"
          },
          {
            "name": "batched_3d",
            "value": 0.000033659990000387554,
            "range": "± 0.000009",
            "unit": "s",
            "extra": "min=0.000031 max=0.000116"
          },
          {
            "name": "batched_4d",
            "value": 0.00003324738999950227,
            "range": "± 0.000003",
            "unit": "s",
            "extra": "min=0.000032 max=0.000053"
          },
          {
            "name": "phase2_tomography",
            "value": 0.23739089719999526,
            "range": "± 0.001450",
            "unit": "s",
            "extra": "n_sel=32"
          },
          {
            "name": "phase2_many_small",
            "value": 0.1526347415999993,
            "range": "± 0.000106",
            "unit": "s",
            "extra": "outer=65536 n=8"
          }
        ]
      }
    ]
  }
}