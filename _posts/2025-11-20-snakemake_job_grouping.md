---
layout: post
title: Snakemake Job Grouping for faster runtime
date: 2025-07-16 
description: How to utilize Snakemake's --groups to make your pipeline for efficient. 
tags: code SLURM HPC Bioinformatics Snakemake 
categories: coding
toc:
  sidebar: left
---

{% include figure.liquid loading="eager" path="assets/img/blogs/2025-11-20-snakemake_job_grouping-workflow_example.png" class="img-fluid rounded z-depth-1" zoomable=true %}
## Introduction  
Before discovering the <a href="https://snakemake.readthedocs.io/en/stable/executing/grouping.html" target="_blank">Job Grouping</a> feature in Snakemake, I set my workflows up to submit processes individually (illustrated above). With this, when each process/step gets submitted to the HPC cluster, jobs have to spend time waiting in the queue before they can start (seen #2 in image above). With the Job Grouping feature, this "queue time" can be reduced (see #3 in image above).  

Queue time isn't a problem if you don't have computational constraints. In a setting where compute nodes are shared, however, you want to utilize as much time as you could once your job starts running. This helps save a lot of time, especially on busy partitions where other users are constantly queueing up jobs.  

## How to group jobs  
There are two ways to group jobs, which I call "horizontally" (without `--group-components`) and "vertically" (with `--group-components`).  

**Horizontal job grouping**  
{% include figure.liquid loading="eager" path="assets/img/blogs/2025-11-20-snakemake_job_grouping-group_components_hor.png" class="img-fluid rounded z-depth-1" zoomable=true %}

To submit steps/rules [A,B,C] as 1 SLURM job, put them into the same group (image above). These rules will be run **in serial**. The same setup using `profile/config.yaml` would be:   
```
groups:
  # group1: rules A, B, and C 
  - A=group1
  - B=group1
  - C=group1
```

Warning: you must make sure that **all rules within a group are assigned to the same partition**. When run in serial, other resource specifications, such as `cpus_per_task` and `mem` will not be summed across rules (compared to below). 

**Vertical job grouping**  
{% include figure.liquid loading="eager" path="assets/img/blogs/2025-11-20-snakemake_job_grouping-group_components_vert.png" class="img-fluid rounded z-depth-1" zoomable=true %}

When you are processing multiple samples, you can group a rule (for example, H) to run **in parallel**. Instead of submitting many small jobs for each rule H, Snakemake will submit 1 job to process 4 H rules (for 4 samples) in parallel (image above). The same setup using `profile/config.yaml` would be:  
```
groups: 
    - H=group1

group-components: 
    - group1=4
```

Warning: make sure the compute nodes in the partition you're submitting this group to will have enough CPU and memory of **the sum** of `cpus_per_task` and `mem` for the group. For example, if rule H requires 2 CPUs and 2G of memory, group1 specified above will need: 2 CPU x 4 components = 8 CPU.  
