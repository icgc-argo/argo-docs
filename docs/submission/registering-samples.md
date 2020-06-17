---
id: registering-samples
title: Registering Samples
platform_key: DOCS_REGISTERING_SAMPLES
---

It is important that the relationships between entities are maintained across all data submissions, as they are fundamental to data integrity across the ARGO Data Platform. Thus, during sample registration, each **Donor**, **Specimen**, and **Sample** entity will be assigned an **ARGO ID** that maps to your program's internal identifier, (also referred to as **submitter_id**).

> Registration is the first step in the data submission life cycle. You **must** register samples before submitting any clinical or molecular data.

The basic set of data that must be registered for each sample can be found in the Sample Registration section of the [Data Dictionary](/dictionary).

During sample registration, **ARGO IDs** will be assigned to your program entities. Any attempts to submit data that does not refer to a registered donor, specimen, or sample will result in an error. You will be prompted to complete sample registration before any clinical or molecular data is submitted to your program.

## Multiple Data Submitters

There is only one Sample Registration workspace for each program. You can check if sample registration is in progress on the [Dashboard> Program Workspace](/docs/submission/submitted-data#program-workspace-status) card. All program data submitters will be using the same workspace, and you will see which member has been working in this space by looking at the file upload info above the preview table. Please communicate with your team if you see a sample registration in progress.

![Multiple Data Submitters](/assets/submission/registration-multiple-submitters.png)

## How to Register Samples

### Step 1: Download and Format the Sample Registration File

![Download and Format File](/assets/submission/register-1-download.png)

1. When logged in, navigate to the **Program Services** area in the top menu.
1. Click on the **Register Samples** section in the left menu for your program.
1. Download the **TSV Template** for the sample registration file and format it according to the current [Data Dictionary](/dictionary) specifications.

For help with formatting this file, please refer to [Tips for Formatting your TSV files](/docs/submission/submitting-clinical-data#tips-for-formatting-tsv-files)

### Step 2: Upload Sample Registration TSV File

![Upload Files](/assets/submission/register-2-upload.png)

1. Once your file is formatted, click the **Upload File** button and select your file from the browser window. Only the TSV file type is supported, and the file name must begin with the _sample-registration_ and end with _.tsv_.
1. Upon uploading, if there are any errors in your file they will be displayed within the Sample Registration workspace. The error report will also be available for download. You must fix all of the errors that are listed within your sample registration file and then reupload it.
1. Valid files will be available for preview in the Sample Registration workspace. You can review the new samples (purple star) versus previously registered samples (grey star) by filtering the table on the star column.

### Step 3: Register Samples

![Register Samples](/assets/submission/register-3-register.png)

1. Once you have reviewed the file preview, click on the **Register Samples** button to submit your samples.

Once registered, donors, along with specimen and sample counts, will be visible on your [Program Dashboard](/docs/submission/submitted-data).

## Correcting Already Registered Data

Once samples are registered and data processing and analysis proceeds, it can be difficult to correct the data manually.

If you have made an error with registered sample data, please [contact the DCC](https://platform.icgc-argo.org/contact) and they will assist in correcting your registered data.
