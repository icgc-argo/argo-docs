---
id: submitting-molecular-data
title: Submitting Molecular Data
platform_key: DOCS_SUBMITTING_MOLECULAR_DATA
---

![Reminder Banner](/assets/submission/banner-reminder.svg)
Molecular data consists of raw data files generated from your program's donors (e.g. sequencing reads, slide images), as well as any associated file metadata (data that describes your data).

Molecular data will be submitted to your local **Regional Data Processing Centre (RDPC)**. RDPCs are responsible for processing your program's molecular data according to the [Analysis Pipeline](/docs/analysis-workflows/analysis-overview). If you are unsure which RDPC you should submit to, please [contact the DCC](https://platform.icgc-argo.org/contact).

## Data Submission Client Configuration

Molecular data is uploaded to the ARGO Data Platform using the Song and Score CLIs (Command Line Clients). Song is an open source system used to track and validate metadata about raw data submissions. Score securely and quickly manages upload and download of files to cloud repositories managed by the RDPCs. The Song and Score clients are used in conjunction to upload raw data files while maintaining file metadata and provenance.

### Song-Client

Download the **[latest version of the song-client](https://artifacts.oicr.on.ca/artifactory/dcc-release/bio/overture/song-client/[RELEASE]/song-client-[RELEASE]-dist.tar.gz)**. Once you have unzipped the tarball, change directories into the unzipped folder:

```
gunzip song-client-[RELASE]-dist.tar.gz
cd song-client-[RELEASE]
```

Update the `conf/application.yaml` configuration file with the correct user and data submission program values, including:

- **serverURL**: The Song server URL for your local RDPC metadata storage server
- **accessToken**: your personal [API Token](/docs/data-access/user-profile-and-api-token)
- **studyID**: The ARGO Program ID that you are submitting data for

To do this, change directories into `conf` folder and open the `application.yaml` file. This is an example of how your `application.yaml` configuration file should look:

```yml
client:
  serverUrl: https://song.qa.argo.cancercollaboratory.org
  studyId: DASH-CA
  programName: sing
  debug: false
  accessToken: 92038829-338c-4aa2-92fc2-a3c241f63ff0
retry:
  maxRetries: 5
  initialBackoff: 15000
  multiplier: 2.0
```

### Score-Client

Download the **[latest version of the score-client](https://artifacts.oicr.on.ca/artifactory/dcc-release/bio/overture/score-client/[RELEASE]/score-client-[RELEASE]-dist.tar.gz)**. Once you have unzipped the tarball, change directories into the unzipped folder:

```
gunzip score-client-[RELASE]-dist.tar.gz
cd score-client-[RELEASE]
```

Update the `conf/application.properties` configuration file with the correct user and data submission program values, including:

- **accessToken**: your personal [API Token](/docs/data-access/user-profile-and-api-token)
- **metadata.url**: the file metadata Song server URL for your local RDPC
- **storage.url**: the object storage Score server URL for your local RDPC

To do this, change directories into `conf` folder and open the `application.properties` file. This is an example of how your `application.properties` configuration file should look:

```yaml
# The access token for authorized access to data
accessToken=92038829-338c-4aa2-92fc2-a3c241f63ff0

# The location of the metadata service (SONG)
metadata.url=https://song.qa.argo.cancercollaboratory.org

# The location of the object storage service (SCORE)
storage.url=https://score.qa.argo.cancercollaboratory.org
```

## How to Upload Molecular Data

### Understanding the Song metadata fields

Song accepts metadata in JSON format (also referred as a `Song payload`), which is validated against standard JSON Schema to ensure data quality. The first step of submitting sequencing data is to prepare the Song metadata payloads conforming to the most recent JSON schema that has been defined by the DCC. The latest `sequencing_experiment` JSON Schema can be found in the ARGO [github repository](https://github.com/icgc-argo/argo-metadata-schemas/blob/master/schemas/sequencing_experiment.json).

The data fields can be broken down into five main sections: `body`, `experiment`, `samples`, `read groups` and `files`. Each of these sections must be submitted in the payload.

> Note: \*\* denotes a required field. These **must** be provided as part of the metadata payload or it will immediately fail validation upon submission.

**Body:** The main body of the sequencing payload contains important administrative information.

- `**studyId`: Corresponds to your ARGO `Program ID`. This is the unique id that is assigned to your program. If you have logged into the ARGO Data Platform, this is the Program Id that you see in the Program Services area. For example, PACA-CA is a Program ID.
- `**analysisType`: This object specifies the type of data & metadata that is being submitted. Set to `sequencing_experiment`.
- `**read_group_count`: Number of read groups submitted as part of the raw molecular file.

Example of body portion of payload:

```json
  "analysisType": {
    "name": "sequencing_experiment"
  },
  "studyId": "TEST-CA",
  "read_group_count": 3
```

**Experiment:** The experiment section contains details that are relevant to the experimental requirements imposed during sequencing.

- `**submitter_sequencing_experiment_id`:The unique identifier of the sequencing experiment.
- `**platform`: The sequencing platform type that was used to generate the submitted data files.
- `platform_model`: The exact model number of the sequencing machine used.
- `sequencing_center`: The sequencing center the analysis was performed at.
- `**experimental_strategy`: Descriptor of the primary experimental method. For sequencing data it refers to how the sequencing library was made. Permissible values: WGS, WXS, RNA-Seq, Bisulfite-Seq etc.
- `sequencing_date`: Date sequencing was performed.

Example of experiment portion of payload:

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

**Samples:** The sample section contains details of the clinical data and key sample descriptors related to the submitted files. In order to submit a payload, this data must be [registered](/docs/submission/registering-samples) in the ARGO Data Platform. For allowed values of all fields, please see the Sample Registration file of the [Data Dictionary](/dictionary).

If the data for a sample is different than what has been registered, metadata validation will fail immediately upon submission.

Example of samples portion of payload:

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

**Read Groups:** The read group section contains details about the reads that were generated from a single run of a sequencing instrument lane. The number of `read_group` objects in the payload must meet the number specified in `read_group_count`, found in the main submisison body.

- `**submitter_read_group_id`: The unique identifier of a read group.
- `**platform_unit`: Unique identifier that includes three types of information, the {FLOWCELL_BARCODE}.{LANE}.{SAMPLE_BARCODE}. The {FLOWCELL_BARCODE} refers to the unique identifier for a particular flow cell. The {LANE} indicates the lane of the flow cell and the {SAMPLE_BARCODE} is a sample/library-specific identifier. For non-multiplex sequencing, platform unit and read group have a one-to-one relationship.
- `**is_paired_end`: `true` for paired end sequencing, otherwise `false`.
- `**file_r1`: Name of the sequencing file containing reads from the first end of a sequencing run.
- `file_r2`: Name of the sequencing file containing reads from the second end of a paired end sequencing run. Required if and only if paired end sequencing was done.
- `read_length_r1`: Length of sequencing reads in `file_r1`; this corresponds to the number of sequencing cycles of the first end.
- `read_length_r2`: Length of sequencing reads in `file_r2`; this corresponds to the number of sequencing cycles of the second end.
- `insert_size`: For paired end sequencing, the average size of sequences between two sequencing ends. Required for paired end sequencing.
- `sample_barcode`: According to the SAM specification, this is the expected barcode bases as read by the sequencing machine in the absence of errors.
- `**library_name`: Name of a sequencing library made from a molecular sample or a sample pool (multiplex sequencing).

Read Group Data Validations:

1. `submitter_read_group_id` must be unique within each Song payload, and ideally unique across all read groups in an ARGO program.
1. `submitter_read_group_id` must not contain any special characters, with the exception of `-` , `.` , and `_` .
1. All `read_groups` in the payload must belong to a single sample.
1. `platform_units` must be unique with a one-to-one relationship with `submitter_read_group_id`.
1. The total number of `read_group` objects must match the number specified in `read_group_count`.
1. For paired end sequencing, both `file_r1` and `file_r2` are required, otherwise, only `file_r1` is required (`file_r2` must not be populated).
1. For FASTQ submission, no file can appear more than once in `file_r1` or `file_r2` across read group objects.

Example of read groups portion of payload:

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

**Files:** The files section contains metadata about the molecular files to be submitted.

The ARGO Data Platform accepts sequencing data submission for both `BAM` and `FASTQ` files. There is no special requirement for FASTQ files except that paired end data should have the reads in two FASTQ files (one for each end). ARGO does not accept interleaved FASTQ files. Compression of FASTQ files is **required**; both _gzip_ (suffix .fq.gz or .fastq.gz) or _bz2_ (suffix .fq.bz2 or .fastq.bz2) are supported.

- `**fileName`: Name of the file, as defined by the data submitter.
- `**fileSize`: Provided in bytes.
- `**fileMd5sum`: Compute the md5sum of the file. This must match what is computed when the file is uploaded.
- `**fileType`: Set to `BAM` or `FASTQ`, based file type being submitted.
- `**fileAccess`: Set to `controlled`.
- `**dataType`: Set to `Submitted Reads`.

For both FASTQ and BAM submission, all files in the `files` section must be unique.

Example of files groups portion of payload:

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

### 1. Prepare Song sequencing_experiment metadata

This is an example of a correctly formatted `sequencing_experiment` metadata submission in JSON format, according to the rules presented above:

### 2. Upload the metadata file

Once you have formatted the payload correctly, use the song-client `submit` command to upload the Song payload.

```
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

### 3. Generate a manifest file

Use the returned `analysis_id` from step 2 to generate a manifest for file upload using the song-client `manifest` command. This manifest will be used with the score-client in the next step.

```
./bin/sing manifest -a a4142a01-1274-45b4-942a-01127465b422 -f manifest.txt

Wrote manifest file 'manifest.txt' for analysisId 'a4142a01-1274-45b4-942a-01127465b422'
```

The manifest will be written out to the score directory. You can optionally define a specific output directory for your manifest file using the `-f` parameter. If the directory does not yet exist, it will be created.

```
./bin/sing manifest -a a4142a01-1274-45b4-942a-01127465b422 -f manifest.txt -f /my/output/dir/manifest.txt

Wrote manifest file 'manifest.txt' for analysisId 'a4142a01-1274-45b4-942a-01127465b422'

```

### 4. Upload sequencing files

Using the score-client `upload` command, upload all files associated with the payload. This requires the manifest file generated in step 3.

```
.bin/score-client  upload --manifest manifest.txt
```

If the file(s) successfully uploads, then you will receive an `Upload completed` message.

### 5. Publish the metadata and sequencing file

The final step to submitting molecular data is to set the state of an analysis to `PUBLISHED`. A published analysis signals to the DCC that this data is ready to be processed.

```
./bin/sing publish -a a4142a01-1274-45b4-942a-01127465b422
AnalysisId a4142a01-1274-45b4-942a-01127465b422 successfully published
```

Once your `sequencing_experiment` analysis has been successfully submitted and published, it will be queued for data processing. You can follow the progress of [molecular data processing](/docs/analysis-workflows/analysis-overview) for submitted data on your [Program Dashboard](/docs/submission/submitted-data).
