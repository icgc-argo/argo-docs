---
id: clinical-data-validation-rules
title: Clinical Data Validation Rules
platform_key: DOCS_CLINICAL_VALIDATION_RULES
---

![Reminder Banner](/assets/submission/banner-reminder.svg)

## Clinical Data Encoding Rules

### Identifier fields

The `submitter_donor_id`, `submitter_specimen_id` and `submitter_sample_id` fields must be coded specifically for ICGC-ARGO purposes using the following rules:

- It should not be derived from IDs such as biobank or hospital identifiers. These IDs are be coded in such a way that they cannot be tracked back to the individual donors, except by the submitting program. Only the program will keep the key that will permit to link back the data to the individual donors. This key must not be communicated to the data users.
- IDs are assigned by each submitting program and must be unique within all the data submitted by that program (no duplicate IDs allowed).
- Coded `submitter_donor_id`s referring to the same donor should remain consistent across different submissions from the same submitting program.

### Time Intervals

To prevent potential identification of donors, actual calendar dates are not permitted. The timing of different clinical events are collected in days counted from the date of primary diagnosis.

### Donors Older than 90 years old

Since the occurence of individuals over the age of 90 is rare and therefore potentially make the individual identifiable, in accordance with PIPEDA (insert link here), the `age_at_diagnosis` field is capped at 90.





## Cross File Validations


(insert diagram and table here)



## Clinical Data Completion

Once all core clinical fields and files have been submitted for a donor, the donor is considered "clinically complete".

> **A donor must be clinically complete before any of their molecular analysis files are released to the program members for download.**

### How is clinical data completion calculated?

Complete clinical data means that a donor has a valid value submitted for all fields labelled **"core"** in the [data dictionary](/dictionary), for a minimum set of clinical files. In more detail:

- A donor must have a donor file submitted with all core fields provided.
- A donor must have at least one primary diagnosis with all core fields provided.
- A donor must have at least one tumour and one normal specimen submitted.
- For each registered specimen, a donor must have all specimen core fields provided.
- A donor must have at least one treatment and a corresponding treatment detail file (if applicable, e.g. for chemotherapy, hormonal therapy or radiation) with all core fields provided.
- A donor must have at least one followup with all core fields provided.



