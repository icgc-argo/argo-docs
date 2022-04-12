---
id: dna-open-access-filtering
title: Open Access Variant Filtering
sidebar_label: Open Access Variant Filtering
platform_key: DOCS_DNA_PIPELINE
---

The SNV/InDel variant calls from both Sanger & MuTect2 calling results on the ARGO Data Platform are further processed through the Open Access Variant Filtering Workflow to create VCF files that can be downloaded anonymously from the File Repository. For details about the process workflow, please see the latest version of the [ARGO Open Access Variant Filtering Workflow](https://github.com/icgc-argo-workflows/open-access-variant-filtering/releases).

## Background

In cancer research it is not thought to be possible to re-identify patients from somatic variants data, as these mutations are found in the tumour not in an individual's germline genome. That means somatic variants do not provide identifying information theoretically and barrier-free release of somatic variants data can occur without compromising patient privacy.

However, germline variants can be mistakenly identified as somatic variants, these are referred to as "germline leaks" because of:

- imperfect variant calling tools,
- sequencing errors,
- low and uneven reads coverage.

A recent study by [Sendorek, D.H. et al. 2018](https://doi.org/10.1186/s12859-018-2046-0) indicates that both germline leaks in somatic SNVs, and the overlap rate between somatic SNVs with the germline database, are relatively low. Another study by [Meyerson, W. et al.](https://doi.org/10.1186/s12859-020-3508-8) also infers that among the shared variants between somatic SNVs with the germline database, only 4% are potential germline leaks, while the other variants mostly represent true biological variants that arose independently in both germline and somatic settings.

It was reported by [Elena Rojano, et al.](https://doi.org/10.1093/bib/bby039) that more than 88% of disease-associated variants are in non-coding regions especially in regulatory regions, e.g:

- cis and trans-regulatory elements such as promoters, enhancers,
- transcribed non-coding regions with regulatory roles, such as miRNAs and lncRNAs.

We want to make as many somatic variants as possible publicly accessible to the research community, with minimum risk of potential germline leaks. Therefore, after evaluating the potential risks of possible germline leakage, we have taken the various genomic elements according to the latest version of GENCODE annotations (e.g., v38), and have defined the open access regions to include the genomic regions of highest interest. For details about the definition of open access genomic regions, please refer to [Open-access Regions](https://github.com/icgc-argo/open-access-regions).

**Note**: In order to minimize the risk of germline leaks, all the variants which are not in open access genomic regions are filtered out. If omission of true-positive somatic variants is a concern, we strongly recommend you to apply for the [DACO access to controlled data](/docs/data-access/daco/applying).

## Inputs

- SNV/InDel variant calling VCF and index files
- Reference file: [Open-access regions defined in BED format](https://github.com/icgc-argo/open-access-regions/tree/main/data/hg38/bed/gencode.v38)

## Processing

- Parse the Song metadata analysis and retrieve the analysis tool information
- Set the params such as `apply_filters`, `include`, `exclude` based on the analysis tool
- Use `bcftools view` to select the variants only located in open access regions

## Outputs

- [Filtered SNV Calls](/docs/data/variant-calls#filtered-snv-calls) or [Filtered InDel Calls](/docs/data/variant-calls#filtered-indel-calls)
- [VCF Index](/docs/data/variant-calls#vcf-index)

## Workflow Diagram

![Open Access Filtering Workflow](/assets/analysis-workflows/ARGO-open-access-filtering.png)
