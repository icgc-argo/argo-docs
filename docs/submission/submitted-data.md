---
id: submitted-data
title: Viewing Submitted Data
platform_key: DOCS_SUBMITTED_DATA
---

Program members can track the progress of their program’s clinical and molecular data submission and download analysis files from the **Program Dashboard**.

When a program member logs in to the ARGO Data Platform, and navigates to the **Program Services** area in the top menu, they will land on the program dashboard. If a member belongs to multiple programs, each program has its own dashboard and submission sections.

Program progress is summarized within the following dashboard "cards":

## Program Statistics

This card aggregates the following program statistics:
![Dashbard Program Statistics](/assets/submission/dashboard-stats.png)

#### Registered Donors

Once samples are registered, each corresponding donor will be counted as a percentage out of the number of committed program donors.

#### % Donors with all Core Clinical Data

Once the minimum amount of required clinical data has been submitted for a donor, they are considered **"clinically complete"**.

> **A donor must be clinically complete before any of their molecular analysis files are released to the program members.**

Check out [Clinical Data Validation Rules](/docs/submission/clinical-data-validation-rules) for more information on how clinical completion is calculated.

#### % Donors with Tumour & Normal

_Coming Soon:_ Once a donor has both a tumour and matched normal raw sequencing data [submitted through Song](/docs/submission/submitting-molecular-data), they will be counted towards this percentage.

#### Donors in Molecular Data Processing

_Coming Soon:_ This is the number of donors that currently have molecular data being processed in the [analysis pipeline](/docs/analysis-workflows/analysis-overview).

#### Files to QC

_Coming Soon:_ Once an analysis workflow is completed (and the corresponding donor is clinically complete), the analysis files will be available to program members first to QCs. These files can be downloaded using a [file manifest and the score-client](/docs/data-access/data-download), and will be available for an embargo period before being released to the public via the File Repository.

#### Donors with Released Files

_Coming Soon:_ Once the files have passed the embargo period, a data release will occur. Donors who have BOTH core clinical completeness and analysis files available will be released to the public via the File Repository.

#### All Files

_Coming Soon:_ The count of all files for the program, i.e. all clinical and molecular analysis files that have either been released to the public or are still in QC for the embargo period. A program member, having DACO approval, can download these files by using the [file manifest with the score-client](/docs/data-access/data-download).

## Donor Release Summary

The status bar in this card shows how many program donors have fully released files (dark blue bar), partially released files (light blue bar) and no released files (white bar) out of the total number of donors committed to ARGO by the program.  
![Dashbard Donor Release Summary](/assets/submission/dashboard-donor-release-card.png)

## Program Workspace Status

The **Program Workspace** consists of the sample registration as well as the clinical submission areas.
![Dashbard Program Workspace Status](/assets/submission/dashboard-program-workspace-card.png)

> All program members share the same workspace, so members are encouraged to communicate with each other when a sample registration or clinical submission is in progress.

**Sample Registration Progress:** this progress bar will show if there are uploaded samples that haven’t been registered yet. A blank status bar means this area is free to register samples.

**Clinical Submission Progress:** this progress bar will show if a clinical submission currently has uploaded files or if it has been validated and is ready for sign off. If a submission is signed off without any updates to previously submitted data, this progress bar will become blank again, signifying that this area is free to submit clinical data. If the progress bar is in “pending approval” state, this means the clinical submission area has been locked and is under review by the DCC. Once the DCC approves the clinical data updates, the progress bar will become blank and the clinical submission area is free for a new submission.

## Completed Core Clinical Data

_Coming Soon:_ This line graph shows the number of donors that are clinically complete over time.

## Molecular Data Summary

_Coming Soon:_ This line graph compares how many donors have been processed through the [DNA-Seq Pipeline](/docs/analysis-workflows/dna-pipeline): Raw Read Submission, Alignment and Sanger VC.

## Donor Data Summary

This table is a detailed summary of the clinical data status and DNA-Seq pipeline status for each registered donor in the program. It also shows which donors have files that have been released to the public via the File Repository.
![Dashbard Donor Data Summary](/assets/submission/dashboard-donor-table-card.png)

#### Table Actions

Using the buttons above the table, a program member can download all clinical data that has been submitted for the program donors. The download will be in the same file format that was submitted through the sample registration and clinical submission sections.

_Coming Soon:_ A program member can download missing clinical data for all donors as well as the table summary details.

The table is sorted by default on the last updated date, so a program member will always see the donors with the most recent activity first. The table can be sorted by another column by clicking on any other column header.

#### Released Files Status

Each donor has a **star** ![Dashboard Donor Release Star](/assets/submission/dashboard-donor-star.png) that denotes if they have fully released files, partially released files or no released files. In order to have released files, the embargo period must be over and the donor must have 100% [core completeness](/docs/submission/clinical-data-validation-rules) as well as some molecular analysis completed.

#### Clinical Data Submission

The table shows the percentage of **core clinical fields** and percentage of **extended clinical fields** that have been submitted for a donor.

![Dashboard Clinical Data Submission](/assets/submission/dashboard-clinical-submission.png)

- **Core completion must be 100% (showing ![Dashboard Donor 100% clinical complete](/assets/submission/dashboard-clinical-complete.png)) for any analysis files to be released to the program members for download**. [See how this percentage is calculated](/docs/submission/clinical-data-validation-rules)
- The extended field percentage does not have to reach 100%, but it is strongly encouraged that data submitters provide as many of these fields as possible for a donor.

#### Sample Status

The registered tumour and normal sample count as well as submitted raw reads count are also available within this table.

![Dashboard Donor Sample Status](/assets/submission/dashboard-samples-raw-reads.png)

- In the **samples** column, a 0N (normal) or 0T (tumour) will be highlighted in red for any missing tumour/normal pair (each donor must have at least one normal and one tumour sample registered).
- _Coming Soon:_ Once raw samples are [submitted through Song](/docs/submission/submitting-molecular-data), those counts will appear in the **raw reads** column. Similarly, the raw reads normal and tumour count will be highlighted in red for any instance where the count does not match the registered sample count.

#### Analysis Status

_Coming Soon:_ The donor summary table also shows where each donor sample is at in the [DNA-Seq Pipeline](/docs/analysis-workflows/dna-pipeline). In the **Alignment** and **Sanger VC** columns, a progress bar will appear if the donor has any samples processing through these workflows.

![Dashboard Workflow Status](/assets/submission/dashboard-workflow-statusbar.png)

- A green section with a number will show how many donor samples have completed that workflow.
- An orange section with a number will show how many donor samples are currently processing that workflow.
- A red section with a number will show how many donor samples have stopped processing because of a workflow error.
- Hovering over these sections will show the specific Submitter Sample IDs for each workflow status.

The **processing status** table column shows the overall molecular status for that donor:

- Registered: samples are awaiting molecular submission or processing.
- Processing: some submitted samples are processing.
- Complete: all submitted samples have completed the workflows.

#### Last Updated

The **last updated** table column indicates when this donor was last updated with new data submission or molecular analysis.
