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
## April 27, 2021: Clinical Submission and Program Dashboard Updates
Data Platform v1.93.0
API v 3.16.0

### New Features 
- A New version of the [Program Dashboard](/docs/submission/submitted-data) has been released to help report on data submission and molecular data processing progress has been released. Updates to this section includes: 
    - Redone program statistics bar
	- Donor clinical completeness tracking chart showing a programs progress over times towards submitting complete clinical data for all committed program donors. 
	- Donor molecular processing completeness chart showing processing progress over times towards having completed molecular processing  complete for all committed program donors. 
	- Updated column in the Donor Summary table showing real-time tracking of the progression of a specific donor through the [DNA-Seq Analysis Pipeline](/docs/analysis-workflows/dna-pipeline).
- Two new clinical data entities can be submitted through the Clinical Submission 
	- Family History: A donor's familial relationships and familial cancer history. 
	- Immunotherapy: Treatment regimen details of immunotherapy drugs. 

### Bug Fixes

- The docs site dictionary viewer would occasionally crash if the page was left open or scrolled too much. This has been resolved.   

## Initial Software Release

Data Platform v1.55.0 -
API v3.2.0

**Release Date:** June 19, 2020

### New Features

This is the first release of the ARGO Data Platform. Major features include:

- **Clinical Data Submission**: The ARGO Data Platform is open for data submission for registered programs. Registered programs can begin [submitting clinical data](/docs/submission/submitting-clinical-data) through the Program Services area. Programs that have not registered should [contact the DCC](https://platform.icgc-argo.org/contact).
- **Program Management**: For submitting programs, access to program submission and data can be managed from the Program Services area. This includes the ability for program administrators to review a program profile, as well as add and remove program members.
- **File Repository**: Users can browse the complete ARGO data set using the [File Repository](https://platform.icgc-argo.org/repository). Files of interest can be [downloaded](/docs/data-access/data-download), provided that access to controlled data has been confirmed. To access controlled data, please see the [DACO application process here](/docs/data-access/data-access), or [apply for DACO approval here](https://icgc.org/daco).
