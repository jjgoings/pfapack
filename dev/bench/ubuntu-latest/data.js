window.BENCHMARK_DATA = {
  "lastUpdate": 1769030393343,
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
      }
    ]
  }
}