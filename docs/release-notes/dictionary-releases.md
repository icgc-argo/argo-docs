---
id: dictionary-releases
title: Dictionary Releases
---

A dictionary release happens when there has been an update to the clinical dataset in the **[ARGO Data Dictionary](/dictionary)**. Dictionary releases happen whenever needed.

<!---
## Dictionary Release

**Release Date:**

### Updates

Coming soon.

### Bug Fixes

None to report.

------>

## Release 1.17

**Release Date: May 11, 2023**

#### Updates

- Updated `anatomic_site_progression_or_recurrence` field in Follow Up table to accept multiple values.
- Added new permissible term (`Tumour - unknown if derived from primary or metastatic`) to `specimen_type` field in Sample Registration table.
- Added new required core field `percent_tumour_cells_measurement_method` in Specimen table.
- Fixed minor bug in validation script for existing `lymph_nodes_examined_method` field in Primary Diagnosis table.

## Release 1.16

**Release Date: January 5, 2023**

#### Updates

- Added new term `Unknown primary site` to the controlled terminology for the `primary_site` field in the Donor table.
- Added 6 new terms (`Supportive`, `Diagnostic`, `Preventative`, `Guidance`, `Screening`, `Forensic`) to the controlled terminology for the `treatment_intent` field in the Treatment table.
- Added 8 new terms (`Conditioning`, `Induction`, `Locally advanced`, `Maintenance`, `Mobilization`, `Preventative`, `Radiosensitization`, `Salvage`) to the controlled terminology for the `treatment_setting` field in the Treatment table. The term `Not applicable` was removed. If required, programs will need to apply for a clinical exception.
- Removed `Unknown` from `is_primary_treatment` field. If required, programs will need to apply for a clinical exception.
- Added a new required `response_to_treatment_criteria_method` field in the Treatment table. This field consists of a list of response criteria methods, in addition to RECIST.
- Added new terms for response criteria in the `response_to_treatment` field in the Treatment table. The value submitted in this field will be validated against the `response_to_treatment_criteria_method` field to ensure the correct response criteria term is submitted.
- Added a new required `lymph_nodes_examined_method` field in the Primary Diagnosis table.
- Updated validation to permit the `pathological_m_category` field in the Specimen table to be submitted as "Not applicable" if AJCC 7th or 8th editions used.
- Changed data tier for the `recurrence_tumour_staging_system` field in the Follow Up table so it is no longer a core field.
- Updated foreignKey attribute for ID fields in the Specimen, Treatment, Follow up and Biomarker tables.
- Added new `prescribed_cumulative_drug_dose` field and renamed existing `cumulative_drug_dose` field to `actual_cumulative_drug_dose` in the Chemotherapy and Hormone Therapy tables. Added new fields for `prescribed_cumulative_drug_dose` and `actual_cumulative_drug_dose` in the Immunotherapy table. Either field can be submitted. Replaced `dosage` with `dose` for consistency purposes.
- Corrected term `Revised International staging system (RISS)` in the tumour_staging_system fields to `R-ISS` instead of `RISS`.

## Release 1.15

**Release Date: September 23, 2022**

#### Updates

- Added four new terms ('Hemithyroidectomy', 'Near-total thyroidectomy', 'Subtotal thyroidectomy' and 'Total thyroidectomy') to the controlled terminology for the `surgery_type` field in the Surgery table.

## Release 1.14

**Release Date: June 16, 2022**

#### Updates

A new clinical table has been added to the dictionary along with the file template download for submission:

1. **Surgery**: The collection of data elements related to a donor's surgical treatment at a specific point in the clinical record. For treatment regimens that include surgery, these details can now be submitted in this table. Refer to [Submitting data in Surgery file](/docs/submission/submitting-clinical-data#submitting-data-in-surgery-file) documentation for guidelines on how to submit clinical data in this table.

The following updates are also included:

