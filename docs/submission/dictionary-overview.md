---
id: dictionary-overview
title: Data Dictionary
---

The ICGC ARGO [Data Dictionary](/dictionary) expresses the details of the ARGO data model, which adheres to specific formats and restrictions to ensure a standard of data quality. The Data Dictionary defines a set of files, each related to a clinical concept, that can be submitted to the ARGO Data Platform.

For recent updates, check the [Dictionary Release Notes](../release-notes/dictionary-releases).

## Understanding the Data Dictionary

The [dictionary table view](/dictionary) lists all of the clinical fields that the ARGO Data Platform accepts, separated by clinical TSV file.

Field listings can be filtered by Data Tier and Attribute, which can help identify which fields are necessary for [clinical data completion](clinical-data-validation-rules).

You can explore previous dictionary versions using the dropdown at the top of the dictionary. Using the latest version of the dictionary is required during data submission.

### Field Descriptors

Each field has a data tier and an attribute classification, which reflects the importance of the field in terms of clinical data completion.

![ID](/assets/submission/dictionary-id.svg) classification indicates:

- Field is a unique identifier that is used for cross file validation.
- Field is a primary or foreign key.

![Conditional](/assets/submission/dictionary-conditional.svg) classification indicates:

- Field must meet certain conditions, depending on the value of another field.
- Conditional rules are described in the data dictionary scripts & notes.

![Required](/assets/submission/dictionary-required.svg) classification indicates:

- Field must be provided in the submitted TSV file.
- When paired with the `Conditional` attribute, this field is only required if conditional requirements are met.

![Core](/assets/submission/dictionary-core.svg) classification indicates:

- Field is part of the mandatory minimum set of clinical data that must be submitted.

The set of core clinical fields were defined by the [Tissue & Clinical Annotations Working Group](http://www.icgc-argo.org/page/84/tissue-clinical-annotation-working-group) which involved regular discussions with members of the working group and ARGO Programs. Core clinical fields are commonly acquired in cohort-based studies and clinical trials and are required to address clinically relevant topics by cross entity analyses, and therefore constitute a critical element in the analysis of diverse ARGO Programs.

![Extended](/assets/submission/dictionary-extended.svg) classification indicates:

- Field is not required for clinical data completion.
- It is _strongly encouraged_ to provide as many extended fields as possible.

### Permissible Values

- Some fields will only accept certain values from a list that is provided in the permissible values column of the dictionary tables. Values must match the dictionary spelling exactly, but can be submitted case-insensitive.

- Other fields must meet a regular expression for their value.

## Dictionary Reference Databases

### ICD-10 Codes

// link to Reference
// description of reference (what for)

### Staging Systems

#### AJCC

#### Binet

### RxNorm
