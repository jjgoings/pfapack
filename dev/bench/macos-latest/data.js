window.BENCHMARK_DATA = {
  "lastUpdate": 1769112979483,
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
        "date": 1769110948061,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "python_loop",
            "value": 0.0015986221199996464,
            "range": "± 0.000388",
            "unit": "s",
            "extra": "min=0.001459 max=0.004581"
          },
          {
            "name": "c_loop",
            "value": 0.00013684919999889188,
            "range": "± 0.000145",
            "unit": "s",
            "extra": "min=0.000110 max=0.001485"
          },
          {
            "name": "batched_3d",
            "value": 0.00003892406999966624,
            "range": "± 0.000012",
            "unit": "s",
            "extra": "min=0.000035 max=0.000123"
          },
          {
            "name": "batched_4d",
            "value": 0.000039699549998601926,
            "range": "± 0.000006",
            "unit": "s",
            "extra": "min=0.000038 max=0.000091"
          },
          {
            "name": "phase2_many_small",
            "value": 0.9039764080000026,
            "range": "± 0.058224",
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
        "date": 1769110961746,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "python_loop",
            "value": 0.0017886283000007096,
            "range": "± 0.000818",
            "unit": "s",
            "extra": "min=0.001459 max=0.006008"
          },
          {
            "name": "c_loop",
            "value": 0.00018491373000188106,
            "range": "± 0.000146",
            "unit": "s",
            "extra": "min=0.000112 max=0.000908"
          },
          {
            "name": "batched_3d",
            "value": 0.00003880123999977059,
            "range": "± 0.00001",
            "unit": "s",
            "extra": "min=0.000035 max=0.000111"
          },
          {
            "name": "batched_4d",
            "value": 0.00006532915999827083,
            "range": "± 0.000064",
            "unit": "s",
            "extra": "min=0.000038 max=0.000444"
          },
          {
            "name": "phase2_many_small",
            "value": 1.0557946748000062,
            "range": "± 0.095023",
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
        "date": 1769110940556,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "python_loop",
            "value": 0.0015735201000001099,
            "range": "± 0.000105",
            "unit": "s",
            "extra": "min=0.001464 max=0.002265"
          },
          {
            "name": "c_loop",
            "value": 0.00013992913999942404,
            "range": "± 0.000085",
            "unit": "s",
            "extra": "min=0.000115 max=0.000919"
          },
          {
            "name": "batched_3d",
            "value": 0.0000433470600006558,
            "range": "± 0.000024",
            "unit": "s",
            "extra": "min=0.000035 max=0.000158"
          },
          {
            "name": "batched_4d",
            "value": 0.00005115665999852581,
            "range": "± 0.000056",
            "unit": "s",
            "extra": "min=0.000037 max=0.000545"
          },
          {
            "name": "phase2_many_small",
            "value": 0.8545662413999991,
            "range": "± 0.030174",
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
        "date": 1769110831617,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "python_loop",
            "value": 0.0016851953399996944,
            "range": "± 0.000494",
            "unit": "s",
            "extra": "min=0.001478 max=0.004564"
          },
          {
            "name": "c_loop",
            "value": 0.0001502546200009647,
            "range": "± 0.000093",
            "unit": "s",
            "extra": "min=0.000130 max=0.000952"
          },
          {
            "name": "batched_3d",
            "value": 0.000023562850000331536,
            "range": "± 0.000007",
            "unit": "s",
            "extra": "min=0.000020 max=0.000071"
          },
          {
            "name": "batched_4d",
            "value": 0.0000463591200002611,
            "range": "± 0.000022",
            "unit": "s",
            "extra": "min=0.000037 max=0.000210"
          },
          {
            "name": "phase2_many_small",
            "value": 1.5987763831999984,
            "range": "± 0.241556",
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
            "range": "± 0.000121",
            "unit": "s",
            "extra": "min=0.001376 max=0.002130"
          },
          {
            "name": "c_loop",
            "value": 0.00015757044000068278,
            "range": "± 0.000118",
            "unit": "s",
            "extra": "min=0.000131 max=0.001100"
          },
          {
            "name": "batched_3d",
            "value": 0.000021773359999883724,
            "range": "± 0.000003",
            "unit": "s",
            "extra": "min=0.000021 max=0.000041"
          },
          {
            "name": "batched_4d",
            "value": 0.00002256375999976967,
            "range": "± 0.000006",
            "unit": "s",
            "extra": "min=0.000021 max=0.000077"
          },
          {
            "name": "phase2_tomography",
            "value": 0.09678564199999755,
            "range": "± 0.002661",
            "unit": "s",
            "extra": "n_sel=32"
          },
          {
            "name": "phase2_many_small",
            "value": 0.12750932499999976,
            "range": "± 0.003901",
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
            "range": "± 0.000979",
            "unit": "s",
            "extra": "min=0.001495 max=0.007017"
          },
          {
            "name": "c_loop",
            "value": 0.0001663178699988066,
            "range": "± 0.000117",
            "unit": "s",
            "extra": "min=0.000134 max=0.001171"
          },
          {
            "name": "batched_3d",
            "value": 0.00002223043000128655,
            "range": "± 0.000007",
            "unit": "s",
            "extra": "min=0.000019 max=0.000062"
          },
          {
            "name": "batched_4d",
            "value": 0.00002306128000100216,
            "range": "± 0.000011",
            "unit": "s",
            "extra": "min=0.000020 max=0.000087"
          },
          {
            "name": "phase2_tomography",
            "value": 0.13128392480001594,
            "range": "± 0.018723",
            "unit": "s",
            "extra": "n_sel=32"
          },
          {
            "name": "phase2_many_small",
            "value": 0.12298230840000315,
            "range": "± 0.009076",
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
            "range": "± 0.000935",
            "unit": "s",
            "extra": "min=0.001478 max=0.005090"
          },
          {
            "name": "c_loop",
            "value": 0.00020817415999800913,
            "range": "± 0.00014",
            "unit": "s",
            "extra": "min=0.000132 max=0.001032"
          },
          {
            "name": "batched_3d",
            "value": 0.00001975955000034446,
            "range": "± 0.000003",
            "unit": "s",
            "extra": "min=0.000018 max=0.000046"
          },
          {
            "name": "batched_4d",
            "value": 0.000027749620000463436,
            "range": "± 0.000055",
            "unit": "s",
            "extra": "min=0.000019 max=0.000560"
          },
          {
            "name": "phase2_tomography",
            "value": 0.1074303835999956,
            "range": "± 0.005622",
            "unit": "s",
            "extra": "n_sel=32"
          },
          {
            "name": "phase2_many_small",
            "value": 0.09370094999999878,
            "range": "± 0.00416",
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
            "range": "± 0.000047",
            "unit": "s",
            "extra": "min=0.001447 max=0.001805"
          },
          {
            "name": "c_loop",
            "value": 0.000152817059999677,
            "range": "± 0.00009",
            "unit": "s",
            "extra": "min=0.000134 max=0.000903"
          },
          {
            "name": "batched_3d",
            "value": 0.000021025829999530286,
            "range": "± 0.000008",
            "unit": "s",
            "extra": "min=0.000018 max=0.000085"
          },
          {
            "name": "batched_4d",
            "value": 0.000019840389999785657,
            "range": "± 0.000005",
            "unit": "s",
            "extra": "min=0.000019 max=0.000068"
          },
          {
            "name": "phase2_tomography",
            "value": 0.09320284140000012,
            "range": "± 0.000643",
            "unit": "s",
            "extra": "n_sel=32"
          },
          {
            "name": "phase2_many_small",
            "value": 0.09016206679999925,
            "range": "± 0.001238",
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
            "range": "± 0.000191",
            "unit": "s",
            "extra": "min=0.001422 max=0.002999"
          },
          {
            "name": "c_loop",
            "value": 0.00014605630000033898,
            "range": "± 0.000095",
            "unit": "s",
            "extra": "min=0.000126 max=0.001080"
          },
          {
            "name": "batched_3d",
            "value": 0.00001877084999961198,
            "range": "± 0.000002",
            "unit": "s",
            "extra": "min=0.000018 max=0.000036"
          },
          {
            "name": "batched_4d",
            "value": 0.000024428319999572068,
            "range": "± 0.000042",
            "unit": "s",
            "extra": "min=0.000019 max=0.000445"
          },
          {
            "name": "phase2_tomography",
            "value": 0.0965033582000018,
            "range": "± 0.004268",
            "unit": "s",
            "extra": "n_sel=32"
          },
          {
            "name": "phase2_many_small",
            "value": 0.08741305819999638,
            "range": "± 0.003161",
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
            "range": "± 0.000853",
            "unit": "s",
            "extra": "min=0.001391 max=0.007145"
          },
          {
            "name": "c_loop",
            "value": 0.00016842045999936772,
            "range": "± 0.00014",
            "unit": "s",
            "extra": "min=0.000130 max=0.001423"
          },
          {
            "name": "batched_3d",
            "value": 0.00001977415999917298,
            "range": "± 0.000002",
            "unit": "s",
            "extra": "min=0.000018 max=0.000036"
          },
          {
            "name": "batched_4d",
            "value": 0.000020394610000380454,
            "range": "± 0.000005",
            "unit": "s",
            "extra": "min=0.000019 max=0.000072"
          },
          {
            "name": "phase2_tomography",
            "value": 0.10816977520000251,
            "range": "± 0.007866",
            "unit": "s",
            "extra": "n_sel=32"
          },
          {
            "name": "phase2_many_small",
            "value": 0.11654525000000149,
            "range": "± 0.005952",
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
        "date": 1769110752032,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "python_loop",
            "value": 0.0024275841700000457,
            "range": "± 0.000891",
            "unit": "s",
            "extra": "min=0.001472 max=0.005649"
          },
          {
            "name": "c_loop",
            "value": 0.00021194246999300503,
            "range": "± 0.000182",
            "unit": "s",
            "extra": "min=0.000132 max=0.001275"
          },
          {
            "name": "batched_3d",
            "value": 0.00001995791000297231,
            "range": "± 0.000003",
            "unit": "s",
            "extra": "min=0.000018 max=0.000043"
          },
          {
            "name": "batched_4d",
            "value": 0.000020805409998274628,
            "range": "± 0.000005",
            "unit": "s",
            "extra": "min=0.000019 max=0.000072"
          },
          {
            "name": "phase2_tomography",
            "value": 0.12084996679999449,
            "range": "± 0.011099",
            "unit": "s",
            "extra": "n_sel=32"
          },
          {
            "name": "phase2_many_small",
            "value": 0.12620665839999673,
            "range": "± 0.004431",
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
        "date": 1769110879977,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "python_loop",
            "value": 0.0022627216000006456,
            "range": "± 0.001294",
            "unit": "s",
            "extra": "min=0.001466 max=0.007367"
          },
          {
            "name": "c_loop",
            "value": 0.00018345711999813829,
            "range": "± 0.000185",
            "unit": "s",
            "extra": "min=0.000134 max=0.001731"
          },
          {
            "name": "batched_3d",
            "value": 0.000019272930000511223,
            "range": "± 0.000001",
            "unit": "s",
            "extra": "min=0.000019 max=0.000032"
          },
          {
            "name": "batched_4d",
            "value": 0.000019895430000360648,
            "range": "± 0.000005",
            "unit": "s",
            "extra": "min=0.000019 max=0.000067"
          },
          {
            "name": "phase2_tomography",
            "value": 0.12699158340000166,
            "range": "± 0.012310",
            "unit": "s",
            "extra": "n_sel=32"
          },
          {
            "name": "phase2_many_small",
            "value": 0.1283822836000013,
            "range": "± 0.010354",
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
        "date": 1769111773325,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "python_loop",
            "value": 0.0015253111500007322,
            "range": "± 0.000253",
            "unit": "s",
            "extra": "min=0.001451 max=0.003332"
          },
          {
            "name": "c_loop",
            "value": 0.00014805968999993978,
            "range": "± 0.000104",
            "unit": "s",
            "extra": "min=0.000130 max=0.001035"
          },
          {
            "name": "batched_3d",
            "value": 0.00001857211999890751,
            "range": "± 0.000001",
            "unit": "s",
            "extra": "min=0.000018 max=0.000029"
          },
          {
            "name": "batched_4d",
            "value": 0.000019765449999766814,
            "range": "± 0.000005",
            "unit": "s",
            "extra": "min=0.000019 max=0.000063"
          },
          {
            "name": "phase2_tomography",
            "value": 0.09787997500000359,
            "range": "± 0.005504",
            "unit": "s",
            "extra": "n_sel=32"
          },
          {
            "name": "phase2_many_small",
            "value": 0.09505199159999904,
            "range": "± 0.003891",
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
        "date": 1769112741817,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "python_loop",
            "value": 0.0015543187100007573,
            "range": "± 0.00023",
            "unit": "s",
            "extra": "min=0.001347 max=0.003177"
          },
          {
            "name": "c_loop",
            "value": 0.000152309530001844,
            "range": "± 0.000108",
            "unit": "s",
            "extra": "min=0.000122 max=0.001051"
          },
          {
            "name": "batched_3d",
            "value": 0.000019670780001774802,
            "range": "± 0.000002",
            "unit": "s",
            "extra": "min=0.000019 max=0.000037"
          },
          {
            "name": "batched_4d",
            "value": 0.000020662889995719523,
            "range": "± 0.000004",
            "unit": "s",
            "extra": "min=0.000019 max=0.000061"
          },
          {
            "name": "phase2_many_small",
            "value": 0.1356566331999943,
            "range": "± 0.004008",
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
        "date": 1769112864246,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "python_loop",
            "value": 0.0019066633100027275,
            "range": "± 0.000828",
            "unit": "s",
            "extra": "min=0.001465 max=0.005597"
          },
          {
            "name": "c_loop",
            "value": 0.0002640554000049633,
            "range": "± 0.000317",
            "unit": "s",
            "extra": "min=0.000135 max=0.002465"
          },
          {
            "name": "batched_3d",
            "value": 0.000022864089999075077,
            "range": "± 0.000005",
            "unit": "s",
            "extra": "min=0.000021 max=0.000059"
          },
          {
            "name": "batched_4d",
            "value": 0.000023657029998958023,
            "range": "± 0.000007",
            "unit": "s",
            "extra": "min=0.000021 max=0.000080"
          },
          {
            "name": "phase2_tomography",
            "value": 0.12100851679999777,
            "range": "± 0.017777",
            "unit": "s",
            "extra": "n_sel=32"
          },
          {
            "name": "phase2_many_small",
            "value": 0.1894834420000052,
            "range": "± 0.029111",
            "unit": "s",
            "extra": "outer=65536 n=8"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "Joshua Goings",
            "username": "jjgoings",
            "email": "3915169+jjgoings@users.noreply.github.com"
          },
          "committer": {
            "name": "GitHub",
            "username": "web-flow",
            "email": "noreply@github.com"
          },
          "id": "39ec1f1b4755b6350042452b85b008392442e0bd",
          "message": "Merge pull request #2 from jjgoings/2nd_derivative\n\npfaffian derivative functions",
          "timestamp": "2024-12-13T18:52:38Z",
          "url": "https://github.com/jjgoings/pfapack/commit/39ec1f1b4755b6350042452b85b008392442e0bd"
        },
        "date": 1769112978564,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "python_loop",
            "value": 0.0018723520599979793,
            "range": "± 0.0006",
            "unit": "s",
            "extra": "min=0.001455 max=0.006118"
          },
          {
            "name": "c_loop",
            "value": 0.0002313770899991141,
            "range": "± 0.000191",
            "unit": "s",
            "extra": "min=0.000129 max=0.001044"
          },
          {
            "name": "batched_3d",
            "value": 0.00003099084999917068,
            "range": "± 0.000025",
            "unit": "s",
            "extra": "min=0.000021 max=0.000175"
          },
          {
            "name": "batched_4d",
            "value": 0.000050071310000703305,
            "range": "± 0.000035",
            "unit": "s",
            "extra": "min=0.000021 max=0.000289"
          },
          {
            "name": "phase2_tomography",
            "value": 0.16017796679998356,
            "range": "± 0.055033",
            "unit": "s",
            "extra": "n_sel=32"
          },
          {
            "name": "phase2_many_small",
            "value": 0.2176432334000083,
            "range": "± 0.053642",
            "unit": "s",
            "extra": "outer=65536 n=8"
          }
        ]
      }
    ]
  }
}