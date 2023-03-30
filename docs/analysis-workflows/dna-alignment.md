---
id: dna-alignment
title: DNA-Seq Alignment
sidebar_label: DNA-Seq Alignment
platform_key: DOCS_DNA_PIPELINE
---

The ARGO Data Platform accepts raw sequencing data in both FASTQ and BAM (aligned or unaligned) format. The first processing step in the DNA-Seq Pipeline is uniformly aligning samples to the GRCh38 reference genome. For details, please see the latest version of the [ARGO DNA-Seq Alignment](https://github.com/icgc-argo-workflows/dna-seq-processing-wfs/releases).

## Inputs

- All alignments are performed using [GRCh38DH](http://ftp.1000genomes.ebi.ac.uk/vol1/ftp/technical/reference/GRCh38_reference_genome) as the human reference genome
- Submitted FASTQ or BAM files(s)

## Preprocessing

- Submitted sequencing reads (FASTQ or BAM) are converted into lane level (i.e read group level) BAMs.
- [Picard:CollectQualityYieldMetrics](https://gatk.broadinstitute.org/hc/en-us/articles/360042475912-CollectQualityYieldMetrics-Picard-) is used for read group level BAM QC.

## Processing

- [BWA-MEM (version 0.7.17-r1188)](https://github.com/lh3/bwa/archive/v0.7.17.tar.gz) is performed to map the reads to the reference genome for each read group.
- [Biobambam2 (version 2.0.153)](https://gitlab.com/german.tischler/biobambam2/-/archive/2.0.153-release-20200124123734/biobambam2-2.0.153-release-20200124123734.tar.gz) is used to merge all read group level mapped BAMs into sample level BAM and mark duplicates per library.
- [Samtools:stats](http://www.htslib.org/doc/samtools-stats.html) is used to calculate Alignment QC metrics.
- [Picard:CollectOxoGMetrics](https://gatk.broadinstitute.org/hc/en-us/articles/360040098852-CollectOxoGMetrics-Picard-) is used to calculate the `OxoQ` score for oxidative artifact assessment.

## Outputs

- [Aligned Reads](/docs/data/reads#aligned-reads) CRAM and [Aligned Reads Index](/docs/data/reads#aligned-reads-index)
- QC metrics files
  - [Alignment Metrics](/docs/data/qc-metrics#aligned-reads-qc) files
  - [OxoG Metrics](/docs/data/qc-metrics#aligned-reads-qc) files
  - [Duplicates Metrics](/docs/data/qc-metrics#aligned-reads-qc) files
  - [Read Group Metrics](/docs/data/qc-metrics#sequencing-qc) files for each submitted read group

## Workflow Diagram

![Alignment Workflow](/assets/analysis-workflows/ARGO-Alignment.png)
