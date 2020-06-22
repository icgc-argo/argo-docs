---
id: faq
title: Frequently Asked Questions
sidebar_label: FAQs
platform_key: DOCS_FAQ
---

1. How do I submit multiple values for a field? For example, I want to submit multiple symptoms for the `presenting_symptoms` field.

   When permitted, you can submit multiple values separated with a pipe delimiter '|'. For example: `Anemia|Fatigue|Fever`. Fields that allow multiple values will have these instructions specified in the notes section of the data dictionary.

2. Is there any resource to refer to for staging guidelines?

   Please refer to the guidelines provided by the [AJCC Cancer Staging](https://cancerstaging.org/Pages/default.aspx) website. Another helpful resource is the [CAnswer Forum](http://cancerbulletin.facs.org/forums/).

3. The `tumour_staging_system` field does not contain the staging system I use. Can we request the staging system be added?

   Yes, if the tumour staging system or tumour grading system you use is not included in the controlled terminology for `tumour_staging_system` or `tumour_grading_system`, please [contact us](https://platform.icgc-argo.org/contact) to request it be added.

4. What assembly version do you use?

   ICGC ARGO uses the [GRCh38 Human Reference Genome](https://www.ncbi.nlm.nih.gov/assembly/GCF_000001405.26/).

5. I'm having trouble formatting my clinical submission TSV files in Excel. Do you have any tips on getting the formatting correct?

    Please refer to the [Tips for Formatting TSV files](https://docs.icgc-argo.org/docs/submission/submitting-clinical-data#tips-for-formatting-tsv-files) section.

6. I'm interested in applying the script validations on our data. Where do I find them?

   If a script validation is applied to a clinical field, you can find it in the "Notes & Scripts" column. Click on the "View Script" button to access the script validation written in Javascript.

7. How do I contact you?

   You can send us your questions or comments through our contact page at [https://platform.icgc-argo.org/contact](https://platform.icgc-argo.org/contact).
