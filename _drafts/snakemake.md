---
layout: default
title:  "Useful Snakemake Things"
parent: Blogs
permalink: /blogs/snakemake
nav_exclude: true
---
<h1>Useful Snakemake Things</h1>

## Input files from multiple sources
To have Snakemake process input files from 2 different sources: local files and SRA files, use Snakemake [`ruleorder`](https://snakemake.readthedocs.io/en/stable/snakefiles/rules.html#handling-ambiguous-rules).  

For example, you want to trim reads from files in your local computer, but also SRA files from online sources. Example use case in this taxonomic classification pipeline at this Git repo: [biofilm-prochlorococcus](https://github.com/nhinvo/biofilm-prochlorococcus/tree/main/TaxonomicClassification/Modified-ProSynTax-Workflow).  With `ruleorder`, you can tell Snakemake to perform the local trimming first, which will not work on SRA files due to missing input files. rule trim_sra will then be used as it connects to the SRA_download rule.  


**Example samples.tsv file**:     

| sample         | forward read        | reverse read         |
|:---------------|:--------------------|:---------------------|
| local_sample_1 | local/path/fwd_read | local/path/rev_read  |
| SRR23969212    |                     |                      |
| ERR588857      |                     |                      |

**Snakemake SRA download rule**:  
```
rule SRA_download:
    """
    Download raw read sample from SRA. 
    """
    output:
        r1 = "path/to/output_SRA_dir/{sample}_1.fastq",
        r2 = "path/to/output_SRA_dir/{sample}_2.fastq",
    shell:
        """
        ACCESSION={wildcards.sample}
        OUTPUT_DIR=$(dirname {output.r1})

        prefetch \
            $ACCESSION \
            --output-directory $OUTPUT_DIR

        echo fasterq-dump ... 
        fasterq-dump \
            $OUTPUT_DIR/$ACCESSION/ \
            --split-files --outdir $OUTPUT_DIR
        """
```

**Snakemake read trimming rule**:  
```
# specifies with run trim rule to run first 
ruleorder: trim_local > trim_sra 

rule trim_local:
    """
    Trims reads for local files that have forward and reverse read files. 
    """
    input:
        r1 = lambda wildcards: str(SAMPLE_TABLE.loc[wildcards.sample, 'forward read']),
        r2 = lambda wildcards: str(SAMPLE_TABLE.loc[wildcards.sample, 'reverse read']),
        ref = "path/to/reference.fasta"
    output:
        o1 = "path/to/trimmed_dir/{sample}_1_trimmed.fastq.gz",
        o2 = "path/to/trimmed_dir/{sample}_1_trimmed.fastq.gz",
    shell:
        """
        # your read trim command here. 
        """

rule trim_sra:
    """
    Trims reads for files that need SRA download first. 
    """
    input:
        # connect read trim input to rule SRA_download output 
        r1 = "path/to/output_SRA_dir/{sample}_1.fastq",
        r2 = "path/to/output_SRA_dir/{sample}_2.fastq",
        ref = "path/to/reference.fasta"
    output:
        o1 = "path/to/trimmed_dir/{sample}_1_trimmed.fastq.gz",
        o2 = "path/to/trimmed_dir/{sample}_1_trimmed.fastq.gz",
    shell:
        """
        # your read trim command here. 
        """
```
