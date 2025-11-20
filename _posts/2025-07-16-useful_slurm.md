---
layout: post
title: Useful SLURM/HPC Things
date: 2025-07-16 
description: SLURM commands that I use often. 
tags: code Bash Linux SLURM HPC 
toc:
  sidebar: left
---

## Useful Commands 
Below are some SLURM commands that I find useful.  

**Submit jobs without a script:**  
Use the parameter `--wrap` to submit a single command as a job.  

For example, to copy large directories:  
  ```
  sbatch -p PARTITION_NAME -t 12:00:00 --mem 10G --wrap 'rsync -av path/to/source .'
  ```

Or to run a Python script that might take a long time:  
  ```
  sbatch -p PARTITION_NAME -t 12:00:00 --mem 10G --wrap 'python3 my_python_script.py' -J MY_PYTHON_JOB
  ```

**Change array throttling limit:**  
Number of array jobs being run at once can be changed.  
  ```
  scontrol update ArrayTaskThrottle=[total_job] JobId=[job_ID]
  ```

**Batch calcelling jobs:**  
Cancel jobs with shared name:  
  ```
  squeue -u USERNAME | grep 'JOB_NAME' | awk '{print $1}' | xargs scancel
  ```

Cancel jobs with shared Job ID (if jobs you want to cancel all start with "9916"):  
  ```
  squeue -u USERNAME | grep '^9916' | awk '{print $1}' | xargs scancel
  ```

**Cores available in a partition:**  
Output: A=allocated, I=idle, O=other, T=total
  ```
  sinfo -p [partition_name] -o "%n %e %m %a %c %C"
  ```

**Information about a Node:**  
  ```
  scontrol show node NODE_NAME
  ```
Output:  
- CPUTot: how many CPUs
- RealMemory: mem available
- ThreadsPerCore: how many thread per CPU

**Previously submitted jobs:**  
  ```
  # previous jobs from a user
  sacct -u USERNAME

  # to see jobs from start (-S) to end (-E)
  sacct -u USERNAME --delimiter "," -S 2023-11-29 -E 2023-11-30
  sacct -u USERNAME -S now-2days -E now

  # to obtain jobs that failed/cancelled/etc. 
  sacct -u USERNAME -S now-3days -E now | grep -v -e 'COMPLETED' -e 'RUNNING'
  ```

## SLURM Arrays
SLURM arrays can be used to run multiple tasks/processes in parallel (e.g. run the same analysis on a list/folder of input files).  

SLURM has many useful internal variables (a longer list at this [page](https://docs.hpc.shef.ac.uk/en/latest/referenceinfo/scheduler/SLURM/SLURM-environment-variables.html#gsc.tab=0)), one of them being "`SLURM_ARRAY_TASK_ID`", which is a unique ID for each job in the array. 

An example of SLURM array script:  
  ```
  #!/usr/bin/env bash
  #SBATCH --job-name JOB_NAME
  #SBATCH -t 5:00:00
  #SBATCH -p PARTITION_NAME 
  #SBATCH -c 1   
  #SBATCH --mem 1G
  #SBATCH --array=START-END%JOBS # e.g. 1-10%5 (1 to 10 by 5)
  #SBATCH -o %a-%j.out
  #SBATCH -e %a-%j.err

  echo "$(date): SLURM Job ID: ${SLURM_JOB_ID}"
  echo "$(date): Array index number: ${SLURM_ARRAY_TASK_ID} (out of: ${SLURM_ARRAY_TASK_MAX})"
  echo "$(date): Array Job ID: ${SLURM_ARRAY_JOB_ID}"
  echo "$(date): CPU Requested/Allocated for task: ${SLURM_CPUS_PER_TASK}"

  # 2 ways to access file paths using SLURM arrays: 

  ## 1. using array from a sample.tsv file:
  sample_path=$(sed "${SLURM_ARRAY_TASK_ID}q;d" sample.tsv | cut -f1 | tr -d '\r')

  ## 2. using array on a directory of samples
  sample_path=$(realpath path/to/files/* | sed -n ${SLURM_ARRAY_TASK_ID}p)
  ```

## Terminology
**Cluster**: collection of multiple nodes that are connected  
- Access a cluster by connecting to specific login nodes  

**Node**: individual computer consisting of 1 or more sockets  
- Login nodes (frontend node): for connecting to cluster of a facility  
  - Can be used for testing and performing interactive tasks  
- Backend nodes (compute nodes): reserved for executing computations  
  - Not accessible by users - scheduler manages access   
- Running jobs across multiple nodes: applications need MPI to not be limited by number of cores on a single node  
  - Allows for communication across nodes - Slurm does not constrain job to single node by default  

**CPU** (central processing unit): widely used in field of HPC but lacks a precise definition  
- CPU = physical chip that has 1-32 cores  

**Core**: smallest unit of computing, has one or more threads 
- Can run a single process or thread  
  - Unless core is configured to have 2 threads  

**Thread**: a way of multi-tasking - allows multiple simultaneous tasks to share the same core 
- Multiple threads ≠ multiple cores 

**Socket** (processor): physical package which contains multiple cores sharing the same memory  

**Task & Process**: both refer to a single running program (used interchangeably)   
- Single task/process may use multiple cores (called multithreading), but won’t run across nodes  
- MPI application = multiple separate programs communicating with each other 
- Slurm task = allocation unit; process = actual program running 
- Tasks = processes run in parallel inside the user submitted job 

**-n (—ntasks)**: 
- Useful to run commands in parallel within the same batch script 
- Example: request 2 tasks and run read mapping command on 2 samples in parallel (similar to submitting arrays but processes are paralleled within the same script)
- Useful StackOverflow answer: [link](https://stackoverflow.com/questions/39186698/what-does-the-ntasks-or-n-tasks-does-in-slurm)

**-c (--cpus-per-task)**: number of CPUs allocated per task (number of cores to allocate)   
- This is usually the `--threads` param in bioinformatics software  

**–ntasks vs –cpus-per-task**:   
- Both allocates cores (-n=1 and -c=1 allocates 1 core to job) 
  - `--ntasks=24` → allocates a job with 24 tasks, each task takes up 1 core/CPU, _may be split across multiple nodes_  
  - `--cpus-per-task=24` → allocates a job with 1 task, 24 CPUs for that task - total of 24 CPUs _on a single node_  
- If the number of CPUs requested in `–cpus-per-task` is greater than number of CPUs a compute node has: the _job will fail_  as `-c` tries to allocate cores within the same node.  