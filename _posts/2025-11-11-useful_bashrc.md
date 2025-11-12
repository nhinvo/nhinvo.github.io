---
layout: post
title: Useful .bashrc Things
date: 2025-11-11 21:15:00
description: an example of a blog post with some code
tags: code Bash Linux
categories: coding
---

## Introduction
**What is .bashrc?**  
A configuration file for Bash shell, can be used to personalize your command-line. This file is executed each time a new terminal window opens.  
It's used to set environment variables, define aliases (shortcuts), create custom functions, and customize prompt. 

**Compared to .bash_profile:**  
.bash_profile also sets configuration for Bash shell, but is executed only once when you log into your account.  
I prefer setting all my aliases in .bashrc.  

**Note:** This page is for Linux command line only. 

## Setting Aliases (Shortcuts)
You can set shortcuts using `alias` in your .bashrc file:  
```
# .bashrc

# shortcut to move to parent directory and print files/folders
alias ..='cd ..;pwd;ls'  

# adding params to ls (human readable + sort by file size)
alias ls='ls --human-readable --size -1 -S --classify'  
```

After adding the alias above, start a new terminal to use your new shortcuts.  

**Shortcuts for SLURM**
```
# .bashrc

# show the queue for my account/user
alias myq='squeue -u USERNAME -l'

# show the queue for a partition 
alias pn_q='squeue -p PARTITION_NAME'

# additional params to sinfo 
alias sinfo=sinfo --format="%21P %12l %5D %10T %5c %9m %N" --states=ALLOC,ALLOCATED,COMP,COMPLETING,IDLE,MIX,MIXED

# show idle nodes on partitions 
alias sinfo_idle=sinfo --format="%21P %12l %5D %10T %5c %9m %N" --states=IDLE
```

**Shortcuts for Conda/Mamba**
```
# .bashrc

alias condaa='mamba activate'
alias condad='mamba deactivate'

# shortcut for a commonly activated/used conda environment 
# I have one that contains pandas, numpy, matplotlib and other Python data packages
alias CONDA_ENV_NAME='mamba activate CONDA_ENV_NAME'
```

**Other Linux/Bash Shortcuts**
```
# .bashrc

# change group recursively 
alias chgrp='chgrp -R GROUPNAME *'  

# change permission recursively
alias chmod='chmod -R g+rwx *' 

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


