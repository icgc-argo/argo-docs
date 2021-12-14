---
id: submission-overview
title: Overview
platform_key: DOCS_SUBMISSION_OVERVIEW
---

## ARGO Data Initiative

The **International Cancer Genome Consortium Accelerating Research in Genomic Oncology (ICGC ARGO)** initiative brings together international researchers to analyze genomic and transcriptomic changes along with high-quality clinical data from over 100,000 patients.

The Ontario Institute for Cancer Research (OICR) operates as the **Data Coordination Centre (DCC)** to develop the ARGO Data Platform which manages the submission, processing, analysis, and dissemination of high-quality clinical and molecular data.

Participating programs submit clinical data through the **[ARGO Data Platform](https://platform.icgc-argo.org/)**, which is also the destination for public data display and analysis.

Molecular data will be submitted to your local **Regional Data Processing Centre (RDPC)**. RDPCs are responsible for processing your program's molecular data according to the [Analysis Pipeline](/docs/analysis-workflows/analysis-overview). If you are unsure which RDPC you should submit to, please [contact the DCC](https://platform.icgc-argo.org/contact).

## Data Dictionary

To support the gathering of high-quality data, a clinical data dictionary defines the ARGO data model as well as some data validations that are performed at the time of submission. Clinical data is defined in logical groupings, which will be submitted as TSV files in the ARGO Program Services section.

Explore the details of the ARGO clinical dataset in the **[ARGO Data Dictionary Viewer](/dictionary).**

## Data Submission and Release Process

The ARGO Data Platform has been optimized to ensure that clinical and molecular data upload is intuitive and efficient for data submitters. ARGO data submission and release happens in 4 major steps:

1. **Register Molecular Samples:** [Registering samples](/docs/submission/registering-samples) within the Program Services section in the ARGO Data Platform initializes the ARGO primary identifiers that will be assigned to submitted data entities. Registering samples and associated specimen and donor identifiers upfront maintains data integrity across the data submission and processing pipelines.
1. **Submit Donor Clinical and Molecular Data:** Clinical Data Submitters can use the Program Services section in the ARGO Data Platform to submit clinical data. [Submitting clinical data](/docs/submission/submitting-clinical-data) is easy and intuitive, facilitated by a guided clinical submission interface. In parallel, Molecular Data Submitters can begin submitting molecular data. [Submitting molecular data](/docs/submission/submitting-molecular-data), using the Song and Score clients, is fast and secure.
1. **Molecular Data Processing:** Once raw molecular data has been submitted, [analytic workflows](/docs/analysis-workflows/analysis-overview) will be automatically kicked off for uniform analysis of all donor samples.
1. **Data QC and Release:** Once **both** core clinical data and raw molecular data have been submitted, and analysis is complete for a donor, the donor data will be released to the program for quality control and the [Data Release](/docs/release-notes/data-releases) process will begin. After an embargo period, donor data will be publically available on the ARGO Data Platform.

![ARGO Submission Process](/assets/submission/ARGO-submission-process.svg)

Submitted program data will be available for review using a [Program Dashboard](/docs/submission/submitted-data), with statistics about the program's submission status, released data, and molecular data analysis progress.
