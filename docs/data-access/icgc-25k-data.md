---
id: icgc-25k-data
title: ICGC 25K Data Access
platform_key: DOCS_ICGC_25K
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The ICGC Data Portal was retired in June 2024.

The [Data Portal](https://pubmed.ncbi.nlm.nih.gov/21930502/) served as a hub and reponsitory, a culmination of the collaborative effort between International Cancer Genome Consortium and multiple partners from various cancer projects (including [TCGA](https://www.cancer.gov/ccg/research/genome-sequencing/tcga) and [Sanger Cancer genome project](https://www.sanger.ac.uk/group/cancer-genome-project/)).

The aim was to analyze multiple cancer types and share open access data such as simple somatic mutations, copy number alterations, structural rearrangements, gene expression, microRNAs, DNA methylation and exon junctions.

### Relocated ICGC 25K Data

Although the interactive data portal was shut down, data from the project remains available. The final release data, as well as the PCAWG project data are now hosted by ICGC ARGO. This data is [available to authorized users via an SFTP](#accessing-icgc-25k-release-data).

Files from other contributing projects are all hosted by ICGC's partner repositories. To access this data, you will need to identify which repository hosts the data you are looking for and then request the data through their service. A [mapping file is available](#mapping-icgc-legacy-data-to-external-repositories) to download below which maps ICGC 25K file IDs to their current hosted location.

## Accessing ICGC 25K Release Data

An SFTP server is available to access ICGC Release Data and PCAWG data.

The server hosts three data directories with the following data:

- `/release_28` - This is the Data Portal data Release 28 of the International Cancer Genome Consortium (ICGC).
- `/PCAWG` - Analysis results from the PCAWG study.
- `/Supplemental` - Corrected clinical metadata and RNA-Seq raw read counts for projects LICA-FR and PRAD-UK.

Only users with DACO approval are able to access the SFTP server. If you previously had DACO access for ICGC 25K data you will continue to have permission to access the SFTP server. If you require DACO approval please see the documentation on [applying for DACO access](./daco/applying.md).

### SFTP Connection Details

The SFTP server is located at:

- **Host**: `legacy-icgc-sftp.platform.icgc-argo.org`
- **Port**: `2222`

Authentication to the server is done using username and password:

- **Username**: The email address that was approved for DACO access. This is the account you would use to log into the [ARGO platform](https://platform.icgc-argo.com).
- **Password**: ICGC API Key. This is available on your ARGO Platform [profile page](https://platform.icgc-argo.com/user).

You can connect to this server using any SFTP client of your choice. For a free client you consider [FileZilla](https://filezilla-project.org/download.php?type=client).

## Partner Repositories with ICGC 25K File Data

ICGC file data is hosted across the following repositories.

If you know the specific files from ICGC that you want to access, consult the provided [Mapping File](#mapping-icgc-legacy-data-to-external-repositories) to discover which repositories host that file.

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

Due to data regulation policies, TCGA raw sequencing data submitted to ICGC or used in PCAWG are saved in GDC and controlled under dbGap study [phs000178](https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=phs000178.v11.p8). DACO approval does not include dbGap study [phs000178](https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=phs000178.v11.p8) and will not grant access to said files.

Access can be requested by following instructions in [phs000178](https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=phs000178.v11.p8).
To access data, navigate to [GDC Portal](https://portal.gdc.cancer.gov) and follow the login prompt using eRA commons ID and password.

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
