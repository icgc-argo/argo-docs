---
id: xml-variant-ingestion
title: XML Variant Ingestion
sidebar_label: XML Variant Ingestion
platform_key: DOCS_DNA_PIPELINE
---

The ARGO Data Platform supports the ingestion of variant calling data submitted in XML format (based on the GRCh37/hg19 genome reference). These XML files are processed through a standardized workflow to convert them into VCF format, followed by a liftover to the GRCh38 reference genome. For details, please see the latest version of the [ARGO xml_variant_ingestion workflow](https://github.com/icgc-argo-workflows/xml_variant_ingestion/releases).

## Inputs

- Submitted XML file(s): Containing variant calls based on the GRCh37 (hg19) genome reference.
- Metadata mapping file: Used to map identifiers and provide additional sequencing and variant calling context.
- Human reference genome:
  - [GRCh38](https://hgdownload.soe.ucsc.edu/goldenPath/hg38/bigZips/) used as target of liftover
  - [GRCh37](https://hgdownload.soe.ucsc.edu/goldenPath/hg19/bigZips/) used as reference to call variants in the XML file
- Genome liftover [chain file](https://hgdownload.soe.ucsc.edu/goldenPath/hg19/liftOver/): Required for coordinate transformation from GRCh37 to GRCh38.

## Processing

1. XML to VCF Conversion:

   - Variant records are parsed from XML and converted into corresponding VCF records.
   - Variants are separated by type:
     - Short Variants: SNVs and InDels
     - Copy Number Alterations (CNVs)
     - Structural Variants / Rearrangements (SVs)

2. Reference Genome Liftover:
   - The converted VCF files are lifted from GRCh37 to GRCh38 using [Picard:liftovervcf](https://gatk.broadinstitute.org/hc/en-us/articles/27007978536219-LiftoverVcf-Picard).

## Outputs

- [Raw SNV Calls](https://docs.icgc-argo.org/docs/data/variant-calls#raw-snv-calls) and [VCF Index](https://docs.icgc-argo.org/docs/data/variant-calls#vcf-index)
- [Raw Indel Calls](https://docs.icgc-argo.org/docs/data/variant-calls#raw-indel-calls) and [VCF Index](https://docs.icgc-argo.org/docs/data/variant-calls#vcf-index)
- [Raw SV Calls](https://docs.icgc-argo.org/docs/data/variant-calls#raw-sv-calls) and [VCF Index](https://docs.icgc-argo.org/docs/data/variant-calls#vcf-index)
- [Raw CNV Calls](https://docs.icgc-argo.org/docs/data/variant-calls#raw-cnv-calls) and [VCF Index](https://docs.icgc-argo.org/docs/data/variant-calls#vcf-index)

## Workflow Diagram

![XML-2-VCF](/assets/analysis-workflows/ARGO-xml2vcf.png)
