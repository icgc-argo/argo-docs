---
id: registering-samples
title: Registering Samples
---

In the ARGO Data Platform, clinical and molecular data objects are assigned ARGO Identifiers (**ARGO IDs**) used to track the data through the Platform. Each **Donor**, **Specimen**, and **Sample** entity will be assigned an **ARGO ID**, mapping to your program's internal identifiers.

It is important that the relationships between entities are maintained across all data submissions, as they are fundamental to data integrity across the ARGO Data Platform.

> Registration is the first step in the data submission life cycle.  You **must** register samples before submitting any clinical or molecular data submissions.

The basic set of data that must be registered for each sample consists of:
* `program_id`
* `submitter_donor_id`
* `gender`
* `submitter_specimen_id`
* `specimen_tissue_source`
* `tumour_normal_designation`
* `specimen_type`
* `submitter_sample_id`
* `sample_type`

During sample registration, **ARGO IDs** will be assigned to your program data. Any attempts to submit data that does not refer to a registered sample will result in an error. You will be prompted to complete sample registration before any clinical or molecular data is submitted to your program.

## Registering Samples
1. Navigate to the **Submission** area in the top menu.
1. Click on the **Register Samples** section in the left menu for your program.
1. Download a **TSV Template** of the sample registration file and format the file according to the current [Data Dictionary](/dictionary) specifications.
1. Once your file is formatted, click the **Upload File** button and select your file from the browser. Only TSV file types are supported, and the file name must begin with the *sample-registration* and end with _.tsv_.
1. Upon uploading, if there are any errors in your file they will be displayed within the Sample Registration workspace. The error report will also be available for download. You must fix all of the errors that are listed within your sample registration file and then reupload it.
1. Valid files will be available for preview in the Sample Registration workspace.  You can review the new samples (purple star) versus previously registered samples (grey star) by filtering the table on the star column.
1. Once you have reviewed the file preview, click on the **Register Samples** button to submit your samples.

Once submitted, samples, along with donor and specimen data, will be visible on your [Program Dashboard](/docs/submitted-data).

## Correcting Already Registered Data
Once samples are registered and data processing and analysis proceeds, it can be difficult to correct the data manually.

If you have made an error to registered sample data, please [contact the DCC](https://platform.icgc-argo.org/contact) and they will assist in correcting your registered data.  
