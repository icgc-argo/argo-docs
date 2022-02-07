---
id: software-releases
title: Software Releases
---

An ARGO software release is a set of new features and bug fixes for the ARGO Data Platform. Software releases happen approximately every month.

<!---
## Software Release 2.0

**Release Date:**

### Bug Fixes

None to report.

### Known Issues

None to report.
------>

## February 7, 2022: File Entity Page and Open Access Variant Filtering​

Data Platform - 1.105.3 - API 3.28.2

#### New Features

- A new **File Entity** page has been released that displays the metadata about a file. This page is accessible from the [File Repository](https://platform.icgc-argo.org/repository) by clicking on a File ID. This page includes:
  - A file summary with a link to all files for the associated program.
  - Data analysis Information, that include helpful links to documentation about the associated ARGO DNA pipeline workflow and version.
  - Some metadata about the associated donor, samples, and specimens for the file.
  - The ability to download a manifest for the file.
- The **Program Dashboard** has been updated to prepare for the [Open Access Variant Filtering workflow](/docs/analysis-workflows/dna-open-access-filtering):
  - Once a program has raw reads that are processing in the DNA pipeline, the status of the Open Access VF workflow will be reported on the donor summary table and in the molecular chart (if that donor meets the tumour/normal pair requirements).
- **File Repository** improvements have been made, which include:
  - Adding a more user friendly File ID column to the table, that links to the file entity page.
  - Improving the file metadata that displays in the search facet result suggestions.
  - Making the graphs interactive to filter the file table.
  - Adding a loading indicator to the download action for user feedback.
  - Adding a timestamp to the end of the manifest file name, in order to make downloads unique on a user's computer.

#### Bug Fixes

- Some **Program Dashboard** bugs have been fixed allowing the correct DNA pipeline data to be reported on the molecular summary chart and the donor summary table.

## September 13, 2021: Program Dashboard Updates

Data Platform - v1.101.3 API v3.26.1

#### New Features

- A new download API has been published, resulting in some changes in [How to Download Data](/docs/data-access/data-download).
- Pre-release data can now be seen on the [Program Dashboard and File Repository](/docs/submission/submitted-data#pre-release-data). Pre-release data is only visible if you are logged in as a Program Member.

## September 02, 2021: Program Dashboard Updates

Data Platform - v1.101.0 API v3.24.6

#### New Features

- To make sorting donor data easier, table filters have been added to the Donor Data Summary table on the [Program Dashboard](/docs/submission/submitted-data).

## April 27, 2021: Clinical Submission and Program Dashboard Updates

Data Platform - v1.93.0 API v 3.16.0

#### New Features

- A New version of the [Program Dashboard](/docs/submission/submitted-data) has been released to help report on data submission and molecular data processing progress has been released. Updates to this section includes:
  - Revised program statistics bar
  - Donor clinical completeness tracking chart showing a programs progress over times towards submitting complete clinical data for all committed program donors.
  - Donor molecular summary chart showing molecular processing progress over times, working towards having completeness for all committed program donors.
  - Updated column in the Donor Summary table showing real-time tracking of the progression of a specific donor through the [DNA-Seq Analysis Pipeline](/docs/analysis-workflows/dna-alignment).
- Two new clinical data entities can be submitted through the Clinical Submission
  - Family History: A donor's familial relationships and familial cancer history.
  - Immunotherapy: Treatment regimen details of immunotherapy drugs.

#### Bug Fixes

- The docs site dictionary viewer would occasionally crash if the page was left open or scrolled too much. This has been resolved.

## Initial Software Release

Data Platform v1.55.0 - API v3.2.0

**Release Date:** June 19, 2020

#### New Features

This is the first release of the ARGO Data Platform. Major features include:

- **Clinical Data Submission**: The ARGO Data Platform is open for data submission for registered programs. Registered programs can begin [submitting clinical data](/docs/submission/submitting-clinical-data) through the Program Services area. Programs that have not registered should [contact the DCC](https://platform.icgc-argo.org/contact).
- **Program Management**: For submitting programs, access to program submission and data can be managed from the Program Services area. This includes the ability for program administrators to review a program profile, as well as add and remove program members.
- **File Repository**: Users can browse the complete ARGO data set using the [File Repository](https://platform.icgc-argo.org/repository). Files of interest can be [downloaded](/docs/data-access/data-download), provided that access to controlled data has been confirmed. To access controlled data, please see the [DACO application process here](/docs/data-access/data-access), or [apply for DACO approval here](https://icgc.org/daco).
