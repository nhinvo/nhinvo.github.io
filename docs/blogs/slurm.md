---
layout: default
title:  "Useful SLURM Things"
parent: Blogs
permalink: /blogs/slurm
---
<h1><center>Useful SLURM/HPC Things</center></h1>

### Useful Commands 
--------------------------------------------------------------------------------
Below are some SLURM commands that I find useful:  

**Submit jobs without a script**
Use the parameter `--wrap` to submit a single command as a job.  

For example, to copy large directories:  
```
sbatch -p PARTITION_NAME -t 12:00:00 --mem 10G --wrap 'rsync -av path/to/source .'
```

Or to run a Python script that might take a long time:  
```
sbatch -p PARTITION_NAME -t 12:00:00 --mem 10G --wrap 'python3 my_python_script.py' -J MY_PYTHON_JOB
```

**Change array throttling limit**  
Number of array jobs being run at once can be changed.  
```
scontrol update ArrayTaskThrottle=[total_job] JobId=[job_ID]
```

**Batch calcelling jobs**  
Cancel jobs with shared name:  
```
squeue -u USERNAME | grep 'JOB_NAME' | awk '{print $1}' | xargs scancel
```

Cancel jobs with shared Job ID (if jobs you want to cancel all start with "9916"):  
```
squeue -u USERNAME | grep '^9916' | awk '{print $1}' | xargs scancel
```

