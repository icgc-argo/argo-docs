---
id: dna-pipeline
title: DNA-Seq Analysis Pipeline
---

The DNA-Seq analysis pipeline identifies somatic variants within whole exome sequencing (WXS) and whole genome sequencing (WGS) data. Somatic variants are identified by comparing allele frequencies in normal and tumor sample alignments, annotating each mutation, and aggregating mutations from multiple cases into one project file.

The first pipeline starts with a reference alignment step followed by co-cleaning to increase the alignment quality. Four different variant calling pipelines are then implemented separately to identify somatic mutations. Somatic-caller-identified variants are then annotated. An aggregation pipeline incorporates variants from all cases in one project into a MAF file for each pipeline.
DNA-Seq analysis is implemented across six main procedures:

Genome Alignment
Alignment Co-Cleaning
Somatic Variant Calling
Variant Annotation
Mutation Aggregation
Aggregated Mutation Masking

## Alignment

The latest version of the alignment workflow can be found [here](https://github.com/icgc-argo/dna-seq-processing-wfs/releases).

## Variant Calling

The ARGO DNA Seq pipeline has adoptd the S

gnment workflow can be found [here](https://github.com/icgc-argo/dna-seq-processing-wfs/releases).
