---
id: molecular-data-prep
title: Preparing and Validating Molecular Data
platform_key: DOCS_VALIDATING_MOLECULAR_DATA
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The ARGO DCC requires that necessary information describing molecular data files, called metadata, is be submitted at the same time as the molecular data to facilitate automated downstream analysis. This metadata is submitted to the ARGO metadata repository, called Song. 

## Preparing Molecular Metadata Payloads

### Understanding the payload fields

Molecular data is submitted in conjunction with metadata submitted in JSON format (called a payload), which is validated against JSON Schema to ensure data quality. The first step of submitting molecular data is to prepare the metadata payloads conforming to the most recent JSON schema that has been defined by the DCC.

- This is an example of a correctly formatted payload from a [normal sample](https://github.com/icgc-argo/argo-metadata-schemas/blob/master/example_payloads/dash1_normal.json).
- This is an example of a correctly formatted payload from a [tumour sample](https://github.com/icgc-argo/argo-metadata-schemas/blob/master/example_payloads/dash1_tumour.json).

Once the metadata has been prepared, both the payload and the molecular data files can be [submitted](/docs/submission/submitting-molecular-data) together. 


The metadata payload is broken down into 5 sections: `root level`, `experiment`, `samples`, `read groups` and `files`. Each section **must** be submitted in the payload.

:::note   
![Required](/assets/submission/dictionary-required.svg) indicates a required field that **must** be included in the payload or it will immediately fail submission.
:::

#### **Root level**
The root level of the sequencing_experiment payload contains important administrative information. The fields include:

| Payload Field    | Attribute                                               | Description                                                                                                                                                                 | Permissible Values    |
| ---------------- | ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| studyId          | ![Required](/assets/submission/dictionary-required.svg) | ARGO `Program ID`, the unique identifier of your program. If you have logged into the ARGO Data Platform, this is the Program ID that you see in the Program Services area. |                       |
| analysisType     | ![Required](/assets/submission/dictionary-required.svg) | The type of molecular data that is being submitted in the payload.                                                                                                          | sequencing_experiment |
| read_group_count | ![Required](/assets/submission/dictionary-required.svg) | The number of read groups in the molecular files being submitted submitted.                                                                                                                                  |

**Example root level portion of payload:**

```json
  "analysisType": {
    "name": "sequencing_experiment"
  },
  "studyId": "TEST-CA",
```

#### **Experiment:**

The experiment section contains details that are relevant to the experimental requirements imposed during sequencing. The fields include:

| Payload Field                        | Attribute                                               | Description                                                                                            | Permissible Values               |
| ------------------------------------ | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | -------------------------------- |
| submitter_sequencing\_ experiment_id | ![Required](/assets/submission/dictionary-required.svg) | The unique identifier of the sequencing experiment.                                                    |                                  |
| platform                             | ![Required](/assets/submission/dictionary-required.svg) | The sequencing platform type used in data generation.                                                  |CAPILLARY, LS454, ILLUMINA, SOLID, HELICOS, IONTORRENT, ONT, PACBIO, Nanopore, BGI|
| platform_model                       |                                                         | The model number of the sequencing machine used in data generation.                                    |                                  |
| experimental_strategy                | ![Required](/assets/submission/dictionary-required.svg) | The primary experimental method. For sequencing data it refers to how the sequencing library was made. | WGS, WXS, RNA-Seq, Bisulfite-Seq |
| sequencing_date                      |                                                         | Date sequencing was performed.                                                                         |

**Example experiment portion of payload:**

```json
  "experiment": {
    "submitter_sequencing_experiment_id": "EXP12345",
    "sequencing_center": "OICR",
    "platform": "ILLUMINA",
    "platform_model": "HiSeq 2000",
    "experimental_strategy": "WGS",
    "sequencing_date": "2014-12-12"
  }

```

#### **Samples:**

The sample section contains details of the clinical data and key sample descriptors related to the submitted files. In order to submit a payload, this data must be [registered](/docs/submission/registering-samples) in the ARGO Data Platform. For allowed values of all fields, please see the Sample Registration file of the [Data Dictionary](/dictionary).

If the data for a sample is different than what has been registered, metadata validation will fail immediately upon submission.

**Example samples portion of payload:**

```json

  "samples": [
    {
      "submitterSampleId": "HCC1143_SMP1",
      "matchedNormalSubmitterSampleId": "HCC1143_SMP2",
      "sampleType": "Total DNA",
      "specimen": {
        "submitterSpecimenId": "HCC1143_SPC1",
        "tumourNormalDesignation": "Tumour",
        "specimenTissueSource": "Solid tissue",
        "specimenType": "Primary tumour"
      },
      "donor": {
        "submitterDonorId": "HCC1143",
        "gender": "Female"
      }
    }
  ]
```

#### **Read Groups:**

The read group section contains details about the reads that were generated from a single run of a sequencing instrument lane. The number of `read_group` objects in the payload must meet the number specified in `read_group_count`, found in the main submission body. The fields include:

| Payload Field             | Attribute                                               | Description                                                                                                                                                                                                                                                                                                                                                                | Permissible Values |
| ------------------------- | ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| submitter_read\_ group_id | ![Required](/assets/submission/dictionary-required.svg) | The unique identifier of a read group; must be unique within each payload.                                                                                                                                                                                                                                                                                                 |                    |
| platform_unit             | ![Required](/assets/submission/dictionary-required.svg) | Unique identifier including the {FLOWCELL_BARCODE}.{LANE}.{SAMPLE_BARCODE}. The {FLOWCELL_BARCODE} refers to the unique identifier for a particular flow cell. The {LANE} indicates the lane of the flow cell and the {SAMPLE_BARCODE} is a sample/library-specific identifier. For non-multiplex sequencing, platform unit and read group have a one-to-one relationship. |                    |
| is_paired_end             | ![Required](/assets/submission/dictionary-required.svg) | Indicate if paired end sequencing was performed.                                                                                                                                                                                                                                                                                                                           | true, false        |
| file_r1                   | ![Required](/assets/submission/dictionary-required.svg) | Name of the sequencing file containing reads from the first end of a sequencing run.                                                                                                                                                                                                                                                                                       |                    |
| file_r2                   | ![Required](/assets/submission/dictionary-required.svg) | Name of the sequencing file containing reads from the second end of a paired end sequencing run. Required if and only if paired end sequencing was done.                                                                                                                                                                                                                   |                    |
| read_length_r1            |                                                         | Length of sequencing reads in `file_r1`; this corresponds to the number of sequencing cycles of the first end.                                                                                                                                                                                                                                                             |                    |
| read_length_r2            |                                                         | Length of sequencing reads in `file_r2`; this corresponds to the number of sequencing cycles of the second end.                                                                                                                                                                                                                                                            |                    |
| insert_size               | ![Required](/assets/submission/dictionary-required.svg) | For paired end sequencing, the average size of sequences between two sequencing ends. Required only for paired end sequencing.                                                                                                                                                                                                                                             |                    |
| sample_barcode            |                                                         | According to the SAM specification, this is the expected barcode bases as read by the sequencing machine in the absence of errors.                                                                                                                                                                                                                                         |                    |
| library_name              | ![Required](/assets/submission/dictionary-required.svg) | Name of a sequencing library made from a molecular sample or a sample pool (multiplex sequencing).                                                                                                                                                                                                                                                                         |                    |

Read Group Data Validations:

1. All `read_groups` in the payload and BAM header must belong to a single sample.
1. `platform_units` must be unique with a one-to-one relationship with `submitter_read_group_id`.
1. The total number of `read_group` objects must match the number specified in `read_group_count`.
1. For paired end sequencing, both `file_r1` and `file_r2` are required, otherwise, only `file_r1` is required (`file_r2` must not be populated).
1. For paired-end sequencing, `file_r1` and `file_r2` must not be the same file. 
1. For FASTQ submission, no file can appear more than once in `file_r1` or `file_r2` across read group objects.

**Example read groups portion of payload:**



Examples of correctly formatted `read groups` that meet these rules are shown here. 
<!---  Tabs start here -->

<Tabs
  defaultValue="BAM-paired"
  values={[
    { label: 'BAM (paired)', value: 'BAM-paired', },
    { label: 'BAM (single)', value: 'BAM-single', },
    { label: 'FASTQ (paired)', value: 'FASTQ-paired', },
    { label: 'FASTQ (single)', value: 'FASTQ-single', },
  ]
}>
<TabItem value="BAM-paired">

```json
  "read_group_count": 1,
  "read_groups": {
  	"read_group_id_in_bam": "C0HVY.2",
  	"submitter_read_group_id": "C0HVY.2",
  	"platform_unit": "74_8a",
  	"is_paired_end": true,
  	"file_r1": "test_rg3.bam",
  	"file_r2": "test_rg4.bam",
  	"read_length_r1": 150,
  	"read_length_r2": 16,
  	"insert_size": 232,
  	"sample_barcode": null,
  	"library_name": "Pond-147579"
  }
```

</TabItem>
<TabItem value="BAM-single">

```json
  "read_group_count": 1,
  "read_groups": {
    "read_group_id_in_bam": "C0HVY.2", 
    "submitter_read_group_id": "C0HVY.2",
    "platform_unit": "74_8a",
    "is_paired_end": true,
    "file_r1": "test_rg55.bam",
    "file_r2": null,
    "read_length_r1": 150,
    "read_length_r2": null,
    "insert_size": 232,
    "sample_barcode": null,
    "library_name": "Pond-147579"
  }
```

</TabItem>
<TabItem value="FASTQ-paired">

```json
  "read_group_count": 1,
  "read_groups": {
    "read_group_id_in_bam": null, 
    "submitter_read_group_id": "C0HVY.2",
    "platform_unit": "74_8b",
    "is_paired_end": true,
    "file_r1": "test_rg23.fq",
    "file_r2": "test_rg24.fq",
    "read_length_r1": 150,
    "read_length_r2": 125, 
    "insert_size": 298,
    "sample_barcode": null,
    "library_name": "Pond-147580"
  }
```

</TabItem>
<TabItem value="FASTQ-single">

```json
  "read_group_count": 1,
  "read_groups": {
    "read_group_id_in_bam": null, 
    "submitter_read_group_id": "C0HVY.2",
    "platform_unit": "74_8b",
    "is_paired_end": false,
    "file_r1": "test_rg5.fq",
    "file_r2": null,
    "read_length_r1": 150,
    "read_length_r2": null, 
    "insert_size": 298,
    "sample_barcode": null,
    "library_name": "Pond-147580"
  }
```

</TabItem>
</Tabs>

<!---  Tabs end here -->

#### **Files:**

The files section contains metadata about the molecular files to be submitted. Sequencing data of both `BAM` and `FASTQ` type files is accepted.

- There is no special requirement for FASTQ files except that paired end data should have the reads in two FASTQ files (one for each end).
- ARGO does not accept interleaved FASTQ files.
- Compression of FASTQ files is **required**; both _gzip_ (suffix .fq.gz or .fastq.gz) or _bz2_ (suffix .fq.bz2 or .fastq.bz2) are supported.
- For both FASTQ and BAM submission, all files in the `files` section must be unique in the payload.

The fields include:

| Payload Field | Attribute                                               | Description                                                                                 | Permissible Values |
| ------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ------------------ |
| fileName      | ![Required](/assets/submission/dictionary-required.svg) | Name of the file.                                                                           |                    |
| fileSize      | ![Required](/assets/submission/dictionary-required.svg) | Size of the file, in bytes.                                                                 |                    |
| fileMd5sum    | ![Required](/assets/submission/dictionary-required.svg) | Compute the md5sum of the file. This must match what is computed when the file is uploaded. |
| fileType      | ![Required](/assets/submission/dictionary-required.svg) | Data format of sequencing files.                                                            | BAM, FASTQ         |
| fileAccess    | ![Required](/assets/submission/dictionary-required.svg) | The permission level of a file.                                                             | open, controlled   |
| dataType      | ![Required](/assets/submission/dictionary-required.svg) | Descriptor of the type of file being submitted.                                             | Submitted Reads    |

**Example files portion of payload:**

```json
"files": [
  {
    "fileName": "test_rg3.bam",
    "fileSize": 14911,
    "fileMd5sum": "178f97f7b1ca8bfc28fd5586bdd56799",
    "fileType": "BAM",
    "fileAccess": "controlled",
    "dataType": "Submitted Reads"
  }
]
```

## Validating Metadata 

It is very important that molecular data is submitted with valid metadata that meets all of the rules described above.  As a helpful tool during metadata preparation, we have prepared a validation client that can be run on your data locally before submitting data officially.  The validation client will make sure that the prepared metadata and the metadata in the BAM headers is matching. 

Verification will help you ensure your data is formatted correctly (with accurate identifier assignments between metadata and molecular data files) and that your submission goes smoothly while also helping the DCC ensure that the downstream [Analysis Pipelines](/docs/analysis-workflows/analysis-overview) will function seamlessly.  

This validation tool will check: 
- Data submitted in the metadata payload and BAM/FASTQ files aligns
- Each submission is for a single sample


### Installing the Validation Client 


<!---  Tabs start here -->

<Tabs
  groupId="operating-systems"
  defaultValue="client"
  values={[
    { label: 'Client', value: 'client', },
    { label: 'Docker', value: 'docker', },
  ]
}>
<TabItem value="client">

A required pre-requisite is to have the [`samtools`](http://www.htslib.org/) package installed, which is used to retrieve BAM header information. To read JSON/JSONL outputs in a friendly manner, we also suggest installing the `jq` package. 

```bash
sudo apt install samtools
sudo apt install jq
```

Once samtools is installed, clone the repository:

```bash
git clone https://github.com/icgc-argo/seq-tools.git
```
Using pip, install `seq-tools`: 

```bash
cd seq-tools
pip3 install -r requirements.txt  # installs Python dependencies
pip3 install . # installs seq-tools
```

You can verify that the installation worked by checking the version: 
```bash
seq-tools -v
```
To update the client to the latest version, pull the latest verions on the repository and run: 
```bash
cd seq-tools
pip3 install .
```

</TabItem>
<TabItem value="docker">

```bash
docker pull quay.io/icgc-argo/seq-tools:1.0.0
alias seq-tools-in-docker="docker run -t -v `pwd`:`pwd` -w `pwd` quay.io/icgc-argo/seq-tools:1.0.0 seq-tools"
```

</TabItem>
</Tabs>

<!---  Tabs end here -->


## Validating Metadata Payloads 
You can validate your metadata payloads in multiple ways, depending on how you have your data structured. 

### Structured Directory  
One method to quickly complete validation is to structure your data in a pre-determined format that `seq-tools` is expecting. Under a submission directory, compile each submission as a folder, with the JSON payload and the associated data files in the same folder. 

Each submission folder **must** contain:
- The metadata payload as a `.json` file (for instructions on preparing payloads please see [Submitting Molecular Data](/docs/submission/submitting-molecular-data)).  Only 1 `.json` file must be present in the submission folder.
- All molecular data files associated to that payload, or symlinks to their location.

For example: 
![Example Directory Structure](/assets/submission/molecular_submission_validation_directory.png)

Once your data is ready, use `seq-tools` from the submission directory to validate all of the data: 

<!---  Tabs start here -->

<Tabs
  groupId="operating-systems"
  defaultValue="client"
  values={[
    { label: 'Client', value: 'client', },
    { label: 'Docker', value: 'docker', },
  ]
}>
<TabItem value="client">

```bash
seq-tools validate submission-directory/*/*.json  
```

</TabItem>
<TabItem value="docker">

```bash
cd ..
seq-tools-in-docker validate -d submission-directory/*/*.json 
```

</TabItem>
</Tabs>

<!---  Tabs end here -->


You will see an interactive prompt of the results of validation as the tool runs.  Once completed, view the details of the validation report:

```bash
cat validation_report.PASS.jsonl | jq . | less
cat validation_report.INVALID.jsonl | jq . | less
```
### Scriptable Location 

If you do not want to use the structured directory, you can use the '-d' option if data files are located in a different directory than where the metadata payloads are listed.

```bash
seq-tools validate -d ../sequencing-data-directory/ metadata_file_only/sequencing_experiment_payload.json
```
Or validate all metadata payloads in a directory at once using a wildcard: 
```
seq-tools validate -d ../sequencing-data-directory/ submission-payload-directory/*/*.json  
seq-tools-in-docker validate -d ../sequencing-data-directory/ submission-payload-directory/*/*.json
```

## Understanding the Validation Report
Validation report summaries can be found in the top level submission directory where you ran `seq-tools`.  The report.  Reports are separated into three categories:
- **PASS:** This status indicates that these payload(s) are ready for submission. 
- **PASS-with-WARNING:** This status indicates that these payload(s) are ready for submission, however there may be a parameter you want to double check before submission. 
- **INVALID:** This status indicates that these payload(s) are _not_ ready for submission. 

In the **INVALID** summary report, each reason for failure is listed. Errors must be fixed before you attempt to submit this payload.  To view all reports that are generated:

```bash
cat validation_report.PASS.jsonl | jq . | less # view details for PASS metadata files
cat validation_report.INVALID.jsonl | jq . | less # view details for PASS-with-WARNING metadata files
cat validation_report.PASS-with-WARNING.jsonl | jq . | less # view details for PASS metadata files
```