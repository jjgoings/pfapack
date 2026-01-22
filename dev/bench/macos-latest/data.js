window.BENCHMARK_DATA = {
  "lastUpdate": 1769110034863,
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
        "date": 1769107955296,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "python_loop",
            "value": 0.0019020203699960804,
            "range": "\u00b1 0.000684",
            "unit": "s",
            "extra": "min=0.001452 max=0.005008"
          },
          {
            "name": "c_loop",
            "value": 0.000200339980009403,
            "range": "\u00b1 0.000209",
            "unit": "s",
            "extra": "min=0.000114 max=0.001399"
          },
          {
            "name": "batched_3d",
            "value": 7.245335000106934e-05,
            "range": "\u00b1 0.000099",
            "unit": "s",
            "extra": "min=0.000035 max=0.000935"
          },
          {
            "name": "batched_4d",
            "value": 4.036412000800738e-05,
            "range": "\u00b1 0.000012",
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
            "range": "\u00b1 0.000193",
            "unit": "s",
            "extra": "min=0.001466 max=0.003228"
          },
          {
            "name": "c_loop",
            "value": 0.0001379416200015271,
            "range": "\u00b1 0.000143",
            "unit": "s",
            "extra": "min=0.000114 max=0.001433"
          },
          {
            "name": "batched_3d",
            "value": 3.736869999983128e-05,
            "range": "\u00b1 0.00001",
            "unit": "s",
            "extra": "min=0.000035 max=0.000127"
          },
          {
            "name": "batched_4d",
            "value": 3.98420799982091e-05,
            "range": "\u00b1 0.000006",
            "unit": "s",
            "extra": "min=0.000038 max=0.000092"
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
            "range": "\u00b1 0.00125",
            "unit": "s",
            "extra": "min=0.001466 max=0.007510"
          },
          {
            "name": "c_loop",
            "value": 0.00017374120000027916,
            "range": "\u00b1 0.000464",
            "unit": "s",
            "extra": "min=0.000111 max=0.004757"
          },
          {
            "name": "batched_3d",
            "value": 3.653163000038262e-05,
            "range": "\u00b1 0.000005",
            "unit": "s",
            "extra": "min=0.000035 max=0.000087"
          },
          {
            "name": "batched_4d",
            "value": 4.214206000028753e-05,
            "range": "\u00b1 0.000035",
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
          "id": "7d310f121649f62c253bc07b9632cbd8492ec513",
          "message": "single alloc",
          "timestamp": "2024-11-26T19:40:52Z",
          "url": "https://github.com/jjgoings/pfapack/commit/7d310f121649f62c253bc07b9632cbd8492ec513"
        },
        "date": 1769107986014,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "python_loop",
            "value": 0.002331279179999228,
            "range": "\u00b1 0.001221",
            "unit": "s",
            "extra": "min=0.001478 max=0.007430"
          },
          {
            "name": "c_loop",
            "value": 0.0003844862900007229,
            "range": "\u00b1 0.000399",
            "unit": "s",
            "extra": "min=0.000137 max=0.002009"
          },
          {
            "name": "batched_3d",
            "value": 4.481078999276633e-05,
            "range": "\u00b1 0.000037",
            "unit": "s",
            "extra": "min=0.000021 max=0.000272"
          },
          {
            "name": "batched_4d",
            "value": 4.972331999908874e-05,
            "range": "\u00b1 0.000028",
            "unit": "s",
            "extra": "min=0.000038 max=0.000191"
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
            "range": "\u00b1 0.001665",
            "unit": "s",
            "extra": "min=0.001633 max=0.013309"
          },
          {
            "name": "c_loop",
            "value": 0.00028011671585903466,
            "range": "\u00b1 0.000516",
            "unit": "s",
            "extra": "min=0.000229 max=0.011211"
          },
          {
            "name": "batched_3d",
            "value": 4.481147214156439e-05,
            "range": "\u00b1 0.000026",
            "unit": "s",
            "extra": "min=0.000038 max=0.000794"
          },
          {
            "name": "batched_4d",
            "value": 1.4641229802024375e-05,
            "range": "\u00b1 0.000009",
            "unit": "s",
            "extra": "min=0.000013 max=0.000304"
          },
          {
            "name": "phase2_tomography",
            "value": 0.1175728250000077,
            "range": "\u00b1 0.014857",
            "unit": "s",
            "extra": "n_sel=32"
          },
          {
            "name": "phase2_many_small",
            "value": 0.11251970860000142,
            "range": "\u00b1 0.005697",
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
            "range": "\u00b1 0.000641",
            "unit": "s",
            "extra": "min=0.001638 max=0.006194"
          },
          {
            "name": "c_loop",
            "value": 0.00032093710994855946,
            "range": "\u00b1 0.000486",
            "unit": "s",
            "extra": "min=0.000228 max=0.008339"
          },
          {
            "name": "batched_3d",
            "value": 5.168953913755784e-05,
            "range": "\u00b1 0.000062",
            "unit": "s",
            "extra": "min=0.000038 max=0.002457"
          },
          {
            "name": "batched_4d",
            "value": 1.601009306594606e-05,
            "range": "\u00b1 0.00002",
            "unit": "s",
            "extra": "min=0.000013 max=0.001422"
          },
          {
            "name": "phase2_tomography",
            "value": 0.10832015800000364,
            "range": "\u00b1 0.011203",
            "unit": "s",
            "extra": "n_sel=32"
          },
          {
            "name": "phase2_many_small",
            "value": 0.1166834081999923,
            "range": "\u00b1 0.020167",
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
        "date": 1769107989024,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "python_loop",
            "value": 0.0014833032699998227,
            "range": "\u00b1 0.000121",
            "unit": "s",
            "extra": "min=0.001376 max=0.002130"
          },
          {
            "name": "c_loop",
            "value": 0.00015757044000068278,
            "range": "\u00b1 0.000118",
            "unit": "s",
            "extra": "min=0.000131 max=0.001100"
          },
          {
            "name": "batched_3d",
            "value": 2.1773359999883724e-05,
            "range": "\u00b1 0.000003",
            "unit": "s",
            "extra": "min=0.000021 max=0.000041"
          },
          {
            "name": "batched_4d",
            "value": 2.256375999976967e-05,
            "range": "\u00b1 0.000006",
            "unit": "s",
            "extra": "min=0.000021 max=0.000077"
          },
          {
            "name": "phase2_tomography",
            "value": 0.09678564199999755,
            "range": "\u00b1 0.002661",
            "unit": "s",
            "extra": "n_sel=32"
          },
          {
            "name": "phase2_many_small",
            "value": 0.12750932499999976,
            "range": "\u00b1 0.003901",
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
        "date": 1769108035521,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "python_loop",
            "value": 0.0020476483400028657,
            "range": "\u00b1 0.000979",
            "unit": "s",
            "extra": "min=0.001495 max=0.007017"
          },
          {
            "name": "c_loop",
            "value": 0.0001663178699988066,
            "range": "\u00b1 0.000117",
            "unit": "s",
            "extra": "min=0.000134 max=0.001171"
          },
          {
            "name": "batched_3d",
            "value": 2.223043000128655e-05,
            "range": "\u00b1 0.000007",
            "unit": "s",
            "extra": "min=0.000019 max=0.000062"
          },
          {
            "name": "batched_4d",
            "value": 2.306128000100216e-05,
            "range": "\u00b1 0.000011",
            "unit": "s",
            "extra": "min=0.000020 max=0.000087"
          },
          {
            "name": "phase2_tomography",
            "value": 0.13128392480001594,
            "range": "\u00b1 0.018723",
            "unit": "s",
            "extra": "n_sel=32"
          },
          {
            "name": "phase2_many_small",
            "value": 0.12298230840000315,
            "range": "\u00b1 0.009076",
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
            "range": "\u00b1 0.001078",
            "unit": "s",
            "extra": "min=0.001666 max=0.008579"
          },
          {
            "name": "c_loop",
            "value": 0.0003746803316150923,
            "range": "\u00b1 0.000966",
            "unit": "s",
            "extra": "min=0.000223 max=0.023102"
          },
          {
            "name": "batched_3d",
            "value": 5.421622334114786e-05,
            "range": "\u00b1 0.00005",
            "unit": "s",
            "extra": "min=0.000038 max=0.002328"
          },
          {
            "name": "batched_4d",
            "value": 2.1838265574305863e-05,
            "range": "\u00b1 0.000069",
            "unit": "s",
            "extra": "min=0.000012 max=0.004008"
          },
          {
            "name": "phase2_tomography",
            "value": 0.1304996751999994,
            "range": "\u00b1 0.01158",
            "unit": "s",
            "extra": "n_sel=32"
          },
          {
            "name": "phase2_many_small",
            "value": 0.10839844980000066,
            "range": "\u00b1 0.007469",
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
        "date": 1769108016976,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "python_loop",
            "value": 0.002324161650001031,
            "range": "\u00b1 0.000935",
            "unit": "s",
            "extra": "min=0.001478 max=0.005090"
          },
          {
            "name": "c_loop",
            "value": 0.00020817415999800913,
            "range": "\u00b1 0.00014",
            "unit": "s",
            "extra": "min=0.000132 max=0.001032"
          },
          {
            "name": "batched_3d",
            "value": 1.975955000034446e-05,
            "range": "\u00b1 0.000003",
            "unit": "s",
            "extra": "min=0.000018 max=0.000046"
          },
          {
            "name": "batched_4d",
            "value": 2.7749620000463436e-05,
            "range": "\u00b1 0.000055",
            "unit": "s",
            "extra": "min=0.000019 max=0.000560"
          },
          {
            "name": "phase2_tomography",
            "value": 0.1074303835999956,
            "range": "\u00b1 0.005622",
            "unit": "s",
            "extra": "n_sel=32"
          },
          {
            "name": "phase2_many_small",
            "value": 0.09370094999999878,
            "range": "\u00b1 0.00416",
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
        "date": 1769109404848,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "python_loop",
            "value": 0.0014983437199998662,
            "range": "\u00b1 0.000047",
            "unit": "s",
            "extra": "min=0.001447 max=0.001805"
          },
          {
            "name": "c_loop",
            "value": 0.000152817059999677,
            "range": "\u00b1 0.00009",
            "unit": "s",
            "extra": "min=0.000134 max=0.000903"
          },
          {
            "name": "batched_3d",
            "value": 2.1025829999530286e-05,
            "range": "\u00b1 0.000008",
            "unit": "s",
            "extra": "min=0.000018 max=0.000085"
          },
          {
            "name": "batched_4d",
            "value": 1.9840389999785657e-05,
            "range": "\u00b1 0.000005",
            "unit": "s",
            "extra": "min=0.000019 max=0.000068"
          },
          {
            "name": "phase2_tomography",
            "value": 0.09320284140000012,
            "range": "\u00b1 0.000643",
            "unit": "s",
            "extra": "n_sel=32"
          },
          {
            "name": "phase2_many_small",
            "value": 0.09016206679999925,
            "range": "\u00b1 0.001238",
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
        "date": 1769109748300,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "python_loop",
            "value": 0.0015681875200000662,
            "range": "\u00b1 0.000191",
            "unit": "s",
            "extra": "min=0.001422 max=0.002999"
          },
          {
            "name": "c_loop",
            "value": 0.00014605630000033898,
            "range": "\u00b1 0.000095",
            "unit": "s",
            "extra": "min=0.000126 max=0.001080"
          },
          {
            "name": "batched_3d",
            "value": 1.877084999961198e-05,
            "range": "\u00b1 0.000002",
            "unit": "s",
            "extra": "min=0.000018 max=0.000036"
          },
          {
            "name": "batched_4d",
            "value": 2.4428319999572068e-05,
            "range": "\u00b1 0.000042",
            "unit": "s",
            "extra": "min=0.000019 max=0.000445"
          },
          {
            "name": "phase2_tomography",
            "value": 0.0965033582000018,
            "range": "\u00b1 0.004268",
            "unit": "s",
            "extra": "n_sel=32"
          },
          {
            "name": "phase2_many_small",
            "value": 0.08741305819999638,
            "range": "\u00b1 0.003161",
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
        "date": 1769110033547,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "python_loop",
            "value": 0.0018009833699993295,
            "range": "\u00b1 0.000853",
            "unit": "s",
            "extra": "min=0.001391 max=0.007145"
          },
          {
            "name": "c_loop",
            "value": 0.00016842045999936772,
            "range": "\u00b1 0.00014",
            "unit": "s",
            "extra": "min=0.000130 max=0.001423"
          },
          {
            "name": "batched_3d",
            "value": 1.977415999917298e-05,
            "range": "\u00b1 0.000002",
            "unit": "s",
            "extra": "min=0.000018 max=0.000036"
          },
          {
            "name": "batched_4d",
            "value": 2.0394610000380454e-05,
            "range": "\u00b1 0.000005",
            "unit": "s",
            "extra": "min=0.000019 max=0.000072"
          },
          {
            "name": "phase2_tomography",
            "value": 0.10816977520000251,
            "range": "\u00b1 0.007866",
            "unit": "s",
            "extra": "n_sel=32"
          },
          {
            "name": "phase2_many_small",
            "value": 0.11654525000000149,
            "range": "\u00b1 0.005952",
            "unit": "s",
            "extra": "outer=65536 n=8"
          }
        ]
      }
    ]
  }
}