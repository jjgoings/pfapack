import time
import numpy as np
from pfapack.ctypes import pfaffian
from pfapack.ctypes import pfaffian_batched
from pfapack.ctypes import pfaffian_batched_4d
from pfapack.ctypes import pfaffian_batched_4d_with_inverse

def create_test_matrices(num_replicas, num_walkers, N, seed=None):
    """Create random skew-symmetric test matrices."""
    if seed is not None:
        np.random.seed(seed)
    A = np.random.randn(num_replicas, num_walkers, N, N) + 1j * np.random.randn(num_replicas, num_walkers, N, N)
    return A - np.transpose(A, (0, 1, 3, 2))  # Make skew-symmetric

def time_function(func, *args, n_repeats=5):
    """Time a function execution with multiple repeats."""
    times = []
    results = None
    for _ in range(n_repeats):
        start_time = time.perf_counter()
        results = func(*args)
        times.append(time.perf_counter() - start_time)
    return np.array(times), results

def main():
    # Test parameters
    num_replicas = 13513
    num_walkers = 17 
    N = 16 
    num_test_runs = 5

    print(f"Test Configuration:")
    print(f"Matrix dimensions: ({num_replicas}, {num_walkers}, {N}, {N})")
    print(f"Number of test runs: {num_test_runs}")

    methods = {
        'pfaffian': pfaffian,
        'batched': pfaffian_batched,
        'batched_4d': pfaffian_batched_4d,
        'batched_4d_with_inverse': pfaffian_batched_4d_with_inverse
    }

    results = {name: [] for name in methods}
    pfaffian_values = {}

    for run in range(num_test_runs):
        print(f"\nRun {run + 1}/{num_test_runs}")

        # Generate test matrices
        A = create_test_matrices(num_replicas, num_walkers, N, seed=run)

        # Time each implementation
        for name, func in methods.items():
            print(f"\nTiming {name}...")

            if name == 'pfaffian':
                # Single matrix version
                times, vals = time_function(
                    lambda: func(A[0,0])
                )
            elif name == 'batched':
                # Batch of matrices
                times, vals = time_function(
                    lambda: func(A[0])
                )
            elif name == 'batched_4d':
                # Regular 4D batch
                times, vals = time_function(
                    lambda: func(A)
                )
            elif name == 'batched_4d_with_inverse':
                # With inverse computation - now using complex arrays directly
                A_copy = A.copy()  # Create copy to avoid modifying original
                times, vals = time_function(
                    lambda: func(A_copy)[0]  # Still just comparing pfaffians
                )

            results[name].extend(times)
            if run == 0:  # Store values from first run for validation
                pfaffian_values[name] = vals

            print(f"  Times: {times}")

        # Validate results match between implementations
        if run == 0:
            print("\nValidating results match between implementations...")
            ref_val = pfaffian_values['pfaffian']
            for name, vals in pfaffian_values.items():
                if name != 'pfaffian':
                    if name == 'batched':
                        error = abs(vals[0] - ref_val)
                    elif name == 'batched_4d' or name == 'batched_4d_with_inverse':
                        error = abs(vals[0,0] - ref_val)
                    else:
                        continue
                    flag = "✅" if error < 1e-12 else "❌"
                    print(f"  {flag} Error {name} vs single: {error:.2e}")

            # Additional validation for inverse computation
            if 'batched_4d_with_inverse' in pfaffian_values:
                print("\nValidating inverse computation...")
                pfaffs, invs = methods['batched_4d_with_inverse'](A.copy())
                # Check A * A^(-1) = I for first matrix
                prod = np.matmul(A[0, 0], invs[0, 0])
                error = np.max(np.abs(prod - np.eye(N)))
                flag = "✅" if error < 1e-12 else "❌"
                print(f"  {flag} Maximum deviation from identity for AA^(-1): {error:.2e}")

    # Print final statistics
    print("\nPerformance Statistics (in seconds):")
    for name, times in results.items():
        times = np.array(times)
        print(f"\n{name}:")
        print(f"  Mean time:   {np.mean(times):.6f}")
        print(f"  Std dev:     {np.std(times):.6f}")
        print(f"  Min time:    {np.min(times):.6f}")
        print(f"  Max time:    {np.max(times):.6f}")

if __name__ == "__main__":
    main()
