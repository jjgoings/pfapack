window.BENCHMARK_DATA = {
  "lastUpdate": 1769030388074,
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
          "id": "c0499f3b30b07e105d718877b6eacd01e21f49e1",
          "message": "Fix macOS CI: create gfortran/gcc symlinks for Homebrew gcc-14",
          "timestamp": "2026-01-21T13:15:00-08:00",
          "tree_id": "50b9e1d25812dd8df48ba13a41723bde07d4812c",
          "url": "https://github.com/jjgoings/pfapack/commit/c0499f3b30b07e105d718877b6eacd01e21f49e1"
        },
        "date": 1769030386546,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "python_loop",
            "value": 0.0019734370430697632,
            "range": "± 0.000999",
            "unit": "s",
            "extra": "min=0.001585 max=0.013097"
          },
          {
            "name": "c_loop",
            "value": 0.0003025982153845829,
            "range": "± 0.000456",
            "unit": "s",
            "extra": "min=0.000223 max=0.008330"
          },
          {
            "name": "batched_3d",
            "value": 0.00006495990167123496,
            "range": "± 0.000070",
            "unit": "s",
            "extra": "min=0.000040 max=0.001415"
          },
          {
            "name": "batched_4d",
            "value": 0.000017715582635593267,
            "range": "± 0.000010",
            "unit": "s",
            "extra": "min=0.000016 max=0.001005"
          },
          {
            "name": "phase2_tomography",
            "value": 0.00685860800001592,
            "range": "± 0.002903",
            "unit": "s",
            "extra": "n_sel=16"
          },
          {
            "name": "phase2_many_small",
            "value": 0.02142986659998769,
            "range": "± 0.002964",
            "unit": "s",
            "extra": "outer=8192 n=8"
          }
        ]
      }
    ]
  }
}