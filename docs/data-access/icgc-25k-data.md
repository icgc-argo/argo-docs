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

ICGC Release Data contains both open and controlled access data.

All [open access release data](#open-release-data---object-bucket-details) is stored on a publicly available Object Storage Bucket and is available to everyone.

The [controlled access release data](#controlled-release-data---sftp-connection-details) is hosted on an SFTP server, and is only available to authorized DACO-approved users. If you previously had DACO access for ICGC 25K data you will continue to have permission to access the SFTP server. If you require DACO approval please see the documentation on [applying for DACO access](./daco/applying.md).

Both locations contain directories with the following data:

- `/release_28` - This is the Data Portal data Release 28 (2019-11-26) of the International Cancer Genome Consortium (ICGC).
- `/PCAWG` - Analysis results from the PCAWG study.
- `/Supplemental` - Corrected clinical metadata and RNA-Seq raw read counts (2019-10-16) for projects LICA-FR and PRAD-UK.

### Controlled Release Data - SFTP Connection Details

The SFTP server is located at:

- **Host**: `icgc-legacy-sftp.platform.icgc-argo.org`
- **Port**: `2222`

Authentication to the server is done using username and password:

- **Username**: The email address that was approved for DACO access. This is the account you would use to log into the [ARGO platform](https://platform.icgc-argo.org).
- **Password**: ICGC API Key. This is available on your ARGO Platform [profile page](https://platform.icgc-argo.org/user).

You can connect to this server using any SFTP client of your choice.

### Open Release Data - Object Bucket Details

Open access release data is hosted on a publicly available Object Storage Bucket. While not hosted on Amazon AWS, it uses the AWS S3 interface and is therefore accessible using any S3 compatible object storage client.

The bucket is reachable at:

- **Host**: `https://object.genomeinformatics.org`
- **Bucket Name**: `icgc25k-open`

No additional authentication is required.

#### Using the AWS CLI to access the open data bucket

Instructions for installing the AWS CLI are [found here](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html).

This data is not hosted by AWS, so you will need to specify an `--endpoint-url` argument when using this tool so that it knows where to find this bucket. Below are example commands to accomplish some common use cases.

To navigate and explore the data:

```
aws s3 ls s3://icgc25k-open --endpoint-url https://object.genomeinformatics.org --no-sign-request
```

To download a file or recursively download a directory:

```
aws s3 cp s3://icgc25k-open/PCAWG/consensus_snv_indel/README.md <local-download-directory> --endpoint-url https://object.genomeinformatics.org --no-sign-request
aws s3 cp s3://icgc25k-open/PCAWG/consensus_snv_indel <local-download-directory> --recursive --endpoint-url https://object.genomeinformatics.org --no-sign-request
```

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

## Frequently asked questions

### 1. Using CLI SFTP, I cannot find anything inside the **Example folder**

```
sftp> ls PCAWG/*
PCAWG/APOBEC_mutagenesis                     PCAWG/Hartwig                                PCAWG/README.md                              PCAWG/benchmarking_data                      PCAWG/broad_calls                            PCAWG/cell_lines                             PCAWG/clinical_and_histology                 PCAWG/consensus_cnv
PCAWG/consensus_snv_indel                    PCAWG/consensus_sv                           PCAWG/data_releases                          PCAWG/dkfz_embl_calls                        PCAWG/donors_and_biospecimens                PCAWG/driver_mutations                       PCAWG/drivers                                PCAWG/evolution_and_heterogeneity
PCAWG/germline_variations                    PCAWG/hla_and_neoantigen                     PCAWG/minibams                               PCAWG/msi                                    PCAWG/muse_calls                             PCAWG/mutational_signatures                  PCAWG/networks                               PCAWG/pathogen_analysis
PCAWG/pcawg_dkfz_caller                      PCAWG/pilot50-mosaic                         PCAWG/pilot50_calls                          PCAWG/quality_control_info                   PCAWG/reference_data                         PCAWG/retrotransposition                     PCAWG/rnaseq_aligned_bams                    PCAWG/sanger_calls
PCAWG/sequencing_metadata                    PCAWG/smufin_indel_calls                     PCAWG/subclonal_reconstruction               PCAWG/terminology_and_standard_colours       PCAWG/thesaurus_snv                          PCAWG/transcriptome                          PCAWG/unaligned_bams                         PCAWG/validation_bams
PCAWG/wgs_aligned_bams
```

### 2. Connecting through CLI SFTP gives the following error `no matching host key type found. Their offer: ssh-rsa`

This will depends on system but ensure your `~/.ssh/.config` has the following content:

```
HostKeyAlgorithms ssh-rsa
PubkeyAcceptedKeyTypes ssh-rsa
```

Or add `-o HostKeyAlgorithms=+ssh-rsa` to your SFTP command, E.g:

```
sftp -P 2222 -o HostKeyAlgorithms=+ssh-rsa 'example@gmail.com'@icgc-legacy-sftp.platform.icgc-argo.org
```
