---
id: analysis-overview
title: Analysis Pipelines Overview
sidebar_label: Overview
---

Molecular data submitted to the ARGO Data Platform will undergo molecular analysis through a unified pipeline. Consistent pipeline analysis across different samples ensures that data can be considered functionally equivalent across different data sets, including all ARGO programs as well as any other initiatives that have adopted the ARGO analysis pipelines, increasing the research power of the dataset provided by the ARGO Data Platform.

The ARGO Data Platform will accept a wide range of datatypes, including:

- Genomic data from both Whole Exome Sequencing (WXS) and Whole Genome Sequencing (WGS)
- DNA Methylation data
- Transcriptomic data
- Proteomic data
- Slide images

Pipelines, and the individual analysis workflows that they are constructed from, have been developed by the DCC Bioinformatics team based on established, best community practices.

All ARGO analysis workflows are written in [Nextflow](https://www.nextflow.io/). Nextflow is developed by the Comparative Bioinformatics group at the Barcelona Centre for Genomic Regulation (CRG).

All ARGO workflows are published under an GNU AGPL v3 open-source license and are packaged for community usage.
