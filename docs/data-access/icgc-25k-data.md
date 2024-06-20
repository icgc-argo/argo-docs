---
id: icgc-25k-data
title: Legacy ICGC 25K Data
platform_key: DOCS_ICGC_25K
---

## ICGC 25K Portal and Project

The ICGC Data Portal was retired in June 2024.

The [Data Portal](https://pubmed.ncbi.nlm.nih.gov/21930502/) served as a hub and repository, a culmination of the collaborative effort between International Cancer Genome Consortium and multiple partners from various cancer projects (including [TCGA](https://www.cancer.gov/ccg/research/genome-sequencing/tcga) and [Sanger Cancer genome project](https://www.sanger.ac.uk/group/cancer-genome-project/)).

The aim was to analyze multiple cancer types and share open access data such as simple somatic mutations, copy number alterations, structural rearrangements, gene expression, microRNAs, DNA methylation and exon junctions.

The dataset spanned `86` cancer projects, `22` cancer primary sites, `24,289` donors of which `22,330` had molecular data, and `81,782,588` simple somatic mutations.

### Relocated ICGC 25K Data

Although the interactive data portal was shut down, data from the project remains available. The final release data, as well as the PCAWG project data are now available to authorized users through a [SFTP server](#accessing-icgc-25k-release-data) hosted by ICGC ARGO.

Files from other contributing projects are all hosted by ICGC's partner repositories. To access this data, you will need to identify which repository hosts the data you are looking for and then request the data through their service. A [mapping file is available](#mapping-icgc-legacy-data-to-external-repositories) to download below which maps ICGC 25K file IDs to their current hosted location.

## Accessing ICGC 25K Release Data

A SFTP server is available to access ICGC Release Data and PCAWG data.

The server hosts three data directories with the following data:

- `/release_28` - This is the Data Portal data Release 28 (2019-11-26) of the International Cancer Genome Consortium (ICGC).
- `/PCAWG` - Analysis results from the PCAWG study.
- `/Supplemental` - Corrected clinical metadata and RNA-Seq raw read counts (2019-10-16) for projects LICA-FR and PRAD-UK.

The SFTP server is available to authorized, DACO-approved users only. If you previously had DACO access for ICGC 25K data you will continue to have permission to access the SFTP server. If you require DACO approval please see the documentation on [applying for DACO access](./daco/applying.md).

### SFTP Connection Details

The SFTP server is located at:

- **Host**: `icgc-legacy-sftp.platform.icgc-argo.org`
- **Port**: `2222`

Authentication to the server is done using username and password:

- **Username**: The email address that was approved for DACO access. This is the account you would use to log into the [ARGO platform](https://platform.icgc-argo.org).
- **Password**: ICGC API Key. This is available on your ARGO Platform [profile page](https://platform.icgc-argo.org/user).

You can connect to this server using any SFTP client of your choice.

## Partner Repositories with ICGC 25K File Data

ICGC 25K file data is hosted across the following repositories.

If you know the specific file IDs to access, the provided [Mapping File](#mapping-icgc-legacy-data-to-external-repositories) links those to their alternate locations.

### EGA

ICGC 25k DACO approval includes access to raw sequences submitted to ICGC and reprocessed PCAWG files hosted on EGA. Available datasets are listed under the data access committee [EGAC00001000010](https://ega-archive.org/dacs/EGAC00001000010).

Upon [DACO](https://docs.icgc-argo.org/docs/data-access/daco/applying) approval, the institutional email (the same email used in your DACO application, not the affiliated Gmail account) can be used to log in/sign up at [EGA-Archive](https://ega-archive.org).

If the email has never been used to access EGA, you will need to create an local EGA account; please follow the EGA password reset procedure to do so.

Access to EGA may take up to 48 hours post DACO approval.

### TCGA

Due to data regulation policies, raw sequencing data submitted to ICGC and affiliated data from the PCAWG study are controlled under dbGap study [phs000178](https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=phs000178.v11.p8).

ICGC 25k DACO approval does not include dbGap study [phs000178](https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=phs000178.v11.p8) and will not grant access to said files.

Access can be requested by following instructions at [phs000178](https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=phs000178.v11.p8).

To access data, navigate to PDC/[ICGC Bionimbus](https://icgc.bionimbus.org/files) for PCAWG affiliated data or GDC/[GDC Portal](https://portal.gdc.cancer.gov) for raw sequencing data. Both portal will provide a login prompt using eRA commons ID and password.

### Mapping ICGC Legacy Data to External Repositories

Provided below is a download link for our legacy data mapping file. This will download a TSV file which contains a mapping between ICGC File IDs and their current hosted location(s), relevant ICGC mapping IDs (object, donor, sample, specimen), and IDs for affiliated repositories.

**Download**: [**icgc25k-file-mapping.tsv**](https://icgc25k.s3.ca-central-1.amazonaws.com/icgc25k-legacy-data-locations.tsv) (54MB)

To find files listed in this TSV, check the `location` column:

- `SFTP` - files are saved at listed `SFTP_location` or within the listed file
- `EGA` - file can be found by following the `ega_dataset_id`, `ega_analysis_id`, `ega_file_id`, or `ega_run_id`
- `PDC` - file can be found using the `PDC_ID`
- `GDC` - file can be found using `GDC_ID`

## Data Use and Publication Policy

Please see ICGC ARGO's [publication policy](https://www.icgc-argo.org/page/77/e3-publication-policy) and [data use](https://www.icgc-argo.org/page/132/data-access-and-data-use-policies-and-guidelines) policies.

## Questions and Concerns

If you have any further questions or require additional information please contact the [helpdesk](https://platform.icgc-argo.org/contact).
