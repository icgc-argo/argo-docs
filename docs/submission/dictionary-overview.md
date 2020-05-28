---
id: dictionary-overview
title: Dictionary Overview
---

The ICGC ARGO [Data Dictionary](/dictionary) expresses the details of the ARGO data model, which adheres to specific formats and restrictions to ensure a standard of data quality. The Data Dictionary defines a set of files, each related to a clinical concept, that can be submitted to the ARGO Data Platform.

To follow the evolution of the data dictionary, check out the [Dictionary Release Notes] (../release-notes/dictionary-releases).

## Understanding the Data Dictionary Table View

The [dictionary table view](/dictionary) lists all of the clinical fields that the ARGO Data Platform accepts, separated by clinical TSV file.

The first list is for the Sample Registration file, which is the only file to be uploaded in the **Register Samples** section. All other lists outline the fields in the clinical TSV files that will be uploaded in the **Submit Clinical Data** section. A list of links on the right side of the page makes it very simple to navigate the clinical files. Each file starts with the name, field count, description, and a file name example to help ensure proper names are used. 

The lists can be filtered by Data Tier and Attribute, which can help a data submitter identify which fields are necessary for [clinical data completion](clinical-data-validation-rules). 

The dictionary version appears in a dropdown above the lists, as well as a date of when it was last updated. You can explore previous dictionary versions by choosing another version number from the dropdown. This dictionary version will also be reflected in the names of the file templates that are downloaded from the Platform. It is important to use the most current files for the dictionary validation to run smoothly. 

### Field Name & Description
Each field has a name and a description, the name being the same label that appears in the headers of each TSV file. 

### Data Tier & Attributes 
Each field has a data tier and an attribute classification, which reflects the importance of the field in terms of clinical data completion. 

#### ID Fields
An ![ID](/assets/submission/dictionary-id.svg) field is a unique identifier that is used for cross file validation. Most ids have a ![Required](/assets/submission/dictionary-required.svg) attribute, which means they are required to be provided in an uploaded clinical file in order for a submission to be valid. 

#### Core Fields
![Core](/assets/submission/dictionary-core.svg) clinical fields are required for each donor in order to be accepted as an ICGC ARGO case. The set of core clinical fields were defined by the [Tissue & Clinical Annotations Working Group](http://www.icgc-argo.org/page/84/tissue-clinical-annotation-working-group) which involved regular discussions with members of the working group and ARGO Programs. 

These core clinical fields are commonly acquired in cohort-based studies and clinical trials and are required to address clinically relevant topics by cross entity analyses, and therefore constitute a critical element in the analysis of diverse ARGO Programs.

As seen in the dictionary, most core fields are ![Required](/assets/submission/dictionary-required.svg) for [clinical data completion](clinical-data-validation-rules), with the exception of some conditional fields that are dependent on the values of other fields. Upon upload, a validation error will occur, such as *"vital_status is a required field"*, if a core field is missing.

If the field is ![Core](/assets/submission/dictionary-core.svg) + ![Conditional](/assets/submission/dictionary-conditional.svg), then it is required for clinical data completion, only if certains condition are met. The conditions for the permissible value will be described in the notes column for the conditional field. 

#### Extended Fields
![Extended](/assets/submission/dictionary-extended.svg) fields are not required for clinical data completion but it is strongly encouraged to provide as many extended fields as possible to help ensure data quality. In most cases, extended fields have a blank attribute, which means they are not required to be submitted. 

If a field is classified as ![Extended](/assets/submission/dictionary-extended.svg) + ![ Conditional](/assets/submission/dictionary-conditional.svg), this means you can provide a value for this field only if the condition in the notes is met.

### Field Type
A field can be of type: Text, Integer, Number, or an Array of any of these types (array values are to be separated with a comma ","). An error will occur, such as *"The value is not permissible for this field"* if the incorrect field type is provided when uploading a file. 

### Permissible Values
Some fields will only accept certain values from a list that is provided in the permissible values column of the dictionary tables. It is mandatory that the value is written exactly as it is in the dictionary. Each value list is provided in alphabetical order and some are collapsed because they are quite long; please click the "# more" link to see the full list. 

Other fields, such as IDs, are required to be written in a certain format. In this case, a regular expression is provided in this column. Some examples are also provided that link out to a regular expression resource that can be used to test if your value meets the regular expression. 

The error will occur, "The value is not permissible for this field" if you do not provide a correct permissible value or your value does not meet the provided regular expression. 

### Notes & Scripts
This column includes important notes about certain fields for further conditions and descriptions. Some notes contain a "View Script" button, which opens a window with the script restrictions for that field. This code will provide the validations that are being done on this field, so you can test with your clinical values. 


## Dictionary Reference Databases

### ICD-10 Codes

// link to Reference
// description of reference (what for)

### Staging Systems

#### AJCC

#### Binet

### RxNorm
