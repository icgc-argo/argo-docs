---
id: rna-alignment
title: RNA-Seq Alignment
sidebar_label: RNA-Seq Alignment
platform_key: DOCS_RNA_PIPELINE
---

[ARGO RNA-Seq Alignment](https://github.com/icgc-argo-workflows/rna-seq-alignment/releases) workflow is a critical step in the RNA-Seq data analysis pipeline that involves mapping short RNA sequencing reads to a reference genome or transcriptome. The workflow accepts raw sequencing data in both FASTQ and BAM (aligned or unaligned) format, performs both STAR and HISAT2 alignments, and produces aligned reads in both genome and transcript coordinates, splice junctions and alignment QC reports.

## Inputs

- Submitted FASTQ or BAM files(s)
- Genome Build: [GRCh38_Verily_v1](https://console.cloud.google.com/storage/browser/genomics-public-data/references/GRCh38_Verily)
- Genome Annotation: [GENCODE v40](https://ftp.ebi.ac.uk/pub/databases/gencode/Gencode_human/release_40/gencode.v40.chr_patch_hapl_scaff.annotation.gtf.gz)

## Processing

- Submitted sequencing reads (FASTQ or BAM) are converted into lane level (i.e read group level) BAMs.
- (Optional) [FastQC](https://www.bioinformatics.babraham.ac.uk/projects/fastqc/) is used for read group level Sequencing QC.
- [STAR](https://github.com/alexdobin/STAR) and [HISAT2](https://daehwankimlab.github.io/hisat2/) are used to map the reads to the reference genome
- [Biobambam2 (version 2.0.153)](https://gitlab.com/german.tischler/biobambam2/-/archive/2.0.153-release-20200124123734/biobambam2-2.0.153-release-20200124123734.tar.gz) is used to mark duplicates per library.
- [Picard:CollectRnaSeqMetrics](https://gatk.broadinstitute.org/hc/en-us/articles/13832772676379-CollectRnaSeqMetrics-Picard-) is used to produce RNA alignment metrics

## Outputs

- [Aligned Reads](/docs/data/reads#aligned-reads) and [Aligned Reads Index](/docs/data/reads#aligned-reads-index)
- [Splice Junctions](/docs/data/transcriptome-profiling#splice-junctions)

- QC metrics files
  - [Alignment Metrics](/docs/data/qc-metrics#aligned-reads-qc) files
  - [Duplicates Metrics](/docs/data/qc-metrics#aligned-reads-qc) files

## Workflow Diagram

![Alignment Workflow](/assets/analysis-workflows/RNA-Seq-Alignment.png)
