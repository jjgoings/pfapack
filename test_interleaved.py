import time
import numpy as np
from pfapack import pfaffian as pfa
from pfapack.ctypes import pfaffian as cpfaffian
from pfapack.ctypes import pfaffian_batched as cpfaffian_batched
from pfapack.ctypes import pfaffian_batched_4d as cpfaffian_batched_4d
from pfapack.ctypes import pfaffian_batched_4d_z_with_inverse as cpfaffian_batched_4d_z_with_inverse

# Test parameters
num_replicas = 50000
num_walkers = 17
N = 16
M = num_walkers
num_test_runs = 1

print("Performance Testing - Interleaved Complex Approach")
print(f"Matrix dimensions: ({num_replicas}, {num_walkers}, {N}, {N})")
print(f"Number of test runs: {num_test_runs}")

# Initialize timing arrays
batch_times = []
numpy_times = []
pfaffian_python = []    # Pure Python implementation
pfaffian_c = []         # C implementation
pfaffian_batched = []   # 3D batched
pfaffian_batched_4d = [] # 4D batched

for run in range(num_test_runs):
    print(f"\nRun {run + 1}/{num_test_runs}")
    
    # Generate new random matrices for each run
    np.random.seed(run)  # Different seed each run
    A = np.random.randn(num_replicas, M, N, N) + 1j * np.random.randn(num_replicas, M, N, N)
    A = A - np.transpose(A, (0, 1, 3, 2))  # Make skew-symmetric
    
    # Time batched implementation with inverse
    start_time = time.time()
    pfaff_batch, inverses = cpfaffian_batched_4d_z_with_inverse(A.copy())
    batch_time = time.time() - start_time
    batch_times.append(batch_time)
    
    # Time numpy implementation (moved all reshaping)
    flat_shape = (-1, N, N)
    A_flat = A.reshape(flat_shape)
    start_time = time.time()
    numpy_inverses = np.linalg.inv(A_flat)
    numpy_time = time.time() - start_time
    numpy_times.append(numpy_time)
    numpy_inverses = numpy_inverses.reshape(A.shape)
    
    # Validate Pfaffians using different methods (on subset for expensive ones)
    if run == 0:
        print("\nValidating Pfaffian calculations...")
        
        # Test on a smaller subset for expensive methods
        test_replicas = min(2, num_replicas)
        test_walkers = min(5, M)
        
        # Python implementation (pure Python)
        start_time = time.time()
        pf_python = [[pfa.pfaffian(A[i,j]) for j in range(test_walkers)] 
                    for i in range(test_replicas)]
        pfaffian_python.append(time.time() - start_time)
        
        # C implementation (non-batched)
        start_time = time.time()
        pf_c = [[cpfaffian(A[i,j]) for j in range(test_walkers)] 
                for i in range(test_replicas)]
        pfaffian_c.append(time.time() - start_time)
        
        # Batched 3D implementation
        start_time = time.time()
        pf_batched = [cpfaffian_batched(A[i,:test_walkers]) 
                     for i in range(test_replicas)]
        pfaffian_batched.append(time.time() - start_time)
        
        # Batched 4D implementation
        start_time = time.time()
        pf_batched_4d = cpfaffian_batched_4d(A[:test_replicas,:test_walkers])
        pfaffian_batched_4d.append(time.time() - start_time)
        
        # Compare results
        for i in range(test_replicas):
            for j in range(test_walkers):
                ref_val = pf_python[i][j]
                test_vals = [
                    pf_c[i][j],
                    pf_batched[i][j],
                    pf_batched_4d[i,j],
                    pfaff_batch[i,j]
                ]
                for val, method in zip(test_vals, ['C', '3D batched', '4D batched', 'New interleaved']):
                    error = abs(val - ref_val)
                    if error > 1e-8:
                        print(f"Error {method} vs Python: {error:.2e}")
        
        # Quick inverse validation
        max_error = 0
        for i in range(test_replicas):
            for j in range(test_walkers):
                identity = np.dot(A[i, j], inverses[i, j])
                error = np.max(np.abs(identity - np.eye(N)))
                max_error = max(max_error, error)
        print(f"\nMaximum error in inverse validation: {max_error:.2e}")

# Calculate statistics
batch_times = np.array(batch_times)
numpy_times = np.array(numpy_times)

print("\nPerformance Statistics (in seconds):")
print("\nBatched Implementation (with inverse):")
print(f"Mean time:   {np.mean(batch_times):.6f}")
print(f"Std dev:     {np.std(batch_times):.6f}")
print(f"Min time:    {np.min(batch_times):.6f}")
print(f"Max time:    {np.max(batch_times):.6f}")

print("\nNumpy Implementation (inverse only):")
print(f"Mean time:   {np.mean(numpy_times):.6f}")
print(f"Std dev:     {np.std(numpy_times):.6f}")
print(f"Min time:    {np.min(numpy_times):.6f}")
print(f"Max time:    {np.max(numpy_times):.6f}")

print("\nSpeed Comparison:")
speedup = numpy_times / batch_times
print(f"Mean speedup over numpy: {np.mean(speedup):.2f}x")
print(f"Std dev of speedup:      {np.std(speedup):.2f}x")
