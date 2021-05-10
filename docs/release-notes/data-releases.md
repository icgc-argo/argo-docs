---
id: data-releases
title: Data Releases
platform_key: DOCS_DATA_RELEASES
---

An ARGO data release is a curated data set of clinical and molecular data submitted to the ARGO Data Platform. Data releases happen approximately four times a year and are cumulative in nature. Released data can be browsed using the [File Repository](https://platform.icgc-argo.org/repository) and [downloaded](/docs/data-access/data-download) using a client tool, provided that access to controlled data has been granted. To access controlled data, please see the [DACO application process here](/docs/data-access/data-access).

## Data Release 3.0

**Release Date:** May 10, 2021

### New Updates
We are happy to announce a release of a **new** DNA-Seq Pipeline Variant calling data type: [GATK Mutect2](/docs/analysis-workflows/dna-pipeline#gatk-mutect2-variant-calling), available now for both WXS and WGS samples.

This release includes:

- PACA-CA: 1 new donor with aligned reads, Sanger and Mutect2 variant calls with.  Additionally, 135 previously released donors now have GATK Mutect2 variant calls.  
- OCCAMS-GB: 130 new donors with aligned WGS reads, Sanger and Mutect2 variant calls. 94 previously released donors additionally have Mutect2 variant calls. 
- PTC-SA: 99 new donors with aligned WXS reads, Sanger and Mutect2 variant calls.  Additionally, 140 previously released donors now have Mutect2 variant calls. 
- LUCA-KR: 130 new donors with aligned reads, Sanger and Mutect2 variant calls.  Additionally, 29 previously released donors now have Mutect2 variant calls. 

### Bug Fixes
- PACA-CA/DO35226 was removed as only a Tumour Sample has completed workflow processing. We are working on resolving processing issues for this donor.  

## Data Release 2.0

**Release Date:** October 23, 2020

### New Updates

Data Release 2.0 includes the first release of whole exome sequencing (WXS) data from papillary thyroid cancer [(PTC-SA)](https://www.icgc-argo.org/page/98/ptcp) and the first release of whole genome sequencing (WGS) data from lung cancer [(LUKA-KR)](https://www.icgc-argo.org/page/91/pgcklc). Both programs were members of the original ICGC-25K data portal. While clinical data will soon be submitted by the programs, a selection of their molecular data has been reprocessed against the latest GRCh38 Human Reference Genome using the ARGO DNA Seq Pipeline.

This release includes:

- PACA-CA: 52 new donors with WGS data totaling 133 donors with WGS reads and 121 donors with variant calls
- PACA-CA: 12 new donors with aligned WXS reads
- LUCA-KR: 29 donors with aligned WGS reads, and 29 donors with variant calls.
- PTC-SA: 142 donors with aligned WXS reads, and 140 donors with variant calls.

In addition to these genomic files, the first release of pipeline Quality Control metrics is also included. For a breakdown of the provided QC metrics, please review the [qc metrics file type](/docs/data/qc-metrics) documentation. For an explanation of qc metrics as they are generated through the pipeline, please review the [DNA-Seq Analysis Pipeline](/docs/analysis-workflows/dna-pipeline) documentation.

### Bug Fixes

- Three OCCAMS-GB donors had alignment and variant data removed from release due to an issue in file naming in the analysis workflow. The data is being reprocessed and will be re-released in the next release.

### Known Issues

None to report.

## Data Release 1.0

**Release Date:** June 19, 2020

### New Updates

ICGC ARGO is excited to announce its initial data release including whole genome sequencing (WGS) data from pancreatic cancer [(PACA-CA)](https://www.icgc-argo.org/page/96/panchope) and esophageal cancer [(OCCAMS-GB)](https://www.icgc-argo.org/page/112/occams). Both programs were members of the original ICGC-25K data portal. While clinical data will soon be submitted by the programs, a selection of their molecular data has been reprocessed against the latest GRCh38 Human Reference Genome using the [ARGO DNA Seq Pipeline](/docs/analysis-workflows/dna-pipeline). The resulting somatic mutation calls include single nucleotide variations (SNVs), insertion-deletion (indels), copy number variations (CNVs) and structural variations (SVs). This release includes:

- PACA-CA: 81 donors with aligned WGS reads, and 62 donors with variant calls.
- OCCAMS-GB: 96 donors with aligned WGS reads, and 95 donors with variant calls.
