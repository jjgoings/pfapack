import time
import numpy as np
from pfapack.ctypes import pfaffian as cpfaffian
from pfapack.ctypes import pfaffian_batched as cpfaffian_batched
from pfapack.ctypes import pfaffian_batched_4d as cpfaffian_batched_4d
from pfapack.ctypes import pfaffian_batched_4d_cx as cpfaffian_batched_4d_cx
from pfapack.ctypes import pfaffian_batched_4d_cx_with_inverse as cpfaffian_batched_4d_cx_with_inverse

def create_test_matrices(num_replicas, num_walkers, N, seed=None):
    """Create random skew-symmetric test matrices."""
    if seed is not None:
        np.random.seed(seed)
    A = np.random.randn(num_replicas, num_walkers, N, N) + 1j * np.random.randn(num_replicas, num_walkers, N, N)
    return A - np.transpose(A, (0, 1, 3, 2))  # Make skew-symmetric

def convert_to_block_format(matrices):
    """Convert complex matrices to block format (S,G,2,N,N)."""
    S, G, N, _ = matrices.shape
    result = np.empty((S, G, 2, N, N), dtype=np.float64)
    result[:, :, 0, :, :] = np.real(matrices)
    result[:, :, 1, :, :] = np.imag(matrices)
    return result

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
    num_replicas = 1000
    num_walkers = 17
    N = 16
    num_test_runs = 3

    print(f"Test Configuration:")
    print(f"Matrix dimensions: ({num_replicas}, {num_walkers}, {N}, {N})")
    print(f"Number of test runs: {num_test_runs}")

    methods = {
        'pfaffian': cpfaffian,
        'batched': cpfaffian_batched,
        'batched_4d': cpfaffian_batched_4d,
        'batched_4d_cx (blocked)': cpfaffian_batched_4d_cx,
        'batched_4d_cx_with_inverse': cpfaffian_batched_4d_cx_with_inverse
    }

    results = {name: [] for name in methods}
    pfaffian_values = {}

    for run in range(num_test_runs):
        print(f"\nRun {run + 1}/{num_test_runs}")

        # Generate test matrices
        A = create_test_matrices(num_replicas, num_walkers, N, seed=run)
        A_block = convert_to_block_format(A)

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
            elif name == 'batched_4d_cx (blocked)':
                # Block format
                times, vals = time_function(
                    lambda: func(A_block)
                )
            elif name == 'batched_4d_cx_with_inverse':
                # With inverse computation - now taking blocked format directly
                A_block_copy = A_block.copy()  # Create copy to avoid modifying original
                times, vals = time_function(
                    lambda: func(A_block_copy)[0]  # Still just comparing pfaffians
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
                    elif name == 'batched_4d' or name == 'batched_4d_cx (blocked)' or name == 'batched_4d_cx_with_inverse':
                        error = abs(vals[0,0] - ref_val)
                    else:
                        continue
                    print(f"Error {name} vs single: {error:.2e}")

            # Additional validation for inverse computation
            if 'batched_4d_cx_with_inverse' in pfaffian_values:
                print("\nValidating inverse computation...")
                pfaffs, invs = methods['batched_4d_cx_with_inverse'](A_block.copy())
                # Convert blocked inverse back to complex form for validation
                invs_complex = invs[:, :, 0, :, :] + 1j * invs[:, :, 1, :, :]
                # Check A * A^(-1) = I for first matrix
                prod = np.matmul(A[0, 0], invs_complex[0, 0])
                error = np.max(np.abs(prod - np.eye(N)))
                print(f"Maximum deviation from identity for AA^(-1): {error:.2e}")

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
