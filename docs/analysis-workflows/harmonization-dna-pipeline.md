---
id: dna-pipeline
title: DNA-Seq Analysis Pipeline
---

![Reminder Banner](/assets/submission/banner-reminder.svg)

The DNA-Sequencing (DNA-Seq) analysis pipeline identifies multiple types of somatic variant from both Whole Exome Sequencing (WXS) and Whole Genome Sequencing (WGS) sample data. DNA-Seq analysis is implemented across two main procedures:

- Sequence Alignment
- Variant Calling

In the future, these procedures will be extended to include:

- Variant Masking
- Variant Annotation
- Consensus Calling

## Alignment

The ARGO Data Platform accepts raw sequencing data in both FASTQ and BAM (aligned or unaligned) format. The first processing step in the DNA-Seq Pipeline is uniformly aligning samples to the GRCh38 HL7 reference genome. For details, please see the latest version of the [ARGO DNA Alignment](https://github.com/icgc-argo/dna-seq-processing-wfs/releases).

### Inputs

- All alignments are performed using the human reference genome **[GRCh38 HL7](http://ftp.1000genomes.ebi.ac.uk/vol1/ftp/technical/reference/GRCh38_reference_genome)** as the reference genome
- Submitted FASTQ or BAM files(s)

### Preprocessing

- Submitted sequencing reads (FASTQ or BAM) are translated into lane level (i.e read group level) BAMs
- Use Picard tool `CollectQualityYieldMetrics` for read group
- QC

### Processing

- For each lane BAM **[BWA-MEM version 0.7.17-r1188](https://github.com/lh3/bwa/archive/v0.7.17.tar.gz)** is run.
- One all lane BAMS have completed, **[Biobambam version 2.0.153](https://gitlab.com/german.tischler/biobambam2/-/archive/2.0.153-release-20200124123734/biobambam2-2.0.153-release-20200124123734.tar.gz)** is used to mark duplicates.
- Calculate Alignment QC metrics using `samtools stats`
- Calculate `OxoQ` score to assess oxidative artifacts is calulated with Picard `CollectOxoGMetrics`

### Outputs

- Aligned Read CRAM file
- CRAI Index file
- Alignment QC Metrics

![Alignment Workflow](/assets/analysis-workflows/ARGO-Alignment.png)

## Sanger WGS Variant Calling

The ARGO DNA Seq pipeline has adopted the Sanger Variant Calling docker.

![Sanger WGS Variant Calling Workflow](/assets/analysis-workflows/ARGO-WGS-variant-calling.png)

For details, please see the latest version of the [ARGO Sanger WGS Variant Calling workflow](https://github.com/icgc-argo/sanger-wgs-variant-calling/releases).

## Sanger WXS Variant Calling

![Sanger WXS Variant Calling Workflow](/assets/analysis-workflows/ARGO-WXS-variant-calling.png)

For details, please see the latest version of the [ARGO Sanger WXS Variant Calling workflow](https://github.com/icgc-argo/sanger-wxs-variant-calling/releases).
