---
id: dna-pipeline
title: DNA-Seq Analysis Pipeline
---

The DNA-Seq analysis pipeline identifies various somatic variant types within Whole Exome Sequencing (WXS) and Whole Genome sSquencing (WGS) data.

The first pipeline starts with a reference alignment step followed by co-cleaning to increase the alignment quality. Four different variant calling pipelines are then implemented separately to identify somatic mutations. Somatic-caller-identified variants are then annotated. An aggregation pipeline incorporates variants from all cases in one project into a MAF file for each pipeline.
DNA-Seq analysis is implemented across six main procedures:

## 1. Alignment

- Alignment is completes by BWA-Member
- QC methods used?

The latest version of the alignment workflow can be found [here](https://github.com/icgc-argo/dna-seq-processing-wfs/releases).

## 2. Variant Calling

The ARGO DNA Seq pipeline has adoptd the Sanger Variant Calling docker.

gnment workflow can be found [here](https://github.com/icgc-argo/dna-seq-processing-wfs/releases).
