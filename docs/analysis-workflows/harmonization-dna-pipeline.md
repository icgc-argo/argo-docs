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






## Open Access Variant Filtering 

The ARGO Data Platform filters controlled data to allow for an open-access of tier to be access anonymously. For details, please see the latest version of the [Open Access Variant Filtering](https://github.com/icgc-argo-workflows/open-access-variant-filtering/releases).

### Inputs

- [Raw SNV](https://docs.icgc-argo.org/docs/data/variant-calls#raw-snv-calls) or [Raw InDel](/docs/data/variant-calls#raw-indel-calls) variant calling VCF and index files.
- [Reference files](/docs/analysis-workflows/dna-pipeline#oppen-access-regions): Open-access regions defined in BED format.


### Preprocessing

- ss

### Processing

- Parse the song metadata analysis and get back the analysis tool information
- Set the params to filters, include, exclude based on analysis tool
- Use `bcftools` view to only retrieve the variants located only in the defined [open access regions](/docs/analysis-workflows/dna-pipeline#oppen-access-regions)

### Outputs
- Open access [Raw SNV Calls](/docs/data/variant-calls#raw-snv-calls) and [VCF Index](/docs/data/variant-calls#vcf-index)
- Open access [Raw InDel Calls](/docs/data/variant-calls#raw-indel-calls) and [VCF Index](/docs/data/variant-calls#vcf-index)

### Open Access Regions 