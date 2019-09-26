---
id: registering-ids
title: Registering Samples
---

In the ARGO Data Platform, clinical and molecular data objects are assigned ARGO Identifiers (**ARGO IDs**) used to track the data through the Platform. Each **Donor**, **Specimen**, and **Sample** entity will be assigned an **ARGO ID**, mapped to your program's internal identifiers.

It is important that the relationships between entities are  maintained across submissions, as they are fundamental to data tracking and integrity across the ARGO Platform.

> Registration is the first step in the data submission life cycle.  You must registers samples before any clinical or molecular data submissions.

The basic set of data that must be registered for each sample consists of:
* Submitter Donor ID
* Donor Gender
* Submitter Specimen ID
* Specimen Tissue Source
* Specimen Tumor or Normal Designation
* Submitter Sample ID
* Sample Type

During sample registration, **ARGO IDs** will be assigned to your programs data. Any attempts to submit data  which does not refer to a previously registered samples will result in an error, and will prompt you to complete the registration step before proceeding.

## How To Register Samples
1. Navigate to the **Submission** area in the top menu.
1. Click on the **Register Samples** section in the left menu pane for your program.
1. Download a **TSV Template** of the registration file and formatting the file according to the [Data Dictionary](/dictionary) specifications.
1. Once your file is formatted, click **Upload File** and select the file from your browser. Only TSV file types are supported, and the file name must begin with the *sample-registration* and end with _.tsv_.
1. If there are any errors in your file, they will be displayed upon upload attempt. You must fix all of the errors which are listed, and reupload the fixed registration file.
1. Valid files will be available for preview in the Submission UI. You can review the file contents and filter on new vs. previously registered samples using the star filter.
1. Once you have reviewed the file, click on the **Register Samples** button to submit your samples.

Once submitted, samples, along with donor and specimen data, will  be visible on the [Donor Dashboard](/linktootherdocpage).

## Correcting Already Registered Data
Once samples are registered and data processing and harmonization proceeds, it can be difficult to correct the data manually.

If you made an error in registered data, please [contact the DCC](https://platform-ui.qa.argo.cancercollaboratory.org/contact) to assist you in correcting your registered data.  
