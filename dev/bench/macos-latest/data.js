window.BENCHMARK_DATA = {
  "lastUpdate": 1769107973047,
  "repoUrl": "https://github.com/jjgoings/pfapack",
  "entries": {
    "PFAPACK Performance (macos-latest)": [
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
        "date": 1769106355815,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "c_loop",
            "value": 0.00017462537000028532,
            "range": "± 0.000171",
            "unit": "s",
            "extra": "min=0.000112 max=0.001132"
          },
          {
            "name": "batched_4d",
            "value": 0.00004026957000036191,
            "range": "± 0.000007",
            "unit": "s",
            "extra": "min=0.000038 max=0.000078"
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
        "date": 1769106391847,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "c_loop",
            "value": 0.00012644500999755336,
            "range": "± 0.000074",
            "unit": "s",
            "extra": "min=0.000110 max=0.000851"
          },
          {
            "name": "batched_4d",
            "value": 0.00004032128999881479,
            "range": "± 0.000005",
            "unit": "s",
            "extra": "min=0.000037 max=0.000083"
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
        "date": 1769106382884,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "c_loop",
            "value": 0.00015130452999756016,
            "range": "± 0.000255",
            "unit": "s",
            "extra": "min=0.000114 max=0.002677"
          },
          {
            "name": "batched_4d",
            "value": 0.00005997125000590131,
            "range": "± 0.000054",
            "unit": "s",
            "extra": "min=0.000038 max=0.000265"
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
        "date": 1769106366291,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "c_loop",
            "value": 0.0001693112599957658,
            "range": "± 0.000339",
            "unit": "s",
            "extra": "min=0.000125 max=0.003539"
          },
          {
            "name": "batched_4d",
            "value": 0.000038640389996658085,
            "range": "± 0.000011",
            "unit": "s",
            "extra": "min=0.000036 max=0.000142"
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
        "date": 1769106383881,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "c_loop",
            "value": 0.00015392742999864595,
            "range": "± 0.000153",
            "unit": "s",
            "extra": "min=0.000130 max=0.001667"
          },
          {
            "name": "batched_4d",
            "value": 0.000022007900000744484,
            "range": "± 0.000002",
            "unit": "s",
            "extra": "min=0.000021 max=0.000043"
          },
          {
            "name": "phase2_tomography",
            "value": 0.10470149179999452,
            "range": "± 0.006729",
            "unit": "s",
            "extra": "n_sel=32"
          },
          {
            "name": "phase2_many_small",
            "value": 0.16842660840000007,
            "range": "± 0.022993",
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
        "date": 1769106451646,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "c_loop",
            "value": 0.00017198331000003008,
            "range": "± 0.000201",
            "unit": "s",
            "extra": "min=0.000136 max=0.002171"
          },
          {
            "name": "batched_4d",
            "value": 0.00002231704999815065,
            "range": "± 0.000004",
            "unit": "s",
            "extra": "min=0.000020 max=0.000059"
          },
          {
            "name": "phase2_tomography",
            "value": 0.14994987499999865,
            "range": "± 0.017859",
            "unit": "s",
            "extra": "n_sel=32"
          },
          {
            "name": "phase2_many_small",
            "value": 0.15856149999999616,
            "range": "± 0.018462",
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
        "date": 1769106422398,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "c_loop",
            "value": 0.00018106583001440413,
            "range": "± 0.000131",
            "unit": "s",
            "extra": "min=0.000130 max=0.001002"
          },
          {
            "name": "batched_4d",
            "value": 0.00001992000999962329,
            "range": "± 0.000003",
            "unit": "s",
            "extra": "min=0.000019 max=0.000037"
          },
          {
            "name": "phase2_tomography",
            "value": 0.10577020020002692,
            "range": "± 0.008110",
            "unit": "s",
            "extra": "n_sel=32"
          },
          {
            "name": "phase2_many_small",
            "value": 0.09410526659996776,
            "range": "± 0.005158",
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
        "date": 1769107955296,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "python_loop",
            "value": 0.0019020203699960804,
            "range": "± 0.000684",
            "unit": "s",
            "extra": "min=0.001452 max=0.005008"
          },
          {
            "name": "c_loop",
            "value": 0.000200339980009403,
            "range": "± 0.000209",
            "unit": "s",
            "extra": "min=0.000114 max=0.001399"
          },
          {
            "name": "batched_3d",
            "value": 0.00007245335000106934,
            "range": "± 0.000099",
            "unit": "s",
            "extra": "min=0.000035 max=0.000935"
          },
          {
            "name": "batched_4d",
            "value": 0.00004036412000800738,
            "range": "± 0.000012",
            "unit": "s",
            "extra": "min=0.000038 max=0.000141"
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
        "date": 1769107964242,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "python_loop",
            "value": 0.002190665819999822,
            "range": "± 0.00125",
            "unit": "s",
            "extra": "min=0.001466 max=0.007510"
          },
          {
            "name": "c_loop",
            "value": 0.00017374120000027916,
            "range": "± 0.000464",
            "unit": "s",
            "extra": "min=0.000111 max=0.004757"
          },
          {
            "name": "batched_3d",
            "value": 0.00003653163000038262,
            "range": "± 0.000005",
            "unit": "s",
            "extra": "min=0.000035 max=0.000087"
          },
          {
            "name": "batched_4d",
            "value": 0.00004214206000028753,
            "range": "± 0.000035",
            "unit": "s",
            "extra": "min=0.000038 max=0.000393"
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
        "date": 1769107971434,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "python_loop",
            "value": 0.0015346183399992696,
            "range": "± 0.000193",
            "unit": "s",
            "extra": "min=0.001466 max=0.003228"
          },
          {
            "name": "c_loop",
            "value": 0.0001379416200015271,
            "range": "± 0.000143",
            "unit": "s",
            "extra": "min=0.000114 max=0.001433"
          },
          {
            "name": "batched_3d",
            "value": 0.00003736869999983128,
            "range": "± 0.00001",
            "unit": "s",
            "extra": "min=0.000035 max=0.000127"
          },
          {
            "name": "batched_4d",
            "value": 0.0000398420799982091,
            "range": "± 0.000006",
            "unit": "s",
            "extra": "min=0.000038 max=0.000092"
          }
        ]
      }
    ]
  }
}