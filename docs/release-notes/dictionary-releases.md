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
## Release 1.11

**Release Date:** July 21, 2021

### Updates

A **new** clinical table has been added to the dictionary along with the file template downloads for submission:
1. **Biomarker**: The collection of data elements describing a donor's biomarker tests. A biomarker is a biological molecule found in blood, other body fluids, or tissues that is indicative of the presence of cancer in the body.


### Bug Fixes
- If `survival_time` field is submitted,then all other interval times should be less than that.  The  `treatment.treatment_start_interval` and `folowup.interval_of_followup` fields are now being validated correctly against this rule. 

## Release 1.10

**Release Date:** June 08, 2021

### Updates

Two **new** clinical tables have been added to the dictionary along with the file template downloads for submission:
1. **Exposure**: A donor's clinically relevant information not immediately resulting from genetic predispositions (e.g diet, drug use, smoking).

2. **Comorbidity**: A donor's comorbidities are any medical condition that has existed or may occur during the clinical course of the donor who has the index disease under study (e.g diabetes, prior cancer malignancies).

### Bug Fixes
- `immuotherapy.immunotherapy_type` was not marked as a required field. It is now correctly identified. 
- `follow_up.anatomic_site_progression_or_recurrences` was misnamed as a plural field; it has been corrected to `follow_up.anatomic_site_progression_or_recurrence`.


## Release 1.9

**Release Date:** May 10, 2021

### Updates
- Integer fields now all contain validation based on the acceptable ranges allowed for those fields. 
- `primary_site` now accepts multiple values.
- Optional clinical fields detailing genetic disorders, hormone replacement therapy and contraception details have been added to the `Donor`  file. 
- Validation was added to ensure that hematological_toxicity is only included for hematological toxicity types and non-hematological_toxicity is only included for non-hematological toxicity types: 

| toxicity_type | hematological_toxicity | non-hematological_toxicity |
|--|--|--|
| Hematological | Allowed to be submitted | Should not be submitted |
| Non-hematological | Should not be submitted | Allowed to be submitted |

- Validation was added to ensure that if a treatment has been marked as the `primary_treatment`, it is not assigned an advanced `line of treatment`:

|is_primary_treatment | line_of_treatment |
|--|--|
| No | Allowed to have a value |
| Yes or Unknown | Should be left empty |
### Bug Fixes
- Some fields/permissible values in the treatment table containing the word `hematological` were misspelled `hemotological`. These have all been resolved. 
- `height`, `weight` and `bmi` can now be submitted as decimal values. 

## Release 1.8

**Release Date:** April 27, 2021

### Updates
Two **new** clinical tables have been added to the dictionary and the file template downloads for submission:
1. **Immunotherapy**: For treatment regimens that include immunotherapy, these details can now be submitted.  Similar to the `chemotherapy` and `hormone_therapy`, `immunotherapy` drugs are recorded using the standardized vocabulary from the [RxNorm database](https://www.nlm.nih.gov/research/umls/rxnorm), provided by the NIH. 

2. **Family History**: A donor's familial relationships and familial cancer history. 

The following updates are also included:
- Validation has been added so that when the `treatment_type = No Treatment`, non-applicable core fields do not need to be submitted. 

### Bug Fixes
- Previously missing stage groups `Stage IVE` and `Stage IVS` for Ann Arbor staging system has been added, as well as adding support for the `Stage II bulky` for the Lugano staging system. 

- In the `primary_diagnosis` table, there was a misleading combination of fields indicating the status/number of lymph nodes examined during clinical diagnosis. When the `number_lymph_nodes_examined` is left blank, a value of 0 for `number_lymph_nodes_positive` could be misinterpreted as several things: 
  - an unknown number of lymph nodes were tested or
  - none were found to be positive for cancer or 
  - no lymph nodes were examined.

 To make this more accurate to clinical use cases, a new field `lymph_nodes_examined_status` has been added to indicate  if lymph nodes were examined.  Depending on the status, the required `number_of_lymph_nodes_examined` and `number_of_lymph_nodes_positive` can now accurately reflect clinical use cases. For example: 

|lymph_nodes_examined_status|number_lymph_nodes_examined|number_lymph_nodes_positive|
|----|-----|-----|
|Yes|Optional: If left blank, this means unknown/missing. If number is submitted, it must be greater than 0|Required: If number_lymph_nodes_examined is > 0, then number_lymph_nodes_positive >= number_lymph_nodes_examined |
|No | 0 or left blank | Should be left blank |
|Not applicable | 0 or left blank | Should be left blank |
|No lymph nodes found in resected specimen | 0 or left blank | Should be left blank |
| Cannot be determined | 0 or left blank | Should be left blank |

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
