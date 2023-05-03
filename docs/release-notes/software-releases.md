---
id: software-releases
title: Software Releases
---

An ARGO software release is a set of new features and bug fixes for the ARGO Data Platform. The release notes here describe the major releases. We also release minor fixes and enhancements approximately once a month.

<!---
## Software Release 2.0

**Release Date:**

### Bug Fixes

None to report.

### Known Issues

None to report.
------>

## May 3, 2023: Submitted Data Page

Data Platform - 1.122.5 - API 3.39.0

#### New Features

- The **Submitted Data** page is where you can review, query, and download clinical data submitted by your program. Submitted clinical data will be accessible from this page following sample registration and clinical data submission sign-off. Only program administrators, data submitters, and collaborators can access the program's submitted data page.

  - The submitted data dashboard is accessed by clicking the "submitted data" tab on the left-hand menu. The dashboard has two main sections, the donor filter pane and the clinical data table pane.

- Tooltips are available on the Dashboard - Completed Core Clinical Data and Molecular Data Summary charts. The tooltips will help users quickly understand the data they are viewing on the charts. By hovering over a specific data point, users can see the number of completed core clinical donors on the Completed Core Clinical Data chart, and the numbers of donors involved in the DNA and RNA Sequencing pipelines.

## January 30, 2023: RNA Seq Data View

Data Platform - 1.119.1 - API 3.38.1

#### New Features

A new RNA-SEQ table has been released in the Dashboard. This table is accessible from the Program Dashboard by clicking on the RNA-SEQ tab. The table includes:

- A Registered Samples column that displays the number of registered tumour and normal RNA samples.
- A Raw Reads column that displays the number of submitted tumour and normal RNA raw reads.
- An Alignment column that displays the number of RNA SEQ Alignment workflow categorized by workflow status.
- An Alerts column that signals any errors in the submitted clinical data that need to be updated.
- A Last Updated column that displays the most recent date that the RNA data is updated.

New filters have been released in the Dashboard - DNA SEQ table. Users can now filter DNA Registered Samples and Raw Reads by more granular criteria.

#### Bug Fixes

- The UI global loader has been improved so that it works consistently on all pages.
- Some Program Dashboard bugs have been fixed allowing the correct DNA pipeline data to be reported on the molecular summary chart and the donor summary table.

## Aug 17, 2022

Data Platform - 1.110.1 - API 3.34.1

#### New Features

- Due to the complex nature of Surgery clinical table validation rules, we have updated and enhanced clinical validation error messages in Surgery tables to further assist data submission.

## July 1, 2022

Data Platform - 1.110.1 - API 3.32.1

#### New Features​

- Data submitters can now submit supplemental surgery data for donors that have this specified treatment in the new Surgery clinical table.
  - The Surgery table is a collection of data elements related to a donor's surgical treatment at a specific point in the clinical record.
  - To submit a Surgery file, simply go to the Submit Clinical Data page and upload a Surgey.tsv file.
  - To submit multiple surgeries, submit multiple rows in the Surgery file.
  - If a specimen was resected during surgery, indicate the unique identifier of the specimen in the 'submitter_specimen_id' field. If multiple specimens were resected during a single surgical procedure, submit each 'submitter_specimen_id' as a new row with the same 'submitter_treatment_id' and 'surgery_type' values.

#### Enhancement

- The Genome Build property on the file entity page is now updated to ‘GRCh38DH’. The link is also updated to the specific versions of reference genomes used in the process.

## February 7, 2022: File Entity Page and Open Access Variant Filtering​

Data Platform - 1.105.3 - API 3.28.2

#### New Features

- A new **File Entity** page has been released that displays the metadata about a file. This page is accessible from the [File Repository](https://platform.icgc-argo.org/repository) by clicking on a File ID. This page includes:
  - A file summary with a link to all files for the associated program.
  - Data analysis information, that include helpful links to documentation about the associated ARGO DNA pipeline workflow and version.
  - Some metadata about the associated donor, samples, and specimens for the file.
  - The ability to download a manifest for the file.
- The **Program Dashboard** has been updated to prepare for the [Open Access Variant Filtering workflow](/docs/analysis-workflows/dna-open-access-filtering):
  - Once a program has raw reads that are processing in the DNA pipeline, the status of the Open Access VF workflow will be reported on the donor summary table and in the molecular chart (if that donor meets the tumour/normal pair requirements).
- **File Repository** improvements have been made, which include:
  - Adding the File ID column to the table, that links to the file entity page.
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
- **File Repository**: Users can browse the complete ARGO data set using the [File Repository](https://platform.icgc-argo.org/repository). Files of interest can be [downloaded](/docs/data-access/data-download), provided that access to controlled data has been confirmed. To access controlled data, please see the [DACO application process here](/docs/data-access/daco/applying), or [apply for DACO approval here](https://daco.icgc-argo.org).
