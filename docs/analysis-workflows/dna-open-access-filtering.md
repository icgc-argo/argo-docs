---
id: dna-open-access-filtering
title: Open Access Variant Filtering
sidebar_label: Open Access Variant Filtering
platform_key: DOCS_DNA_PIPELINE
---

The SNV/InDel variant calls from both Sanger & MuTect2 calling results on ARGO portal are further processed through the Open Access Variant Filtering Workflow to create VCF files that can be downloaded by ordinary users from the open-access tier. For details about the process workflow, please see the latest version of the [ARGO Open Access Variant Filtering Workflow](https://github.com/icgc-argo-workflows/open-access-variant-filtering/releases)

## Background

Although in cancer research it is not thought to be possible to re-identify patients from somatic variants data as these mutations are found in the tumour not in an individual's germline genome. That means theoretically somatic variants do not provide identifying information and barrier-free release of somatic mutational data can occur without compromising patient privacy.

However germline variants can be mistakenly identified as somatic ones, these are so called "gerline leaks" because:

- the imperfect variant calling tools
- sequencing errors
- low and uneven reads coverage.

Recent study by [Sendorek, D.H. et al. 2018](https://doi.org/10.1186/s12859-018-2046-0) have indicated that both germline leaks in somatic SNVs and the overlap rate between somatic SNVs with germline database are relatively low. Another study by [Meyerson, W. et al.](https://doi.org/10.1186/s12859-020-3508-8) also inferred that among the shared variants between somatic SNVs with germline database, only 4% are potential germline leaks, while the other variants mostly represent true biological variants that just arose independently in the germline and somatic settings.

It was reported by study [Elena Rojano, et al.](https://doi.org/10.1093/bib/bby039) that more than 88% of disease-associated variants are in non-coding regions especially in regulatory regions:

- cis- and trans-regulatory elements such as promoters, enhancers
- transcribed non-coding regions with regulatory roles, such as miRNAs and lncRNAs

In order to make as many somatic variants as possible to be public accessible to the research community by large with minimum risk of potential germline leaks, we have created the various genomic elements according to latest version of GENCODE annotations (e.g., v38) and defined the open access regions including the most interested regions accordingly. For details about the definition of open access genomic regions, please refer to [Open-access Regions](https://github.com/icgc-argo/open-access-regions).

## Inputs

- SNV/InDel variant calling VCF and index files
- Reference file: [Open-access regions defined in BED format](<(https://github.com/icgc-argo/open-access-regions/tree/main/data/hg38/bed/gencode.v38)>)

## Processing

- Parse the song metadata analysis and get back the analysis tool information
- Set the params to filters, include, exclude based on analysis tool
- Use `bcftools view` to retrieve the variants locating only in open access regions

## Outputs

- Filtered SNV/InDel variant calling VCF and index files

## Workflow Diagram

![Open Access Filtering Workflow]
