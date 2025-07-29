---
layout: default
title:  "Useful Bioinformatics Things"
nav_exclude: true
---
<h1>Useful Bioinformatics Things</h1>

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

## Sequence similarity search
### blastn
**Using remote NCBI dataset:**  
```
blastn \
    -query ${INPUT_PATH} 
    -db nt -remote \
    -out ${OUTPUT_PATH}.tsv \
    -outfmt "6 qseqid sseqid qlen slen pident nident length mismatch gapopen qstart qend sstart send evalue bitscore scovhsp qcovhsp ssciname stitle"
```

### Accelerated BLAST - DIAMOND
```
# 1. Make protein database 
diamond makedb \
    --in ${PROTEIN_DATABASE} \
    --db ${PROTEIN_DATABASE}

# 2. Perform BLAST 
diamond blastp \
    --query ${INPUT_PATH} \
    --db ${PROTEIN_DATABASE} --out ${OUTPUT_PATH} \
    --outfmt 6 qseqid sseqid qlen slen pident nident length mismatch gapopen qstart qend sstart send evalue bitscore full_sseq full_qseq scovhsp qcovhsp
```

