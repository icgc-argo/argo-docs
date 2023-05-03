---
id: viewing-clinical-data
title: Viewing Clinical Data
platform_key: DOCS_VIEWING_CLINICAL_DATA
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The submitted data page is where you can review, query, and download clinical data submitted by your program. Submitted clinical data will be accessible from this page following sample registration and clinical data submission sign-off. Only program administrators, data submitters, and collaborators can access the program's submitted data page.

## Navigating the Submitted Data Page

The submitted data dashboard is accessed by clicking the "submitted data" tab on the left-hand menu. The dashboard has two main sections, the **donor filter pane** and the **clinical data table pane**.

<!---  Tabs start here -->

<Tabs
groupId="data-submission-pane"
defaultValue="filter"
values={[
{ label: 'Donor Filter Pane', value: 'filter', },
{ label: 'Clinical Data Pane', value: 'clinical', },
]
}>
<TabItem value="filter">

![submitted-data-filter-card](/assets/submission/submitted-data-filter-card.png)

_The top donor filter pane allows you to query your program's submitted clinical data by donor Id, submitter donor ID, or using quick filters._

</TabItem>

<TabItem value="clinical">

![submitted-data-table](/assets/submission/submitted-data-table.png)

_The lefthand navigation menu can be used to select the desired file, and the records within that file will be displayed in the center of the pane. Only files that have been submitted will be available for selection. A red notification icon indicates an error report associated with the selected clinical data file._

</TabItem>
</Tabs>

<!---  Tabs end here -->

## Clinical Core Completion Table

The donor data record displays the submitted `donor.tsv` file alongside a table summarizing each donor's progress toward clinical _core completion_.

> Molecular analysis files can be downloaded by program members only when the associated clinical donor data is considered _core complete_. For core completeness, **each donor** requires **at least one**:
>
> - Donor record (DO)
> - Primary Diagnosis record (PD)
> - All registered Normal DNA Specimen record (NS)
> - All registered Tumour DNA Specimen record (TS)
> - Treatment record (TR)
> - Follow Up record (FO)
>
> [See here](/docs/submission/clinical-data-validation-rules#how-is-clinical-data-completion-calculated) for more information.

<!--I'd like to insert an image of an example table inline with this text this website doesnt support html in the markdown, I beleive you can input the css elsewhere and reference the alt tag-->

A donor with six green checkmarks under each field heading (DO, PD, NS...) is considered to have completed all the core requirements. If a donor is missing core records, they will be labelled with a red "0" under the respective field heading.

## Error Reports

![submitted-data-error-report](/assets/submission/submitted-data-error-report.png)

From the clinical data pane's lefthand navigation bar, a red exclamation mark indicates errors associated with the submitted clinical file.

An error report will appear above the clinical data table. The fields in the table referenced in the error report will be highlighted in red, making it easy to identify the specific fields of data that contain errors.

This report can be downloaded using the icon in the top right of the dialogue box.

## Correcting Already Registered Data

<!--This section is largely copy-pasted but important as a next step to error handling, might need more info on expanding this-->

Once samples are registered and data processing and analysis proceed, it can be challenging to correct the data manually.

If you have made an error with registered sample data, please get in touch with [the DCC](https://platform.icgc-argo.org/contact), and they will assist in correcting your registered data.

## Filtering & Downloading Submitted Clinical Data

With the donor filter pane, you can select and download groups of clinical data by using quick filters or custom searches. Once you have chosen the desired donors, you can download the associated clinical data by clicking the icon on the far right of the pane. Additionally you can download all the clinical donor data within a chosen clinical file by using the icon in the top right of the clinical data pane.

### Quick Filters

Using the quick filter dropdown, you can choose the following options:

- **All Donors** selects all donors submitted by the program
- **Invalid Donors** selects all donors with non-permissible entries
- **Complete Donors** selects all core complete donors
- **Incomplete Donors** selects all core incomplete donors

### Custom Searches

The search bar allows users to locate specific donor clinical data with a donor or submitter donor ID. The list button enables users to search for multiple IDs with a comma-separated list or by uploading a file containing the ID information (.txt, .csv, .tsv). The bottom of the list popup window will show the number of matched and Unmatched IDs.

<!--Would be nice to know which are unmatched-->
