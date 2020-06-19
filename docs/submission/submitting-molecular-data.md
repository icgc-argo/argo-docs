---
id: submitting-molecular-data
title: Submitting Molecular Data
platform_key: DOCS_SUBMITTING_MOLECULAR_DATA
---

Molecular data consists of raw data files (e.g. sequencing reads), as well as any associated file metadata (data that describes your data).

Raw molecular data is submitted to a **Regional Data Processing Centre (RDPC)**. RDPCs are responsible for processing your program's molecular data according to the [Analysis Pipeline](/docs/analysis-workflows/analysis-overview). If you are unsure which RDPC you should submit to, please [contact the DCC](https://platform.icgc-argo.org/contact).

> [Sample Registration](/docs/submission/registering-samples) is the first step in the data submission life cycle. You **must** register samples before submitting molecular data. Please ensure that your samples are registered on the ARGO Data Platform before continuing with this step.

## Data Submission Client Configuration

Molecular data is uploaded to the ARGO Data Platform using the Song and Score CLIs (Command Line Clients). Song is an open source system used to track and validate metadata about raw data submissions. Score securely manages upload and download of files to cloud repositories managed by the RDPCs. The Song and Score clients are used in conjunction to upload raw data files while maintaining file metadata and provenance.

### Song-Client

Download the **[latest version of the song-client](https://artifacts.oicr.on.ca/artifactory/dcc-release/bio/overture/song-client/[RELEASE]/song-client-[RELEASE]-dist.tar.gz)**. Once you have unzipped the tarball, change directories into the unzipped folder:

```shell
 wget -O song-client.tar.gz https://artifacts.oicr.on.ca/artifactory/dcc-release/bio/overture/song-client/[RELEASE]/song-client-[RELEASE]-dist.tar.gz

tar xvzf song-client.tar.gz

## Note: Once unzipped, the final directory will be suffixed with the latest release number.
cd song-client-<latest-release-number>
```

Update the `conf/application.yaml` configuration file with the correct user and data submission program values, including:

- **serverURL**: The Song server URL for your local RDPC metadata storage server.
- **accessToken**: Your personal [API Token](/docs/data-access/user-profile-and-api-token).
- **studyID**: The ARGO Program ID for which you are submitting data.

To do this, change directories into `conf` folder and open the `application.yaml` file. This is an example of how your `application.yaml` configuration file should look:

```yml
client:
  serverUrl: https://song.rdpc.cancercollaboratory.org
  studyId: DASH-CA
  debug: false
  accessToken: 92038829-338c-4aa2-92fc2-a3c241f63ff0
retry:
  maxRetries: 5
  initialBackoff: 15000
  multiplier: 2.0
```

### Score-Client

Download the **[latest version of the score-client](https://artifacts.oicr.on.ca/artifactory/dcc-release/bio/overture/score-client/[RELEASE]/score-client-[RELEASE]-dist.tar.gz)**. Once you have unzipped the tarball, change directories into the unzipped folder:

```shell
wget -O score-client.tar.gz https://artifacts.oicr.on.ca/artifactory/dcc-release/bio/overture/score-client/[RELEASE]/score-client-[RELEASE]-dist.tar.gz

tar xvzf score-client.tar.gz

## Note: Once unzipped, the final directory will be suffixed with the latest release number.
cd score-client-<latest-release-number>
```

Update the `conf/application.properties` configuration file with the correct user and data submission program values, including:

- **accessToken**: Your personal [API Token](/docs/data-access/user-profile-and-api-token).
- **metadata.url**: The file metadata Song server URL for your local RDPC.
- **storage.url**: The object storage Score server URL for your local RDPC.

To do this, change directories into `conf` folder and open the `application.properties` file. This is an example of how your `application.properties` configuration file should look:

```yaml
# The access token for authorized access to data
accessToken=92038829-338c-4aa2-92fc2-a3c241f63ff0

# The location of the metadata service (SONG)
metadata.url=https://song.rdpc.cancercollaboratory.org

# The location of the object storage service (SCORE)
storage.url=https://score.rdpc.cancercollaboratory.org
```

## How to Upload Molecular Data

### Understanding the Song metadata fields

Song accepts metadata in JSON format (called a `payload`), which is validated against JSON Schema to ensure data quality. The first step of submitting sequencing data is to prepare the Song metadata payloads conforming to the most recent JSON schema that has been defined by the DCC. This is an example of a Song metadata payload: `<<link test payload>>`

The `sequencing_experiment` payload is broken down into 5 sections: `root level`, `experiment`, `samples`, `read groups` and `files`. Each section **must** be submitted in the payload.

> ![Required](/assets/submission/dictionary-required.svg) indicates a required field that **must** be included in the payload or it immediately fail submission validation.

#### **Root level**

The root level of the sequencing_experiment payload contains important administrative information. The fields include:

| Payload Field    | Attribute                                               | Description                                                                                                                                                                 | Permissible Values    |
| ---------------- | ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| studyId          | ![Required](/assets/submission/dictionary-required.svg) | ARGO `Program ID`, the unique identifier of your program. If you have logged into the ARGO Data Platform, this is the Program ID that you see in the Program Services area. |                       |
| analysisType     | ![Required](/assets/submission/dictionary-required.svg) | The type of molecular data that is being submitted in the payload.                                                                                                          | sequencing_experiment |
| read_group_count | ![Required](/assets/submission/dictionary-required.svg) | The number of read groups to be submitted.                                                                                                                                  |

**Example root level portion of payload:**

```json
  "analysisType": {
    "name": "sequencing_experiment"
  },
  "studyId": "TEST-CA",
  "read_group_count": 3
```

#### **Experiment:**

The experiment section contains details that are relevant to the experimental requirements imposed during sequencing. The fields include:

| Payload Field                        | Attribute                                               | Description                                                                                            | Permissible Values               |
| ------------------------------------ | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | -------------------------------- |
| submitter_sequencing\_ experiment_id | ![Required](/assets/submission/dictionary-required.svg) | The unique identifier of the sequencing experiment.                                                    |                                  |
| platform                             | ![Required](/assets/submission/dictionary-required.svg) | The sequencing platform type used in data generation.                                                  |                                  |
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

1. All `read_groups` in the payload must belong to a single sample.
1. `platform_units` must be unique with a one-to-one relationship with `submitter_read_group_id`.
1. The total number of `read_group` objects must match the number specified in `read_group_count`.
1. For paired end sequencing, both `file_r1` and `file_r2` are required, otherwise, only `file_r1` is required (`file_r2` must not be populated).
1. For FASTQ submission, no file can appear more than once in `file_r1` or `file_r2` across read group objects.

**Example read groups portion of payload:**

```json
"read_groups": [
  {
    "submitter_read_group_id": "C0HVY.2",
    "platform_unit": "74_8a",
    "is_paired_end": true,
    "file_r1": "test_rg3.bam",
    "file_r2": "test_rg3.bam",
    "read_length_r1": 150,
    "read_length_r2": 150,
    "insert_size": 232,
    "sample_barcode": null,
    "library_name": "Pond-147579"
  },
  {
    "submitter_read_group_id": "D0RE2.1",
    "platform_unit": "74_8b",
    "is_paired_end": true,
    "file_r1": "test_rg3.bam",
    "file_r2": "test_rg3.bam",
    "read_length_r1": 150,
    "read_length_r2": 150,
    "insert_size": 298,
    "sample_barcode": null,
    "library_name": "Pond-147580"
  },
  {
    "submitter_read_group_id": "D0RH0.2",
    "platform_unit": "74_8c",
    "is_paired_end": true,
    "file_r1": "test_rg3.bam",
    "file_r2": "test_rg3.bam",
    "read_length_r1": 150,
    "read_length_r2": 150,
    "insert_size": 298,
    "sample_barcode": null,
    "library_name": "Pond-147580"
  }
],
```

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

### Step 1. Prepare Song sequencing_experiment metadata

This is an example of a correctly formatted `sequencing_experiment` metadata submission in JSON format, according to the rules presented above:

### Step 2. Upload the metadata file

Once you have formatted the payload correctly, use the song-client `submit` command to upload the Song payload.

```shell
./bin/sing submit -f dash-5-tumour.json
```

If your payload is not formatted correctly, you will receive an error message detailing what is wrong. Please fix any errors and resubmit. If your payload is formatted correctly, you will get an `analysisId` in response:

```json
{
  "analysisId": "a4142a01-1274-45b4-942a-01127465b422",
  "status": "OK"
}
```

At this point, since the payload data has successfully been submitted and accepted by Song, it is now referred to as a Song analysis. The newly created analysis will be state `UNPUBLISHED`.

### Step 3. Generate a manifest file

Use the returned `analysis_id` from step 2 to generate a manifest for file upload. This manifest will be used with the score-client in the next step. Using the song-client `manifest` command, define

- the analysis id using `-a` parameter
- the location of your input files with the `-d` parameter,
- the output file path for the manifest file with the `-f` parameter

```shell

./bin/sing manifest -a a4142a01-1274-45b4-942a-01127465b422 -f /some/output/dir/manifest.txt  -d /submitting/file/directory

Wrote manifest file 'manifest.txt' for analysisId 'a4142a01-1274-45b4-942a-01127465b422'
```

The `manifest.txt` file will be written out to the directory /some/output/dir/. If the output directory does not exist, it will be automatically created.

### Step 4. Upload sequencing files

Using the score-client `upload` command, upload all files associated with the payload. This requires the manifest file generated in step 3.

```shell
$ .bin/score-client  upload --manifest manifest.txt
```

If the file(s) successfully upload, then you will receive an `Upload completed` message.

### Step 5. Publish the analysis

The final step to submitting molecular data is to set the state of an analysis to `PUBLISHED`. A published analysis signals to the DCC that this data is ready to be processed.

```shell
./bin/sing publish -a a4142a01-1274-45b4-942a-01127465b422

AnalysisId a4142a01-1274-45b4-942a-01127465b422 successfully published
```

Once your `sequencing_experiment` analysis has been successfully submitted and published, it will be queued for data processing. You can follow the progress of [molecular data processing](/docs/analysis-workflows/analysis-overview) for submitted data on your [Program Dashboard](/docs/submission/submitted-data).
