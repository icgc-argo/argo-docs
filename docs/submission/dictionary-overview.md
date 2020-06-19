---
id: dictionary-overview
title: Data Dictionary
platform_key: DOCS_DICTIONARY_OVERVIEW
---

The ICGC ARGO [Data Dictionary](/dictionary) expresses the details of the ARGO data model, which adheres to specific formats and restrictions to ensure a standard of data quality. The Data Dictionary defines a set of files, each related to a clinical concept, that can be submitted to the ARGO Data Platform.

For recent updates, check the [Dictionary Release Notes](/docs/release-notes/dictionary-releases).

## Understanding the Data Dictionary

The [dictionary table view](/dictionary) lists all of the clinical fields that the ARGO Data Platform accepts, separated by clinical TSV file.

Field listings can be filtered by Data Tier and Attribute, which can help identify which fields are necessary for [clinical data completion](/docs/submission/clinical-data-validation-rules).

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

![Core](/assets/submission/dictionary-core.svg) classification indicates:

- Field is part of the mandatory minimum set of clinical data that must be submitted.
- When paired with the `Conditional` attribute, this field is only required if conditional requirements are met.

The set of core clinical fields were defined by the [Tissue & Clinical Annotations Working Group](http://www.icgc-argo.org/page/84/tissue-clinical-annotation-working-group) which involved regular discussions with members of the working group and ARGO Programs. Core clinical fields are commonly acquired in cohort-based studies and clinical trials and are required to address clinically relevant topics by cross entity analyses, and therefore constitute a critical element in the analysis of diverse ARGO Programs.

![Extended](/assets/submission/dictionary-extended.svg) classification indicates:

- Field is not required for clinical data completion.
- It is _strongly encouraged_ to provide as many extended fields as possible.

### Permissible Values

- Some fields will only accept certain values from a list of controlled terminology that is provided in the permissible values column of the dictionary tables. Values must match the dictionary spelling exactly, but can be submitted case-insensitive.

- Other fields must meet a regular expression for their value.

## Dictionary Standards Used

The dictionary controlled terminology values were derived from external standards or common terminology used by ICGC ARGO programs. These include:

- [American Joint Committee on Cancer Staging Classifications](https://cancerstaging.org/references-tools/deskreferences/Pages/Cancer-Staging-Forms.aspx)
- [World Health Organization International Classification of Diseases, 10th Revision (ICD-10)](https://icd.who.int/browse10/2019/en)
- [International Classification of Diseases for Oncology (ICD-O))](http://www.iacr.com.fr/index.php?option=com_content&view=category&layout=blog&id=100&Itemid=577)
- [Cancer Data Standards Registry and Repository (caDSR)](https://cdebrowser.nci.nih.gov/cdebrowserClient/cdeBrowser.html#/search)
- [Cancer Care Ontario Data Book Reporting Standards](https://www.cancercareontario.ca/en/data-book-reporting-standards)
- [RxNorm](https://www.nlm.nih.gov/research/umls/rxnorm/index.html)
- [Common Terminology Criteria for Adverse Events (CTCAE)](https://ctep.cancer.gov/protocolDevelopment/electronic_applications/ctc.htm)
- [ECOG-ACRIN Cancer Research Group](https://ecog-acrin.org/resources/ecog-performance-status)
 

## Tumour Staging Classifications

### Revised International staging system (RISS)

| Stage | Description |
|-------|-------------|
| Stage I | Serum β2-microglobulin <3.5 mg/L and serum albumin ≥3.5 g/dL and no high-risk cytogenetics and Normal LDH |
| Stage II | Not stage I or III |
| Stage III | Serum β2-microglobulin ≥5.5 mg/L and high-risk cytogenetics and/or high LDH |
Reference: [https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4846284/](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4846284/)


### Lugano Staging System

| Stage | Description |
|-------|-------------|
| Stage I | Involvement of a single lymphatic site (i.e., nodal  region, Waldeyer’s ring, thymus, or spleen)
| Stage IE | Single extralymphatic site in the absence of nodal  involvement (rare in Hodgkin lymphoma)
| Stage II | Involvement of two or more lymph node regions  on the same side of the diaphragm
| Stage IIE | Contiguous extralymphatic extension from a  nodal site with or without involvement of other  lymph node regions on the same side of the  diaphragm
| Stage III | Involvement of lymph node regions on both sides  of the diaphragm; nodes above the diaphragm  with spleen involvement
| Stage IV | Diffuse or disseminated involvement of one or  more extralymphatic organs, with or without  associated lymph node involvement; or noncontiguous extralymphatic organ involvement in conjunction with nodal Stage II disease or any extralymphatic organ involvement in nodal Stage III disease.  Stage IV includes any involvement of the CSF, bone marrow, liver, or multiple lung lesions (other than by direct extension in Stage IIE disease).

Note: Hodgkin lymphoma uses A or B designation with stage group.  A/B is no longer used in NHL

| Suffix | Description |
|--------|-------------|
| A | Asymptomatic (No B symptoms) |
| B | Any B symptom(s): <ul><li>Fevers. Unexplained fever with temperature above 38°C.</li><li>Night sweats. Drenching sweats (e.g., those that require change of bed clothes).</li><li>Weight loss. Unexplained weight loss of more than 10% of the usual body weight in the 6 months prior to diagnosis</li></ul> |
Reference: Amin, Mahul B.. AJCC Cancer Staging Manual, Eighth Edition (p. 981). American College of Surgeons.


### St. Jude Children's Research Hospital Staging System

| Stage | Description |
|-------|-------------|
| Stage I | A single tumour (extranodal) or single anatomic area  (nodal), with the exclusion of the mediastinum or abdomen |
| Stage II | A single tumour (extranodal) with regional node involvement  Two or more nodal areas on the same side of the diaphragm  Two single (extranodal) tumours with or without regional  node involvement on the same side of the diaphragm  A primary gastrointestinal tract tumour, usually in the  ileocecal area, with or without involvement of associated  mesenteric nodes only |
| Stage III | <ul><li>Two single tumours (extranodal) on opposite sides of the  diaphragm.</li><li>Two or more nodal areas above and below the diaphragm.</li><li>All the primary intrathoracic tumours (mediastinal, pleural, and thymic).</li><li>All extensive primary intra-abdominal disease.</li><li> All paraspinal or epidural tumours, regardless of other tumour site(s)</li></ul> |
| Stage IV | Any of the above with initial CNS and/or bone marrow  involvement |
Reference: [https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4461808/](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4461808/)


### Ann Arbor Staging Classification for Hodgkin Lymphoma

| Stage | Description |
|-------|-------------|
| Stage I | Involvement of a single lymphatic site (i.e., nodal region, Waldeyer's ring, thymus, or spleen) (I); or localized involvement of a single extralymphatic organ or site in the absence of any lymph node involvement (IE). |
| Stage II | Involvement of two or more lymph node regions on the same side of the diaphragm (II); or localized involvement of a single extralymphatic organ or site in association with regional lymph node involvement with or without involvement of other lymph node regions on the same side of the diaphragm (IIE). |
| Stage III | Involvement of lymph node regions on both sides of the diaphragm (III), which also may be accompanied by extralymphatic extension in association with adjacent lymph node involvement (IIIE) or by involvement of the spleen (IIIS) or both (IIIE,S). |
| Stage IV | Diffuse or disseminated involvement of one or more extralymphatic organs, with or without associated lymph node involvement; or isolated extralymphatic organ involvement in the absence of adjacent regional lymph node involvement, but in conjunction with disease in distant site(s). Stage IV includes any involvement of the liver or bone marrow, lungs (other than by direct extension from another site), or cerebrospinal fluid. |

| Suffix | Description |
|--------|-------------|
| A | No symptoms. |
| B | Fever (temperature >38.0ºC), drenching night sweats, unexplained loss of >10% of body weight within the preceding 6 months. |
| E | Involvement of a single extranodal site that is contiguous or proximal to the known nodal site. |
| S | Splenic involvement. |
Reference: [https://www.ncbi.nlm.nih.gov/books/NBK65726/table/CDR0000062933__557/](https://www.ncbi.nlm.nih.gov/books/NBK65726/table/CDR0000062933__557/)


### Rai Staging System

| Stage | Description |
|-------|-------------|
| Stage 0 | Lymphocytosis (high blood count of lymphocytes) and no enlargement of the lymph nodes, spleen, or liver, and with near normal red blood cell and platelet counts. |
| Stage I | Lymphocytosis plus enlarged lymph nodes. The spleen and liver are not enlarged and the red blood cell and platelet counts are normal or only slightly low. |
| Stage II | Lymphocytosis plus an enlarged spleen (and possibly an enlarged liver), with or without enlarged lymph nodes. The red blood cell and platelet counts are normal or only slightly low |
| Stage III | Lymphocytosis plus anemia (too few red blood cells), with or without enlarged lymph nodes, spleen, or liver. Platelet counts are near normal.|
| Stage IV | Lymphocytosis plus thrombocytopenia (too few platelets), with or without anemia, enlarged lymph nodes, spleen, or liver. |
Reference: [CLL Society, Inc. Rai Staging of CLL (chronic lymphocytic leukemia).](https://cllsociety.org/2016/03/rai-staging-cll-chronic-lymphocytic-leukemia/)


### Durie-Salmon Staging System

| Stage | Description |
|-------|-------------|
| Stage 1 | All of the following: <ul><li>Hemoglobin value > 10 g/dl</li><li>Serum calcium value normal or <10.5 mg/dL</li><li>Bone X-ray, normal bone structure (scale 0), or solitary bone plasmactyoma only</li><li>Low M-component production rates IgG value < 5g/dL; IgA value < 3 g/dL</li><li>Urine light chain M-component on electrophoresis < 4 g/24h</li></ul> |
| Stage II | Fitting neither Stage I nor Stage III |
| Stage III | One or more of the following: <ul><li>Hemoglobin value < 8.5 g/dL</li><li>Serum calcium value > 12 mg/dL</li><li>Advanced lytic bone lesions (scale 3)</li><li>High M-component production rates IgG value > 7 g/dL; IgA value > 5 g/dL</li><li>Urine light chain M-component > 12 g/24h</li></ul> |
Reference: [https://www.myeloma.org/durie-salmon-staging](https://www.myeloma.org/durie-salmon-staging)


### FIGO Staging of Cervical Carcinomas

| Stage | Description |
|-------|-------------|
| Stage IA | Invasive cancer identified only microscopically. Invasion is limited to measured stromal invasion with a maximum depth of 5 mm and no wider than 7 mm. |
| Stage IA1 | Measured invasion of the stroma no greater than 3 mm in depth and no wider than 7 mm diameter.|
| Stage IA2 | Measured invasion of stroma greater than 3 mm but no greater than 5 mm in depth and no wider than 7 mm in diameter.|
| Stage IB | Clinical lesions confined to the cervix or preclinical lesions greater than Stage IA. All gross lesions even with superficial invasion are Stage IB cancers.|
| Stage IB1 | Clinical lesions no greater than 4 cm in size.|
| Stage IB2 | Clinical lesions greater than 4 cm in size.|
| Stage IIA | No obvious parametrial involvement. Involvement of up to the upper two-thirds of the vagina.|
| Stage IAB | Obvious parametrial involvement, but not into the pelvic sidewall.|
| Stage IIIA | No extension into the pelvic sidewall but involvement of the lower third of the vagina.|
| Stage IIIB | Extension into the pelvic sidewall or hydronephrosis or non-functioning kidney.|
| Stage IVA | Spread of the tumour into adjacent pelvic organs.|
| Stage IVB | Spread to distant organs.|
Reference: [https://screening.iarc.fr/viaviliappendix1.php](https://screening.iarc.fr/viaviliappendix1.php)

### Binet Staging System

| Stage | Description |
|-------|-------------|
| Stage A | Fewer than 3 groups of enlarged lymph nodes (lymphadenopathy) and a high white blood cell count |
| Stage B | More than 3 groups of enlarged lymph nodes and a high white blood cell count 
| Stage C | Enlarged lymph nodes or spleen, a high white blood cell count, and low red blood cell or platelet counts |
Reference: Amin, Mahul B.. AJCC Cancer Staging Manual, Eighth Edition (p. 975). American College of Surgeons.


## Tumour Grading Classifications


### Two-tier Grading System

| Grade |
|-------|
| Low grade |
| High grade | 
Reference: Reference: Amin, Mahul B.. AJCC Cancer Staging Manual, Eighth Edition


### Three-tier Grading System

| Grade | Definition |
|-------|------------|
| GX | Cannot be assessed |
| G1 | Well differentiated |
| G2 | Moderately differentiated |
| G3 | Poorly differentiated, undifferentiated |
Reference: Reference: Amin, Mahul B.. AJCC Cancer Staging Manual, Eighth Edition


### Four-tier Grading System

| Grade | Definition |
|-------|------------|
| GX | Grade cannot be assessed |
| G1 | Well differentiated |
| G2 | Moderately differentiated |
| G3 | Poorly differentiated |
| G4 | Undifferentiated |
Reference: Reference: Amin, Mahul B.. AJCC Cancer Staging Manual, Eighth Edition


### Grading for Gastrointestinal Stromal Tumours (GISTs)
	
| Mitotic Rate | Definition |
|--------------|------------|
| Low | 5 or fewer mitoses per 5 mm2|
| High | Over 5 mitoses per 5 mm2 |
Reference: Amin, Mahul B.. AJCC Cancer Staging Manual, Eighth Edition (p. 546). American College of Surgeons.


### Grading System for GNETs

| Grade | Definition |
|-------|------------|
| GX | Grade cannot be assessed |
| G1 | Mitotic count (per 10 HPF) < 2 and Ki-67 index (%) < 3 |
| G2 | Mitotic count (per 10 HPF) = 2–20 or Ki-67 index (%) =  3–20 |
| G3 | Mitotic count (per 10 HPF) > 20 or Ki-67 index (%) >  20 |
Reference: Amin, Mahul B.. AJCC Cancer Staging Manual, Eighth Edition (p. 374). American College of Surgeons.


### ISUP Grading System
	
| Grade | Definition |
|-------|------------|
| GX | Grade cannot be assessed |
| G1 | Nucleoli absent or inconspicuous and basophilic at 400x  magnification |
| G2 | Nucleoli conspicuous and eosinophilic at 400x magnification,  visible but not prominent at 100x magnification |
| G3 | Nucleoli conspicuous and eosinophilic at 100x magnification |
| G4 | Marked nuclear pleomorphism and/or multinucleate giant  cells and/or rhabdoid and/or sarcomatoid differentiation |
Reference: Amin, Mahul B.. AJCC Cancer Staging Manual, Eighth Edition (p. 771). American College of Surgeons.


### Nuclear Grading System for DCIS

| Grade | Definition |
|-------|------------|
| GX | Grade cannot be assessed |
| G1 | Low nuclear grade |
| G2 | Intermediate nuclear grade |
| G3 | High nuclear grade |
Reference: Amin, Mahul B.. AJCC Cancer Staging Manual, Eighth Edition (p. 641). American College of Surgeons. 


### FNCLCC Grading System

| Grade | Definition |
|-------|------------|
| GX | Grade cannot be assessed |
| G1 | Total differentiation, mitotic count and necrosis score of 2 or 3 |
| G2 | Total differentiation, mitotic count and necrosis score of 4 or 5 |
| G3 | Total differentiation, mitotic count and necrosis score of 6, 7, or 8 |
References: [https://academic.oup.com/jjco/article/49/2/103/5179391](https://academic.oup.com/jjco/article/49/2/103/5179391)
Amin, Mahul B.. AJCC Cancer Staging Manual, Eighth Edition (p. 564). American College of Surgeons.


### Scarff–Bloom–Richardson (SBR) Grading System

| Grade | Definition |
|-------|------------|
| GX | Grade cannot be assessed |
| G1 | Low combined histologic grade (favorable), SBR score  of 3–5 points |
| G2 | Intermediate combined histologic grade (moderately  favorable); SBR score of 6–7 points |
| G3 | High combined histologic grade (unfavorable); SBR  score of 8–9 points |
Reference: Amin, Mahul B.. AJCC Cancer Staging Manual, Eighth Edition (p. 652). American College of Surgeons.


### WHO Grading System for CNS Tumours

| Grade | Definition |
|-------|------------|
| Grade I | Circumscribed tumours of low proliferative potential associated with the possibility of cure following resection |
| Grade II | Infiltrative tumours with low proliferative potential with increased risk of recurrence |
| Grade III | Tumours with histologic evidence of malignancy, including nuclear atypia and mitotic activity, associated with an aggressive clinical course |
| Grade IV | Tumours that are cytologically malignant, mitotically active, and associated with rapid clinical progression and potential for dissemination |
Reference: Amin, Mahul B.. AJCC Cancer Staging Manual, Eighth Edition (p. 894). American College of Surgeons.

### Gleason Grade Group System

| Grade Group | Gleason score and pattern |
|-------------|---------------------------|
| Group 1 | ≤6	(≤3+3) |
| Group 2 | 7 (3+4) |
| Group 3 | 7 (4+3) |
| Group 4 | 8 (4+4, 3+5 or 5+3) |
| Group 5 | 9 or 10 (4+5, 5+4, or 5+5) |

References: Amin, Mahul B.. AJCC Cancer Staging Manual, Eighth Edition (p. 751). American College of Surgeons.
[http://pathology.jhu.edu/ProstateCancer/NewGradingSystem.pdf](http://pathology.jhu.edu/ProstateCancer/NewGradingSystem.pdf)



