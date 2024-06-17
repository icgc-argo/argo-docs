---
id: icgc-25k-data
title: ICGC 25K Data Access
platform_key: DOCS_ICGC_25K
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The ICGC Data Portal was retired in June 2024.

## Data Portal
The [Data portal](https://pubmed.ncbi.nlm.nih.gov/21930502/) served as a hub and reponsitory, a culmination of the collaborative effort between International Cancer Genome Consortium and multiple partners from various cancer projects (including [TCGA](https://www.cancer.gov/ccg/research/genome-sequencing/tcga) and [Sanger Cancer genome project](https://www.sanger.ac.uk/group/cancer-genome-project/)).

The aim was to analyze multiple cancer types and share open access data such as simple somatic mutations, copy number alterations, structural rearrangements, gene expression, microRNAs, DNA methylation and exon junctions.

As of June 15 2024, efforts were refocused to [ICGC-ARGO](https://www.icgc-argo.org/) and the ICGC Data Portal was retired.

The following documentation outlines what data remains available, where to find the data and how to access it.
 
- Description of data that remains available
  - ICGC DCC Data Release 28 + Supplemental and PCAWG data
  - Raw sequencing data saved at EGA, PDC and GDC.

## Accessing ICGC 25K Release Data

- DACO Requirement, how to apply for DACO access
  - To apply for access, please visit [ICGC's DACO portal](https://daco.icgc-argo.org) and follow [the procedures outlined](https://docs.icgc-argo.org/docs/data-access/daco/applying)
- How to get API Key for SFTP Access
- Common clients to interact with the SFTP server

## Partner Repositories with ICGC 25K File Data


### EGA

Raw sequences submitted to ICGC or reprocessed apart of PCAWG are hosted across multiple EGA datasets managed by the data access committee [EGAC00001000010](https://ega-archive.org/dacs/EGAC00001000010).

Upon DACO approval, the institutional email (the same email used in your DACO application, not the affiliated Gmail account) can be used to log in/sign up at [EGA-Archive](https://ega-archive.org).

If the email has never been used to access EGA, please follow the password reset procedure.

Access to EGA may take up to 48 hours post DACO approval.

### PDC
Due to data regulation policies, TCGA affiliated data from the PCAWG study are saved in PDC and controlled under dbGap study [phs000178](https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=phs000178.v11.p8).

DACO approval does not include dbGap study [phs000178](https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=phs000178.v11.p8) and will not grant access to said files.

Access can be requested by following instructions in [phs000178](https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=phs000178.v11.p8).

To access data, navigate to [ICGC Bionimbus](https://icgc.bionimbus.org/files) and follow the login prompt using eRA commons ID and password.

### GDC
Due to data regulation policies, TCGA raw sequencing data submitted to ICGC or used in PCAWG are saved in GDC and controlled under dbGap study [phs000178](https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=phs000178.v11.p8).
DACO approval does not include dbGap study [phs000178](https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=phs000178.v11.p8) and will not grant access to said files.
Access can be requested by following instructions in [phs000178](https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=phs000178.v11.p8).
To access data, navigate to [GDC Portal](https://portal.gdc.cancer.gov) and follow the login prompt using eRA commons ID and password.

### Mapping of ICGC Legacy Data to Repositories

**Mapping.tsv** contains a list of files submitted to ICGC and their location following portal retirement, relevant ICGC mapping IDs (object, donor, sample, specimen), and IDs for affiliated repos.

Note this does not contain all files related to ICGC DCC Data Release 28 + Supplemental and PCAWG found on the SFTP.

 To retrieve files listed in **Mapping.tsv**, follow the `location` column
  - `SFTP` - files are saved at listed `SFTP_location` or within the listed file
  - `EGA` - file can be found by following the `ega_dataset_id`, `ega_analysis_id`, `ega_file_id`, or  `ega_run_id`
  - `PDC` - file can be found using the `PDC_ID`
  - `GDC` - file can be found using `GDC_ID`


## Data use and publication policy
 - Please see ICGC ARGO's [publication policy](https://www.icgc-argo.org/page/77/e3-publication-policy) and [data use](https://www.icgc-argo.org/page/132/data-access-and-data-use-policies-and-guidelines) policies.

## Questions and Concerns
 - Please contact us at ICGC ARGO's [helpdesk](https://platform.icgc-argo.org/contact).
