---
id: submitted-data
title: Viewing Submitted Data
platform_key: DOCS_SUBMITTED_DATA
---

Program members can track the progress of their program’s clinical and molecular data submission and download analysis files from the **Program Dashboard**.

When a program member logs in to the ARGO Data Platform, and navigates to the **Program Services** area in the top menu, they will land on the program dashboard. If a member belongs to multiple programs, each program has its own dashboard and submission sections.

## Program Overview: Statistics and Progress

The first half of the Program Dashboard highlights important metrics of progress and statistics to display a program's completion status of molecular and clinical data against the number of donors that have been committed for submission to ARGO.

Program progress is summarized within the following dashboard "cards":

![Dashbard Overviwe and Statistics](/assets/submission/program_stats_section.png)

### Overview Statistics

- The top card aggregates important program statistics:

  - The **number of Registered donors**, with a progress bar showing the goal of % Registered/Committed donors
  - The **percentage of registered donors with complete clinical data**. Once the minimum amount of required clinical data has been submitted for a donor, they are considered [clinically complete](/docs/submission/clinical-data-validation-rules#clinical-data-completion).
  - The **percentage of donors with submitted raw reads for a matched tumour/normal pair**. Once a donor has both a tumour and matched normal raw sequencing data pair [submitted through Song](/docs/submission/submitting-molecular-data), they will be counted towards this percentage.

  > **A donor must be clinically complete and have at least one DNA Tumour/Normal matched pair submitted before any of their processed molecular analysis files are released to the program members.**

### Donor Release Summary

_Coming Soon:_ The status bar in this card shows how many program donors have fully released files (dark blue bar), partially released files (light blue bar) and no released files (white bar) out of the total number of donors committed to ARGO by the program.

### Program Workspace Status

The **Program Workspace** consists of the sample registration as well as the clinical submission areas.

> All program members share the same workspace, so members are encouraged to communicate with each other when a sample registration or clinical submission is in progress.

**Sample Registration Progress:** this progress bar will show if there are uploaded samples that haven’t been registered yet. A blank status bar means this area is free to register samples.

**Clinical Submission Progress:** this progress bar will show if a clinical submission currently has uploaded files or if it has been validated and is ready for sign off. If a submission is signed off without any updates to previously submitted data, this progress bar will become blank again, signifying that this area is free to submit clinical data. If the progress bar is in “pending approval” state, this means the clinical submission area has been locked and is under review by the DCC. Once the DCC approves the clinical data updates, the progress bar will become blank and the clinical submission area is free for a new submission.

### Clinical Completeness Data Summary

This line graph tracks how many donors have complete clinical data over time.

- Check out [Clinical Data Validation Rules](/docs/submission/clinical-data-validation-rules) for more information on how clinical completion is calculated.
- As soon as a donor's clinical data is completed, this chart will update in real-time.

### Molecular Data Summary

This line graph compares how many donors have been processed through the [DNA-Seq Pipeline](/docs/analysis-workflows/dna-alignment) (Raw Read Submission, Alignment, Sanger VC...) over time.

- Use the legend to toggle different pipeline steps on/off to check progress of different processing steps.
- This chart is updated in real-time. While the data may show that a donor has been processed in the molecular summary chart, the donor files may not yet be released to the program if that donor is lacking complete clinical data.

## Donor Data Summary

This table is a detailed summary of the clinical data status and DNA-Seq pipeline status for **each registered donor** in the program. It also shows which donors have files that have been released to the public via the File Repository.

![Dashboard Workflow Status](/assets/submission/program_donor_summary_section.png)

### Table Actions

Using the button above the table, a program member can download all clinical data that has been submitted for the program donors. The download will be in the same file format that was submitted through the sample registration and clinical submission sections.

The table is sorted by default on the last updated date, so a program member will always see the donors with the most recent activity first. The table can be sorted by another column by clicking on any other column header. There is also a filter icon in most header cells, which allows you to filter the donor data table by specific criteria.

### Released Files Status

Each donor has a **star** ![Dashboard Donor Release Star](/assets/submission/dashboard-donor-star.png) that denotes if they have fully released files, partially released files or no released files. In order to have released files, the embargo period must be over and the donor must have 100% [core completeness](/docs/submission/clinical-data-validation-rules#clinical-data-completion) as well as some molecular analysis completed.

### Clinical Data Status

The table shows the percentage of **core clinical fields** that have been submitted for a donor.

- If no clinical data is submitted, this column is blank.
- If some clinical data is submitted, then the percentage towards completion is shown.
- **Core completion must be 100% (showing ![Dashboard Donor 100% clinical complete](/assets/submission/dashboard-clinical-complete.png)) for any analysis files to be released to the program members for download**.
- [See how this percentage is calculated](/docs/submission/clinical-data-validation-rules#clinical-data-completion)

### Sample Status

A donor's registered tumour and normal sample count as well as submitted raw reads count are also tracked within this table.

![Dashboard Donor Sample Status](/assets/submission/dashboard-samples-raw-reads.png)

- In the **samples** column, a 0N (normal) or 0T (tumour) will be highlighted in red for any missing tumour/normal pair (each donor must have at least one normal and one tumour sample registered).
- Once raw samples are [submitted through Song](/docs/submission/submitting-molecular-data), those counts will appear in the **raw reads** column. Similarly, the raw reads normal and tumour count will be highlighted in red for any instance where no sample files have been submitted.

### Analysis Status

The donor summary table also shows where each donor sample is at in the [DNA-Seq Pipeline](/docs/analysis-workflows/dna-alignment). In the pipeline columns, a progress bar will appear if the donor has any samples processing through these workflow types.

![Dashboard Workflow Status](/assets/submission/dashboard-workflow-statusbar.png)

- A green section with a number will show how many donor samples have completed that workflow.
- An orange section with a number will show how many donor samples are currently processing that workflow.
- A red section with a number will show how many donor samples have stopped processing because of a workflow error.
<!-- - Hovering over these sections will show the specific Submitter Sample IDs for each workflow status. -->

### Last Updated

The **last updated** table column indicates when this donor was last updated with new data submission or molecular analysis.

## Pre-Release Data

ICGC ARGO member programs will have privileged access to data from other members of the Consortium based on their level of Membership. Data access is tiered and aimed not to disadvantage Full Member or Associate Member Data producers, with a framework that encourages data sharing and provides data generators with sufficient time to perform analyses:

- After completion of standardized analyses: Accessible to the Program submitting data for 12 months
- 12 months after file pre-release: Accessible to Full Members
- 18 months after file pre-release: Accessible to Associate Members
- 24 months after file pre-release: Accessible to the public

If you are logged in, the [File Repository](https://platform.icgc-argo.org/repository) will show an additional facet to sort on your priviledged access to pre-release data. Pre-release data is sorted into 4 categories based on the [ARGO Data Management policy](https://www.icgc-argo.org/page/133/e2-data-management).

![Viewing Pre-Release Data](/assets/submission/pre-release-data-file-repo-view.png)

- **My Program Access**: These files are visible to [Program Members](/docs/submission/managing-program-access) only.
- **Full Member Access**: These files are visible to both the [Program Members](/docs/submission/managing-program-access) that submitted the data and to all Full Membership Program Members.
- **Associate Member Access**: These files are visible to the [Program Members](/docs/submission/managing-program-access) that submitted the data, all Full Membership Program Members and all Associate Membership Program Members.
- **Released to the Public**: These files are publicly visible to any user that visits the ARGO Data Platform file Repository.

## DACO Access Control

If a file is `controlled access` DACO permissions are required to download the file. If the file is `open` access, it can be downloaded anonymously. [Read more about applying for access to controlled data.](/docs/data-access/daco/applying)
