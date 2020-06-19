---
id: clinical-data-validation-rules
title: Clinical Data Validation Rules
platform_key: DOCS_CLINICAL_VALIDATION_RULES
---

## Clinical Data Encoding Rules

### Identifier fields

The data dictionary contains certain data elements regarded as "identifiers". These fields have an ![ID](/assets/submission/dictionary-id.svg) descriptor in the data dictionary and include:

- Donor: `submitter_donor_id`
- Specimen: `submitter_specimen_id`
- Sample: `submitter_sample_id`
- Primary Diagnosis: `submitter_primary_diagnosis_id`
- Treatment: `submitter_treatment_id`
- Follow Up: `submitter_follow_up_id`

These fields must to be coded specifically for ICGC ARGO purposes using the following rules:

- These identifiers should not be derived from biobank or hospital identifiers or any other personal identifying information. These IDs are to be coded in such a way that they cannot be tracked back to the individual donors, except by the submitting program. Only the program will keep the key that will permit the data to be linked back to the individual donors. This key must not be communicated to the data users.
- Identifiers are assigned by each submitting program and must be unique within all the data submitted by that program (no duplicate IDs allowed).
- Identifiers referring to the same entity should be consistent across separate program submissions and should not be re-used for different entities. For example, the same donor should not be assigned different identifiers in different files or subsequent data submissions.
- Identifiers cannot begin with DO, SP, SA, PD, TR or FU. These prefixes are reserved for ICGC ARGO IDs.
- Identifiers are case-sensitive.

### Primary Diagnosis, Treatment and Follow Up Identifiers:

These identifier fields allow for linking across the different clinical events and should be coded using the following rules:

- Each primary diagnosis should be assigned a unique `submitter_primary_diagnosis_id`, so in the case where a donor has multiple primary diagnoses, each primary diagnosis should have a different `submitter_primary_diagnosis_id`. You will be required to submit the `submitter_primary_diagnosis_id` in the `Specimen` file - this provides information about which primary diagnosis the specimen is linked to. The `submitter_primary_diagnosis_id` is also required in the `Treatment` file, so it is understood which primary diagnosis the treatment is being administered for.
- Each treatment regimen in the `Treatment` file should be assigned a unique `submitter_treatment_id`. If the treatment regimen consists of chemotherapy, hormone therapy or radiation therapy, then you will use the same `submitter_treatment_id` in the appropriate `Chemotherapy`, `Radiation` or `Hormone Therapy` files. For example, a treatment regimen consisting of Chemotherapy and Radiation therapy is assigned `cr01` as the `submitter_treatment_id` in the `Treatment` file. You would then submit the relevant clinical treatment information in the `Chemotherapy` and `Radiation` files using the same `submitter_treatment_id` (`cr01`) in those files. This allows the information in the two files to be linked together so it is understood that the two therapies were combined.
- Each follow up should be assigned a unique `submitter_follow_up_id`. Optionally, if a follow up is linked to a specific treatment, you may include the `submitter_treatment_id` for that follow up.

### Time Intervals

To prevent potential identification of donors, actual calendar dates are not permitted. The timing of different clinical events are collected in days counted from the date of primary diagnosis. The date of primary diagnosis is the date on which a definitive diagnostic procedure was performed. Validation checks are in place to ensure the values submitted for the different time interval fields make sense according to the following assumptions:

- The `age_at_primary_diagnosis` is used as the reference time point.
- The day the patient dies is the clinical endpoint (`survival_time`).

Examples of time interval validation checks:

- If a patient's `vital_status` is `Deceased`, all time intervals must be less than or equal to `survival_time`.
- The `relapse_interval` must be less than the `interval_of_followup` in the follow up entry that the relapse was recorded.
- If a follow up is associated with a particular treatment (via the `submitter_treatment_id`), the `interval_of_followup` must be greater than the `treatment_start_interval`.


### Donors Older than 90 years old

Since the occurrence of individuals over the age of 90 is rare, it is therefore considered a potentially identifiable value. Thus, the allowed value for the `age_at_diagnosis` field is capped at 90.


## Cross Field Validations

A number of cross-field consistency checks within files are implemented to ensure quality control and data correctness. This requires the value of another field to validate the current field. The cross-field validation checks are implemented using Javascript. For the advanced user, you will be able to see the actual cross-field validation scripts in the Dictionary Viewer by clicking on the `View Script` buttons in the notes column. Examples include:

- Criteria for staging fields are dependent on the selected `clinical_staging_system`.
- Submitted `tumour_grade` is checked against selected `tumour_grading_system`.
- Valid values for `specimen_type` are cross-checked with the `tumour_normal_designation` field.
- The requirement for fields related to relapse/recurrence are dependent on the `disease_status_at_followup` field.
- The requirement for `survival_time` is depenedent on the `vital_status` field.


## Cross File Validations

Relationships between different clinical fields across files are validated to ensure data integrity and correctness. This requires checking the existence and relationships of different identifiers in different files, and checking the value of a field in another file to validate the current field or enforce supplemental file requirements. Examples include:

- A `submitter_sample_id` must belong to only one `submitter_specimen_id`. A `submitter_specimen_id` must belong to only one `submitter_donor_id`.
- A `submitter_donor_id` or `submitter_specimen_id` submitted in any of the clinical submission files must have been submitted in the `Sample Registration` file.
- A `submitter_specimen_id` in the `Specimen` file must belong to a registered `submitter_donor_id` in the `Sample Registration` file.
- A `submitter_primary_diagnosis_id` in the `Treatment`, `Specimen` or `Follow Up` file must have been submitted using the `Primary Diagnosis` file.
- A `submitter_treatment_id` in the `Follow Up` file must have been submitted using the `Treatment` file.
- The value of a specimen's `tumour_normal_designation` field in the `Sample Registration` file is checked to determine whether fields in the `Specimen` file are required.
- If `survival_time` is submitted in the `Donor` file, all time interval fields are validated to ensure they are less than or equal to the `survival_time`.
- Depending on the `treatment_type` selected in the Treatment file, additional treatment details may be required to be submitted. For example, if `treatment_type` includes `Chemotherapy`, the supplemental `Chemotherapy` treatment file is required. 


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