- Addition of 'Unknown' and 'Not applicable' terms to controlled terminology for extended clinical fields. Refer to [Submitting Missing Values for Extended Clinical Fields](/docs/submission/clinical-data-validation-rules#submitting-missing-values-for-extended-clinical-fields) documentation on how to submit these values.
- Added new term ("Oral contraceptive pill") to controlled terminology for contraception_type field.
- Corrected Data Tier for family_relative_id to 'ID'.

## Release 1.13

**Release Date: November 17, 2021**

#### Updates

- The "AJCC 6th Edition" has been added to the controlled terminology for tumour staging systems. This will allow data submitters to submit TNM categories and stage groups for the AJCC 6th Edition.
- Optional clinical fields related to dose intensity reduction have been added to the Chemotherapy table. These include `dose_intensity_reduction`, `dose_intensity_reduction_event` and `dose_intensity_reduction_amount`.
- Optional clinical fields related to laterality have been added. These include the `laterality` field in the Primary Diagnosis table and the `specimen_laterality` field in the Specimen table.
- Removed the term "Unknown" from the controlled terminology of the core `vital_status` clinical field so it is consistent with other core clinical fields.
- Updated notes to clarify requirements for certain fields:
  - Added clarification about why the comorbidity_type_code field is "Conditional".
  - Updated description of age_at_menarche field to indicate it should be submitted in years.
  - Updated notes for number_lymph_nodes_examined field to indicate it is only required if lymph_nodes_examined_status is 'Yes'.
  - Updated notes for percent_proliferating_cells, percent_inflammatory_tissue, percent_stromal_cells and percent_necrosis fields in the Specimen table to indicate that they should only be submitted if the specimen is tumour.
  - Added clarification on how to submit fields in Biomarker table.
- Changed `radiation_therapy_dosage` to accept number instead of integer.
- Updated controlled terminology for `anatomical_site_irradiated`.

#### Bug fixes:

- Added `sample_registration` file to download templates from Dictionary Viewer page

## Release 1.12

**Release Date:** September 02, 2021

#### Updates

- According to AJCC Guidelines 8th Ed. if TX or NX categories are used, such cases usually cannot be assigned a stage group. In such a case, the data submitter will be allowed to submit "Cannot be assessed" for the `stage_group` field. However, there are exceptions according to the guidelines as follows:

  - Stage may be assigned when the TNM stage group results in Any T or Any N with M1, which includes TX or NX e.g. (`TX NX M1`, or `TX N3 M1`). These are classified as Stage IV.

  - Stage may be assigned when the TNM stage group results in Any T or Any N with M0, which includes TX or NX e.g. (`TX N1 M0` Stage III in melanoma clinical stage or `T4 NX M0` Stage III in pancreas).

- Added `pipe` as a term to `exposure.tobacco_type` controlled terminology.

#### Bug Fixes

- An incorrect abbreviation used in a field name in the Biomarker table. The biomarker is related to lactate dehydrogenase (LDH), not low-density lipoprotein (LDL), thus `biomarker.ldl_level` was adjusted to `biomarker.ldh_level`.

## Release 1.11

**Release Date:** July 21, 2021

#### Updates

A **new** clinical table has been added to the dictionary along with the file template downloads for submission:

1. **Biomarker**: The collection of data elements describing a donor's biomarker tests. A biomarker is a biological molecule found in blood, other body fluids, or tissues that is indicative of the presence of cancer in the body.

#### Bug Fixes

- If `survival_time` field is submitted,then all other interval times should be less than that. The `treatment.treatment_start_interval` and `folowup.interval_of_followup` fields are now being validated correctly against this rule.

## Release 1.10

**Release Date:** June 08, 2021

#### Updates

Two **new** clinical tables have been added to the dictionary along with the file template downloads for submission:

1. **Exposure**: A donor's clinically relevant information not immediately resulting from genetic predispositions (e.g diet, drug use, smoking).

2. **Comorbidity**: A donor's comorbidities are any medical condition that has existed or may occur during the clinical course of the donor who has the index disease under study (e.g diabetes, prior cancer malignancies).

#### Bug Fixes

- `immuotherapy.immunotherapy_type` was not marked as a required field. It is now correctly identified.
- `follow_up.anatomic_site_progression_or_recurrences` was misnamed as a plural field; it has been corrected to `follow_up.anatomic_site_progression_or_recurrence`.

## Release 1.9

**Release Date:** May 10, 2021

#### Updates

- Integer fields now all contain validation based on the acceptable ranges allowed for those fields.
- `primary_site` now accepts multiple values.
- Optional clinical fields detailing genetic disorders, hormone replacement therapy and contraception details have been added to the `Donor` file.
- Validation was added to ensure that hematological_toxicity is only included for hematological toxicity types and non-hematological_toxicity is only included for non-hematological toxicity types:

| toxicity_type     | hematological_toxicity  | non-hematological_toxicity |
| ----------------- | ----------------------- | -------------------------- |
| Hematological     | Allowed to be submitted | Should not be submitted    |
| Non-hematological | Should not be submitted | Allowed to be submitted    |

- Validation was added to ensure that if a treatment has been marked as the `primary_treatment`, it is not assigned an advanced `line of treatment`:

| is_primary_treatment | line_of_treatment       |
| -------------------- | ----------------------- |
| No                   | Allowed to have a value |
| Yes or Unknown       | Should be left empty    |

#### Bug Fixes

- Some fields/permissible values in the treatment table containing the word `hematological` were misspelled `hemotological`. These have all been resolved.
- `height`, `weight` and `bmi` can now be submitted as decimal values.

## Release 1.8

**Release Date:** April 27, 2021

#### Updates

Two **new** clinical tables have been added to the dictionary and the file template downloads for submission:

1. **Immunotherapy**: For treatment regimens that include immunotherapy, these details can now be submitted. Similar to the `chemotherapy` and `hormone_therapy`, `immunotherapy` drugs are recorded using the standardized vocabulary from the [RxNorm database](https://www.nlm.nih.gov/research/umls/rxnorm), provided by the NIH.

2. **Family History**: A donor's familial relationships and familial cancer history.

The following updates are also included:

- Validation has been added so that when the `treatment_type = No Treatment`, non-applicable core fields do not need to be submitted.

#### Bug Fixes

- Previously missing stage groups `Stage IVE` and `Stage IVS` for Ann Arbor staging system has been added, as well as adding support for the `Stage II bulky` for the Lugano staging system.

- In the `primary_diagnosis` table, there was a misleading combination of fields indicating the status/number of lymph nodes examined during clinical diagnosis. When the `number_lymph_nodes_examined` is left blank, a value of 0 for `number_lymph_nodes_positive` could be misinterpreted as several things:
  - an unknown number of lymph nodes were tested or
  - none were found to be positive for cancer or
  - no lymph nodes were examined.

To make this more accurate to clinical use cases, a new field `lymph_nodes_examined_status` has been added to indicate if lymph nodes were examined. Depending on the status, the required `number_of_lymph_nodes_examined` and `number_of_lymph_nodes_positive` can now accurately reflect clinical use cases. For example:

| lymph_nodes_examined_status               | number_lymph_nodes_examined                                                                            | number_lymph_nodes_positive                                                                                      |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| Yes                                       | Optional: If left blank, this means unknown/missing. If number is submitted, it must be greater than 0 | Required: If number_lymph_nodes_examined is > 0, then number_lymph_nodes_positive >= number_lymph_nodes_examined |
| No                                        | 0 or left blank                                                                                        | Should be left blank                                                                                             |
| Not applicable                            | 0 or left blank                                                                                        | Should be left blank                                                                                             |
| No lymph nodes found in resected specimen | 0 or left blank                                                                                        | Should be left blank                                                                                             |
| Cannot be determined                      | 0 or left blank                                                                                        | Should be left blank                                                                                             |

## Release 1.5

**Release Date:** December 11, 2020

The following updates are included:

- Removed ID prefix restriction and all notes referencing this restriction.

## Release 1.3

**Release Date:** November 24, 2020

The following updates are included:

- Changed Attribute for percent_proliferating_cells, percent_inflammatory_tissue, percent_stromal_cells and percent_necrosis fields from Required to Conditional.
- Updated description for cumulative_drug_dosage field to indicate that the actual drug dose should be submitted.
- Added two new terms ("Swelling in the Neck" and "Not Reported") to controlled terminology for presenting_symptoms field.

## Initial Dictionary Release 1.0

**Release Date:** June 19, 2020

ICGC ARGO is excited to announce its initial data dictionary release, established as the minimum set of clinical data elements that the ARGO Data Platform requires. This includes:

- Basic Donor, Specimen, and Sample data
- Donor clinical record information including Primary Diagnosis, Follow Up and Treatment data

Future releases will extend clinical data concepts and integrations of standard clinical data elements.
