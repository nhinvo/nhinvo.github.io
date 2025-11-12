---
layout: post
title: Useful things for Bioinformatics
date: 2025-11-11 21:15:00
description: an example of a blog post with some code
tags: code Bash Linux
categories: coding
---

# High-performance Computing (HPC) | SLURM 
---------------------------------------------------------------
## Checking Available HPC Resource 

## SLURM Script
### Best Practices 
**Don't:** 
- Submit many SLURM arrays for each small/fast jobs → inefficient
    - Scheduler will likely have trouble managing many short-lived jobs
    - SLURM arrays are most efficient when each process is already multithreaded and can take advantage of all cores in the node
    - SLURM arrays should ideally only be used in scenarios where < 250 long-running elements are submitted
    - Workloads that process hundreds/thousands of inputs that run for a few minutes/hours → should use GNU parallel instead
    - Favor a single job running on a full node: will be faster + more efficient

### ##SBATCH Resource Specifications  
For better logging of your SLURM scripts, consider adding Job ID and Array ID (if running SLURM arrays)  to .out and .err files. 
```
#SBATCH -o log-%j_%a.out
#SBATCH -e log-%j_%a.err
```


# Python 
---------------------------------------------------------------
## Python pathlib library 
The Python <a href="https://docs.python.org/3/library/pathlib.html" target="_blank">pathlib</a> library is very useful for handling file paths. 

```python
from pathlib import Path

target_directory = Path('genomes')  # convert to object 
extension = 'fasta'

# cycle through each file in a directory matching extension
for file_path in target_directory.glob(f'*{extension}'):
    # obtain file name without extension
    file_name = file_path.stem 

    print(f'Path to file: {file_path}')
    print(f'File name: {file_name}\n')

# obtain a list of files in a directory
file_paths = list(target_directory.glob('*'))
print(file_paths)
```
```
Path to file: genomes/MED4.fasta
File name: MED4

Path to file: genomes/MIT9301.fasta
File name: MIT9301

Path to file: genomes/NATL2A.fasta
File name: NATL2A

[PosixPath('genomes/MED4.fasta'), PosixPath('genomes/MIT9301.fasta'), PosixPath('genomes/NATL2A.fasta'), PosixPath('genomes/NATL1A.fna')]
```

