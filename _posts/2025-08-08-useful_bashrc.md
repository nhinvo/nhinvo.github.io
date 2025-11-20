---
layout: post
title: Command line shortcuts to save you time
date: 2025-08-08 
description: I love adding command line shortcuts, and you should too. 
tags: code Bash Linux Shell
categories: coding
toc:
  sidebar: left
---

## What are shortcuts?  
The shortcuts discussed below are custom commands. I often create these shortcuts to save me time typing out commands that I use often. For example: 
  - When I want to view jobs I have running on the HPC (high-performance computing) clusters, instead of typing:  
    ```
    nvo> squeue -u nvo
             JOBID PARTITION     NAME     USER ST       TIME  NODES NODELIST(REASON)
           5514838 sched_mit      job      nvo  R 23-09:16:05      1 node421
    ```  
  - I created a shortcut in my `.bashrc` file (explained further below), so that I can just type `myq` to obtain the same data:  
    ```
    nvo> myq
                JOBID PARTITION     NAME     USER    STATE       TIME TIME_LIMI  NODES NODELIST(REASON)
              5514838 sched_mit      job      nvo  RUNNING 23-09:20:17 26-00:00:00      1 node421
    ``` 

## What is .bashrc?  
A configuration file for Bash shell. This can be used to personalize your command-line. This file gets executed each time a new terminal window opens. It can be used to set environment variables, define aliases (shortcuts), create custom functions, and customize prompt. There is another configuration file for your Bash shell: `.bash_profile`. However, this is executed only once, when you log into your account. Therefore, I prefer setting all my aliases in .bashrc. Lastly, everything on this page is for Linux/UNIX command line only, I cannot guarantee that this will work on other operating systems.  

## How do I set shortcuts for my command line? 
You can set shortcuts using `alias` in your configuration file, which is located in your home directory: `~/.bashrc`. Note: name of shortcut cannot be an already existing command. For example, to move to the parent directory, and then print the path and list files in that directory:  
  ```
  # .bashrc
  alias ..='cd ..;pwd;ls'  
  ```  

After adding the alias above to `~/.bashrc`, start a new terminal to use your new shortcuts: 
  ```
  nvo> pwd
  /home/nvo/bin
  nvo> ..
  /home/nvo
  bin  chisholm_lab  Desktop  Downloads  libexec  ondemand  orcd
  ```  

## Shortcuts that I have   
### General shortcuts  
  ```
  # .bashrc

  # change group recursively 
  alias chgrp='chgrp -R GROUPNAME *'  

  # clear terminal screen
  alias c='clear'  

  # display directory structure better  
  alias tree='tree --dirsfirst -F'  

  # make directory and all parent directories with verbosity
  alias mkdir='mkdir -p -v' 

  # prompts user before deleting file (can be anoying, but safe)
  alias rm='rm -i'  

  # obtain file size in human readable with max depth of 1 
  alias du='du -h --max-depth=1 .'  

  # how much storage is left in current storage 
  alias df='df -h .'
  ```

### Shortcuts for SLURM  
Some shortcuts relating to SLURM/HPC:  
  ```
  # .bashrc

  # show the queue for my account/user
  alias myq='squeue -u [USERNAME] -l'

  # show the queue for a partition 
  alias p_name_q='squeue -p [PARTITION_NAME]'

  # show your jobs on a partition
  alias myq_p='squeue -p [PARTITION_NAME] -u [USERNAME]'

  # start an interactive session 
  alias interactive='salloc -N 1 -n 5 -w [NODENAME] --time=12:00:00 -p [PARTITION_NAME]'

  # additional params to sinfo 
  alias sinfo=sinfo --format="%21P %12l %5D %10T %5c %9m %N" --states=ALLOC,ALLOCATED,COMP,COMPLETING,IDLE,MIX,MIXED

  # show idle nodes on partitions 
  alias sinfo_idle=sinfo --format="%21P %12l %5D %10T %5c %9m %N" --states=IDLE
  ```

## Shortcuts for Conda/Mamba  
Some shortcuts relating to Conda/Mamba (depending on which you prefer):  
  ```
  # .bashrc

  alias condaa='mamba activate'
  alias condad='mamba deactivate'

  # shortcut for a commonly activated/used conda environment 
  # I have one that contains pandas, numpy, matplotlib and other Python data packages
  alias CONDA_ENV_NAME='mamba activate CONDA_ENV_NAME'
  ```


## Shell Prompt 
You can change the prompt of your command line (string that goes before `>`) using:  
  ```
  # .bashrc
  # Editing shell prompt 
  PS1='nvo> '
  ```

  In the command line, my prompt will now be:  
  ```
  nvo> echo Hello world
  Hello world
  ```


