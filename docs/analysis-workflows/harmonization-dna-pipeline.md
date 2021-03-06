---
id: dna-pipeline
title: DNA-Seq Analysis Pipeline
platform_key: DOCS_DNA_PIPELINE
---

The DNA-Sequencing (DNA-Seq) analysis pipeline identifies multiple types of somatic variant from both Whole Exome Sequencing (WXS) and Whole Genome Sequencing (WGS) sample data. DNA-Seq analysis is implemented across two main procedures:

- Sequence Alignment
- Variant Calling

In the future, these procedures will be extended to include:

- Variant Masking
- Variant Annotation
- Consensus Calling

## Alignment

The ARGO Data Platform accepts raw sequencing data in both FASTQ and BAM (aligned or unaligned) format. The first processing step in the DNA-Seq Pipeline is uniformly aligning samples to the GRCh38 reference genome. For details, please see the latest version of the [ARGO DNA Alignment](https://github.com/icgc-argo/dna-seq-processing-wfs/releases).

### Inputs

- All alignments are performed using [GRCh38](http://ftp.1000genomes.ebi.ac.uk/vol1/ftp/technical/reference/GRCh38_reference_genome) as the human reference genome
- Submitted FASTQ or BAM files(s)

### Preprocessing

- Submitted sequencing reads (FASTQ or BAM) are converted into lane level (i.e read group level) BAMs.
- [Picard:CollectQualityYieldMetrics](https://gatk.broadinstitute.org/hc/en-us/articles/360042475912-CollectQualityYieldMetrics-Picard-) is used for read group level BAM QC.

### Processing

- [BWA-MEM (version 0.7.17-r1188)](https://github.com/lh3/bwa/archive/v0.7.17.tar.gz) is performed to map the reads to the reference genome for each read group.
- [Biobambam (version 2.0.153)](https://gitlab.com/german.tischler/biobambam2/-/archive/2.0.153-release-20200124123734/biobambam2-2.0.153-release-20200124123734.tar.gz) is used to merge all read group level mapped BAMs into sample level BAM and mark duplicates per library.
- [Samtools:stats](http://www.htslib.org/doc/samtools-stats.html) is used to calculate Alignment QC metrics.
- [Picard:CollectOxoGMetrics](https://gatk.broadinstitute.org/hc/en-us/articles/360040098852-CollectOxoGMetrics-Picard-) is used to calculate the `OxoQ` score for oxidative artifact assessment.

### Outputs

- [Aligned Reads](/docs/data/reads#aligned-reads) CRAM and [Aligned Reads Index](/docs/data/reads#aligned-reads-index)
- QC metrics files
  - [Alignment Metrics](/docs/data/qc-metrics#aligned-reads-qc) files
  - [OxoG Metrics](/docs/data/qc-metrics#aligned-reads-qc) files
  - [Duplicates Metrics](/docs/data/qc-metrics#aligned-reads-qc) files
  - [Read Group Metrics](/docs/data/qc-metrics#sequencing-qc) files for each submitted read group

![Alignment Workflow](/assets/analysis-workflows/ARGO-Alignment.png)

## Sanger WGS Variant Calling

Whole genome sequencing (WGS) aligned CRAM files are processed through the Sanger WGS Variant Calling Workflow as tumour/normal pairs. The ARGO DNA Seq pipeline has adopted the [Sanger Whole Genome Sequencing Analysis Docker Image](https://quay.io/wtsicgp/dockstore-cgpwgs:2.1.0) as the base workflow. For details, please see the latest version of the [ARGO Sanger WGS Variant Calling workflow](https://github.com/icgc-argo/sanger-wgs-variant-calling/releases).

### Inputs

- Normal WGS aligned CRAM and index files
- Tumour WGS aligned CRAM and index files
- [Reference files](ftp://ftp.sanger.ac.uk/pub/cancer/dockstore/human/GRCh38_hla_decoy_ebv)

### Processing

- `Pindel` InDel caller is used for somatic insertion/deletion variant detection.
- `ASCAT` CNV caller is used for somatic copy number variant analysis.
- `CaVEMan` SNV caller is used for somatic single nucleotide variant analysis.
- `BRASS` SV caller is used for somatic structural variation detection.

### Collect QC Metrics

- WGS aligned reads statistics are generated by [Sanger:bam_stats](https://github.com/ICGC-TCGA-PanCancer/PCAP-core/blob/master/bin/bam_stats.pl) script. The files containing normal/tumour aligned reads statistics are further used by Pindel and BRASS callers.
- Cross sample contamination is estimated by [Sanger:verifyBamHomChk](https://github.com/cancerit/cgpNgsQc/blob/develop/bin/verifyBamHomChk.pl) script for both normal and tumour samples.
- Purity and ploidy are estimated by `ASCAT` CNV caller
- Genotypes of CRAM files from the matched normal/tumour pair are compared and the fraction of matched genotypes are produced by [Sanger:compareBamGenotypes](https://github.com/cancerit/cgpNgsQc/blob/develop/bin/compareBamGenotypes.pl) script. It also checks if the inferred genders are matched.

### Outputs

- [Raw SNV Calls](/docs/data/variant-calls#raw-snv-calls) and [VCF Index](/docs/data/variant-calls#vcf-index)
- [Raw InDel Calls](/docs/data/variant-calls#raw-indel-calls) and [VCF Index](/docs/data/variant-calls#vcf-index)
- [Raw CNV Calls](/docs/data/variant-calls#raw-cnv-calls) and [VCF Index](/docs/data/variant-calls#vcf-index)
- [Raw SV Calls](/docs/data/variant-calls#raw-sv-calls) and [VCF Index](/docs/data/variant-calls#vcf-index)
- [SNV Supplement](/docs/data/variant-calls#snv-supplement) files
- [SV Supplement](/docs/data/variant-calls#sv-supplement) files
- [CNV Supplement](/docs/data/variant-calls#cnv-supplement) files
- [InDel Supplement](/docs/data/variant-calls#indel-supplement) files
- QC metrics files
  - [Alignment Metrics](/docs/data/qc-metrics#aligned-reads-qc) for both the Tumour and Normal samples
  - [Ploidy and Tumour Purity](/docs/data/qc-metrics#analysis-qc)
  - [Genotyping Stats](/docs/data/qc-metrics#analysis-qc)
  - [Cross Sample Contamination](/docs/data/qc-metrics#sample-qc)
  - [Runtime Stats](/docs/data/qc-metrics#analysis-qc)

![Sanger WGS Variant Calling Workflow](/assets/analysis-workflows/ARGO-WGS-variant-calling.png)

## Sanger WXS Variant Calling

Whole exome sequencing (WXS) aligned CRAM files are processed through the Sanger WXS Variant Calling Workflow as tumour/normal pairs. The ARGO DNA Seq pipeline has adopted the [Sanger Whole Exome Sequencing Analysis Docker Image](https://quay.io/wtsicgp/dockstore-cgpwxs:3.1.6) as the base workflow. For details, please see the latest version of the [ARGO Sanger WXS Variant Calling workflow](https://github.com/icgc-argo/sanger-wxs-variant-calling/releases).

### Inputs

- Normal WXS aligned CRAM and index files
- Tumour WXS aligned CRAM and index files
- [Reference files](ftp://ftp.sanger.ac.uk/pub/cancer/dockstore/human/GRCh38_hla_decoy_ebv)

### Processing

- `Pindel` InDel caller is used for somatic insertion/deletion variant detection.
- `CaVEMan` SNV caller is used for somatic single nucleotide variant analysis.

### Collect QC Metrics

- WXS aligned reads statistics are generated by [Sanger:bam_stats](https://github.com/ICGC-TCGA-PanCancer/PCAP-core/blob/master/bin/bam_stats.pl) script. The files containing normal/tumour aligned reads statistics are further used by Pindel caller.

### Outputs

- [Raw SNV Calls](/docs/data/variant-calls#raw-snv-calls) and [VCF Index](/docs/data/variant-calls#vcf-index)
- [Raw InDel Calls](/docs/data/variant-calls#raw-indel-calls) and [VCF Index](/docs/data/variant-calls#vcf-index)
- [SNV Supplement](/docs/data/variant-calls#snv-supplement) files
- [InDel Supplement](/docs/data/variant-calls#indel-supplement) files
- QC Metrics
  - [Alignment Metrics](/docs/data/qc-metrics#aligned-reads-qc) for both the Tumour and Normal samples
  - [Runtime Stats](/docs/data/qc-metrics#analysis-qc)

![Sanger WXS Variant Calling Workflow](/assets/analysis-workflows/ARGO-WXS-variant-calling.png)

## GATK Mutect2 Variant Calling

Whole genome/exome sequencing (WGS/WXS) aligned CRAM files are processed through the GATK Mutect2 Variant Calling Workflow as tumour/normal pairs. The ARGO DNA Seq pipeline has adopted the [Genome Analysis Toolkit Docker Image](https://hub.docker.com/r/broadinstitute/gatk) developed at Broad Institute as the base workflow. For details, please see the latest version of the [ARGO GATK Mutect2 Variant Calling workflow](https://github.com/icgc-argo/gatk-mutect2-variant-calling/releases).

### Inputs

- Normal WGS/WXS aligned CRAM and index files
- Tumour WGS/WXS aligned CRAM and index files
- [Reference files](https://console.cloud.google.com/storage/browser/gatk-best-practices)

### Processing

- `BQSR Subworkflow` is an optional data pre-processing step that detects systematic errors made by the sequencing machine when it estimates the accuracy of each base call. While availble as part of the workflow, this is not run as part of the ARGO pipeline. 
- `Mutect2` calls SNV and InDel simultaneously via local de-novo assembly of haplotypes in an active region.
- `Learn Read Orientation` implements the read orientation model, which produces the --orientation-bias-artifact-priors input to the step Filter Variants.
- `Calculate Contamination Subworkflow` emits an estimate of the fraction of reads due to cross-sample contamination for both normal and tumour samples. It also generates an estimate of the allelic copy number segmentation of each tumour sample.
- `Filter Variants` applies filters to the raw output of Mutect2.

### Collect QC Metrics

- Cross sample contamination is estimated by `GATK:CalculateContamination` for both normal and tumour samples
- Variant callable stats file is generated by `GATK:Mutect2`
- Variant filtering stats file is produced by `GATK:FilterMutectCalls`

### Outputs

- [Raw SNV Calls](/docs/data/variant-calls#raw-snv-calls) and [VCF Index](/docs/data/variant-calls#vcf-index)
- [Raw InDel Calls](/docs/data/variant-calls#raw-indel-calls) and [VCF Index](/docs/data/variant-calls#vcf-index)
- QC metrics files
  - [Cross Sample Contamination](/docs/data/qc-metrics#sample-qc)
  - [Variant Filtering Stats](/docs/data/qc-metrics#analysis-qc)
  - [Variant Callable Stats](/docs/data/qc-metrics#analysis-qc)

![GATK Mutect2 Variant Calling workflow](/assets/analysis-workflows/ARGO-Mutect2-variant-calling.png)
