---
id: submitting-clinical-data
title: Submitting Clinical Data
platform_key: DOCS_SUBMITTING_CLINICAL_DATA
---

This guide will describe how to submit clinical data using the ARGO Data Platform. Clinical data consists of all supporting data about your program's donors, including their health data.

> Note: Before you can submit clinical data, your donors must be assigned ARGO IDs through the sample registration process. See [Registering Samples](/docs/submission/registering-samples) for instructions on how to register samples.

## Multiple Data Submitters

There is only one Clinical Submission workspace for each program. All program data submitters will be using the same workspace, and you will see which member has been working in this space by looking at the file upload info above the preview table. Please communicate with your team if you see a clinical submission in progress.

![Multiple Data Submitters](/assets/submission/clinical-multiple-submitters.png)

## How to Submit Clinical Data

### Step 1: Download Templates and Format Clinical Files

![Download and Format Files](/assets/submission/clinical-1-dowload-templates.png)

1. When logged in, navigate to the **Program Services** area in the top menu.
1. Click on the **Submit Clinical Data** section in the left menu for your program.
1. Download a **TSV Template** for each data type that you are submitting. Format your file(s) according to the current [Data Dictionary](/dictionary) specifications for each clinical data type.

### Tips for Formatting TSV files

- To simplify editing the TSV files, open them in Excel:
  - BEFORE pasting your data into the Excel spreadsheet, reformat the cells as text. To do so, select the empty cells where you will paste your data, right click and select "Format cells". Choose the "Text" option and click "Ok".
  - The first row of the file is reserved for the field headers. DO NOT DELETE THESE, as the headers act as important keys for data validation.
  - Paste your data under the correct header fields.
  - When you save the Excel spreadsheet, make sure it remains a TSV file. Upon saving, you may need to confirm "do you want to keep using that format?", click "Yes".
- If you are using a text editor, make sure you have invisible characters turned on. This way you can be sure that tabs are correctly separating each field value.
- You do not need to remove any columns from the TSV file. For example, if the field is labeled "extended" in the dictionary and you do not have a value for that field, simply leave it blank.
- Each file template name references the corresponding version of the dictionary (e.g argo_submission_templates_v0.7 is referencing version 0.7 of the data dictionary). Please make sure you are using the latest version of these files by referencing the latest [Data Dictionary](/dictionary).
- Check out [Clinical Data Validation Rules](/docs/submission/clinical-data-validation-rules) for the clinical file validation rules.

### Step 2: Upload Clinical TSV Files

![Upload Files](/assets/submission/clinical-2-upload.png)

1. Once your file(s) are formatted, click the **Upload Files** button and select your file(s) from the browser. Only TSV file types are supported, and the file names must begin with the data type that is being submitted. For example, _donor_v.07-[anything].tsv_ would be a correctly formatted name for the donor file.
1. Upon uploading, if there are any errors in your file they will be displayed within the Clinical Submission workspace. The error report will also be available for download. You must fix all of the errors that are listed within your file(s) and then reupload them.
1. Valid files will be available for review within the file preview tables. You can review the file data for each data type by using the tabs on the left of the preview area.

### Step 3: Validate Clinical Workspace

Uploaded data must be checked for accuracy against the data in the current submission, as well as any data that has previously been submitted for your donors. Check out the [Clinical Data Validation Rules](/docs/submission/clinical-data-validation-rules#cross-file-validations) for a list of the cross-file validations that are performed.

![Validate Files](/assets/submission/clinical-3-validate.png)

1. Once you are ready, click the **Validate Submission** button to check your entire submission workspace for data consistency.
1. Upon validation, if there are any errors in your submission they will be displayed within the Clinical Submission workspace. The error report will also be available for download. You must fix all of the errors that are listed within your file(s) and then reupload them.
1. If there are no errors in your submission, then it will be marked as _Valid_.

### Step 4: Sign Off Submission

![Sign off Submission](/assets/submission/clinical-4-signoff.png)

1. Once you have reviewed the files in the file preview area and your submission is valid, click the **Sign Off Submission** button to submit your clinical data.
1. If you have made any updates to already submitted data, your clinical workspace will be locked in a Pending Approval state. A DCC member will review your updates and approve them for submission. If there are any issues, your submission will be reopened and the DCC will notify you, via email, of the required changes.
1. If your data does not require approval by DCC, it will be submitted automatically.

Once submitted, you will see the clinical data reflected on your [Program Dashboard](/docs/submission/submitted-data).
