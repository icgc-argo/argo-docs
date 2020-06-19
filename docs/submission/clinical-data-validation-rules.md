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

To prevent potential identification of donors, actual calendar dates are not permitted. The timing of different clinical events are collected in days counted from the date of primary diagnosis.

### Donors Older than 90 years old

Since the occurrence of individuals over the age of 90 is rare, it is therefore considered a potentially identifiable value. Thus, the allowed value for the `age_at_diagnosis` field is capped at 90.

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
