---
id: registering-ids
title: Registering Samples
---

## What it means

>Registration is the first step in the data submission life cycle - we mandate that it be done ahead of any clinical or molecular data submissions.

Clinical and molecular data is assigned to simple, and easy-to-read identifiers on the ARGO platform. Each **Donor**, **Specimen** & **Sample** entity will be assigned a respective **ARGO ID**, mapping to your program's internal identifiers. It is important that the relationships between these entities are  maintained across submissions, as they are fundamental for data processing and synchronization across all ARGO resources.

In order to prevent data integrity errors in future clinical or molecular data submissions, we ask that you first register **Sample** data which includes :

* Submitter Donor ID
* Donor Gender
* Submitter Specimen ID
* Specimen Tumor or Normal Designation
* Specimen Type
* Submitter Sample ID
* Sample Type


To view the registration file schema and  permissible field values, please see the [Data Dictionary](/dictionary). At the point of registration, the  **ARGO IDs** will be generated, and associated to the  your program's submitter IDs.  Any attempts to submit data  which does not refer to a previously registered identifier will result in an error, and will prompt you to complete the registration step before proceeding. Please [contact the DCC](/contact) if you need to make any changes to previously registered data.  


## How To
1. Navigate to the **Data Submissions** area in the top menu.
2. Click on the **Register Samples** section in the left menu pane for your program.
3. You can download the **TSV Template** for the registration file and start formatting your file according to the [Data Dictionary](/dictionary) specifications .
4. Once you have formatted your data file, click **Upload File** and select the file from your browser. Only TSV file types are supported, and the file name must begin with the word *registration*.

5. If there are any errors in your file, they will be displayed upon upload attempt. The error report will also be available for download. Please make sure to download the errors before you navigate away from the page. You must fix all of the errors which are listed, and upload the file again.

6. Valid files will be available for preview on the UI. You can browse through the file contents, and filter on new vs. previously registered samples using the star filter.
7. Once you have reviewed the file in Preview, click on the **Register Samples** button to submit your samples.
8. Submitted samples will then be visible on the Donor Dashboard.
9. Any requests to change registration data must be made by contacting the DCC.


##
