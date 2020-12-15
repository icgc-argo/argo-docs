---
id: molecular-data-prep
title: Preparing and Validating Molecular Data
platform_key: DOCS_PREPARING_MOLECULAR_DATA
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Molecular data files are submitted in conjunction with necessary, descriptive data about molecular files and samples, called metadata. The DCC requires that metadata is submitted at the same time as the molecular data to facilitate automated downstream analysis. Metadata is submitted in JSON format, called a payload. The payload is validated against a JSON Schema to ensure data quality. This metadata is submitted to the ARGO metadata repository, called Song.  To prepare the molecular metadata, you will need to follow these steps: 

1. Prepare metadata payloads according to the correct format (described below).
2. Validate the metadata payload(s) and molecular files with the ARGO `seq-tools` client. 
3. Once the metadata has passed validation, both the metadata payload and the molecular data files can be [submitted](/docs/submission/submitting-molecular-data) together. 

## Preparing Metadata Payloads
### Understanding the Payload Format

The first step of submitting molecular data is to prepare the metadata payloads conforming to the most recent JSON Schema that has been defined by the DCC. You can find the most recent schema using this request: 
```bash
curl --location --request GET 'https://submission-song.rdpc.cancercollaboratory.org/schemas/sequencing_experiment'
```
The JSON Schema can be complicated to follow, so we suggest using the examples below as a starting point.  

The main types of submission are for `Tumour` and `Normal` samples; each of these types has a specific set of data rules to follow in the metadata format.  These are examples of correctly formatted payloads for both `Tumour` and `Normal` sample types:
<!---  Tabs start here -->

<Tabs
  defaultValue="normal"
  values={[
    { label: 'Normal Sample Metadata', value: 'normal', },
    { label: 'Tumour Sample Metadata', value: 'tumour', },
  ]
}>
<TabItem value="normal">

```json
{
	"studyId": "DASH-CA",
	"analysisType": {
		"name": "sequencing_experiment"
	},
	"samples": [{
		"submitterSampleId": "dashsa-1",
		"matchedNormalSubmitterSampleId": null,
		"sampleType": "Amplified DNA",
		"specimen": {
			"submitterSpecimenId": "dashsp-1",
			"specimenType": "Normal",
			"tumourNormalDesignation": "Normal",
			"specimenTissueSource": "Blood derived"
		},
		"donor": {
			"submitterDonorId": "DASH-1",
			"gender": "Male"
		}
	}],
	"files": [{
		"dataType": "Submitted Reads",
		"fileName": "dash-1-normal.bam",
		"fileSize": 24,
		"fileType": "BAM",
		"fileMd5sum": "4d6e35e3290ccce08c8c7517dc29d624",
		"fileAccess": "controlled"
	}],
	"read_group_count": 1,
	"read_groups": [{
		"file_r1": "dash-1-normal.bam",
		"file_r2": null,
		"insert_size": null,
		"is_paired_end": false,
		"library_name": "Library-Testing",
		"platform_unit": "Library-Testing",
		"read_length_r1": null,
		"read_length_r2": null,
		"sample_barcode": null,
		"submitter_read_group_id": "dash-1-rg-1"
	}],
	"experiment": {
		"submitter_sequencing_experiment_id": "DASH-SE-1",
		"experimental_strategy": "WGS",
		"sequencing_center": "",
		"platform": "ILLUMINA",
		"platform_model": null,
		"sequencing_date": null
	}
}
```

</TabItem>
<TabItem value="tumour">

```json
{
	"studyId": "DASH-CA",
	"analysisType": {
		"name": "sequencing_experiment"
	},
	"samples": [{
		"submitterSampleId": "dashsa-1.1",
		"matchedNormalSubmitterSampleId": "dashsa-1",
		"sampleType": "Amplified DNA",
		"specimen": {
			"submitterSpecimenId": "dashsp-1.1",
			"specimenType": "Primary tumour",
			"tumourNormalDesignation": "Tumour",
			"specimenTissueSource": "Cerebellum"
		},
		"donor": {
			"submitterDonorId": "DASH-1",
			"gender": "Male"
		}
	}],
	"files": [{
		"dataType": "Submitted Reads",
		"fileName": "dash-1-tumour.bam",
		"fileSize": 24,
		"fileType": "BAM",
		"fileMd5sum": "d5fd5482b53ee89e71eda8d69cba4bd9",
		"fileAccess": "controlled"
	}],
	"read_group_count": 1,
	"read_groups": [{
		"file_r1": "dash-1-tumour.bam",
		"file_r2": null,
		"insert_size": null,
		"is_paired_end": false,
		"library_name": "Library-Testing",
		"platform_unit": "Library-Testing",
		"read_length_r1": null,
		"read_length_r2": null,
		"sample_barcode": null,
		"submitter_read_group_id": "dash-1-rg-2"
	}],
	"experiment": {
		"submitter_sequencing_experiment_id": "DASH-SE-1.2",
		"experimental_strategy": "WGS",
		"sequencing_center": "",
		"platform": "ILLUMINA",
		"platform_model": null,
		"sequencing_date": null
	}
}
```


</TabItem>
</Tabs>

<!---  Tabs end here -->

See github for the same example of a correctly formatted payload from a [normal sample](https://github.com/icgc-argo/argo-metadata-schemas/blob/master/example_payloads/dash1_normal.json) and a [tumour sample](https://github.com/icgc-argo/argo-metadata-schemas/blob/master/example_payloads/dash1_tumour.json).

Depending on the type of sequencing that was done, the `read_groups` section of the payload will need to be adjusted. The following are examples of correctly formatted `read_groups` that meet [the rules](/docs/submission/molecular-data-prep#file-and-data-validation-rules) for paired-end vs single-end sequencing:

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
    "insert_size": null,
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
### File and Data Validation Rules

Sequencing data of both `BAM` and `FASTQ` type files is accepted, with the exception of interleaved FASTQ files.  Metadata payloads like the example above must follow these data validations:

1. Compression of FASTQ files is **required**; both _gzip_ (suffix .fq.gz or .fastq.gz) or _bz2_ (suffix .fq.bz2 or .fastq.bz2) are supported.
1. For both FASTQ and BAM submission, all files in the `files` section must be unique in the payload.
1. All `read_groups` in the payload and BAM header must belong to a single sample.
1. `platform_units` must be unique with a one-to-one relationship with `submitter_read_group_id`.
1. The total number of `read_group` objects must match the number specified in `read_group_count`.
1. For paired end sequencing, both `file_r1` and `file_r2` are required, otherwise, only `file_r1` is required (`file_r2` must not be populated).
1. For paired-end sequencing, `file_r1` and `file_r2` must not be the same file. 
1. For FASTQ submission, no file can appear more than once in `file_r1` or `file_r2` across read group objects.

### Understanding the Payload Fields
:::note   
![Required](/assets/submission/dictionary-required.svg) indicates a field that **must** be included in the metadata payload or it will immediately fail submission.
:::

The metadata payload is broken down into 4 sections: `experiment`, `samples`, `read groups` and `files`, with all other fields being at the root level. Each section **must** be submitted in the payload.

The `samples` section contains details of the clinical data and key sample descriptors related to the submitted files. In order to submit a metadata payload, this data must be [registered](/docs/submission/registering-samples) in the ARGO Data Platform. For allowed values of all fields, please see the Sample Registration file of the [Data Dictionary](/dictionary). If the data for a sample is different than what has been registered, metadata submission will fail.

A description of all other payload sections is shown below: 

|  Payload Field     | Payload Section |  Attribute                                                |  Description                                                                                                                                                                  |  Permissible Values     |  
|-|-|-|-|-|
|  studyId           |  |  ![Required](/assets/submission/dictionary-required.svg)  |  ARGO `Program ID`, the unique identifier of your program. If you have logged into the ARGO Data Platform, this is the Program ID that you see in the Program Services area.  |                         |  
|  analysisType      |  |  ![Required](/assets/submission/dictionary-required.svg)  |  The type of molecular data that is being submitted in the payload.                                                                                                           |  sequencing_experiment  |  
|  submitter_sequencing\_ experiment_id  | experiment |  ![Required](/assets/submission/dictionary-required.svg)  |  The unique identifier of the sequencing experiment.                                                     |                                    |  
|  platform                              | experiment |  ![Required](/assets/submission/dictionary-required.svg)  |  The sequencing platform type used in data generation.                                                   | CAPILLARY, LS454, ILLUMINA, SOLID, HELICOS, IONTORRENT, ONT, PACBIO, Nanopore, BGI |  
|  platform_model                        | experiment |                                                           |  The model number of the sequencing machine used in data generation.                                     |                                    |  
|  experimental_strategy                 | experiment |  ![Required](/assets/submission/dictionary-required.svg)  |  The primary experimental method. For sequencing data it refers to how the sequencing library was made.  |  WGS, WXS, RNA-Seq, Bisulfite-Seq  |  
|  sequencing_date                       | experiment |                                                           |  Date sequencing was performed.      |datetime format, for example: 2019-06-16,    2019-06-16T20:20:39+00:00  |  
|  read_group_count  |  |  ![Required](/assets/submission/dictionary-required.svg)  |  The number of read groups in the molecular files being submitted.                                                                                                               |   |  
| read_group_id_in_bam | read_groups |   |  Optional field indicating the read group id that is in the BAM.  This **cannot** be submitted for FASTQ files. |                                                                      |  
|  submitter_read\_ group_id  | read_groups |  ![Required](/assets/submission/dictionary-required.svg)  |  The unique identifier of a read group; must be unique within each payload.                                                                                                                                                                                                                                                                                         |                      |  
|  platform_unit              | read_groups |  ![Required](/assets/submission/dictionary-required.svg)  |  Unique identifier including the {FLOWCELL_BARCODE}.{LANE}.{SAMPLE_BARCODE}. The {FLOWCELL_BARCODE} refers to the unique identifier for a particular flow cell. The {LANE} indicates the lane of the flow cell and the {SAMPLE_BARCODE} is a sample/library-specific identifier. For non-multiplex sequencing, platform unit and read group have a one-to-one relationship.  |                      |  
|  is_paired_end              | read_groups |  ![Required](/assets/submission/dictionary-required.svg)  |  Indicate if paired end sequencing was performed.                                                                                                                                                                                                                                                                                                                            |  true, false         |  
|  file_r1                    | read_groups |  ![Required](/assets/submission/dictionary-required.svg)  |  Name of the sequencing file containing reads from the first end of a sequencing run.                                                                                                                                                                                                                                                                                        |                      |  
|  file_r2                    | read_groups |  ![Required](/assets/submission/dictionary-required.svg)  |  Name of the sequencing file containing reads from the second end of a paired end sequencing run. Required if and only if paired end sequencing was done.                                                                                                                                                                                                                    |                      |  
|  read_length_r1             | read_groups |                                                           |  Length of sequencing reads in `file_r1`; this corresponds to the number of sequencing cycles of the first end.                                                                                                                                                                                                                                                              |                      |  
|  read_length_r2             | read_groups |                                                           |  Length of sequencing reads in `file_r2`; this corresponds to the number of sequencing cycles of the second end.                                                                                                                                                                                                                                                             |                      |  
|  insert_size                | read_groups |  ![Required](/assets/submission/dictionary-required.svg)  |  For paired end sequencing, the average size of sequences between two sequencing ends. Required only for paired end sequencing.                                                                                                                                                                                                                                              |                      |  
|  sample_barcode             | read_groups |                                                           |  According to the SAM specification, this is the expected barcode bases as read by the sequencing machine in the absence of errors.                                                                                                                                                                                                                                          |                      |  
|  library_name               | read_groups |  ![Required](/assets/submission/dictionary-required.svg)  |  Name of a sequencing library made from a molecular sample or a sample pool (multiplex sequencing).                                                                                                                                                                                                                                                                          |                      |  
|  fileName       | files |  ![Required](/assets/submission/dictionary-required.svg)  |  Name of the file.                                                                            |                      |  
|  fileSize       | files |  ![Required](/assets/submission/dictionary-required.svg)  |  Size of the file, in bytes.                                                                  |                      |  
|  fileMd5sum     | files |  ![Required](/assets/submission/dictionary-required.svg)  |  Compute the md5sum of the file. This must match what is computed when the file is uploaded.  |  |  |
|  fileType       | files |  ![Required](/assets/submission/dictionary-required.svg)  |  Data format of sequencing files.                                                             |  BAM, FASTQ          |  
|  fileAccess     | files |  ![Required](/assets/submission/dictionary-required.svg)  |  The permission level of a file.                                                              |  open, controlled    |
|  dataType       | files |  ![Required](/assets/submission/dictionary-required.svg)  |  Descriptor of the type of file being submitted.                                              |  Submitted Reads     | 


## Validating Metadata Payloads

It is very important that molecular data is submitted with valid metadata. As a helpful tool during metadata preparation, we have prepared a validation client that can be run on your data locally before submitting data officially. 

Validation will help you ensure your data is formatted correctly (with accurate identifier assignments between metadata and molecular data files) and that your submission goes smoothly while also helping the DCC ensure that the downstream [Analysis Pipelines](/docs/analysis-workflows/analysis-overview) will function seamlessly.  

This validation tool will check: 
- Data submitted in the metadata payload and BAM/FASTQ files aligns.
- Each submission is for a single sample.
- Each payload is formatted according to the [data validation rules](/docs/submission/molecular-data-prep#file-and-data-validation-rules) stated above.


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
To update the client to the latest version, pull the latest version of the repository and run: 
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


### Structured Directory Validation
One method to quickly complete validation is to structure your data in a pre-determined format that `seq-tools` is expecting. Under a submission directory, compile each submission as a folder, with the JSON payload and the associated data files in the same folder. 

Each submission folder **must** contain:
- The metadata payload as a `.json` file. Only 1 `.json` file must be present in the submission folder.
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
### Scriptable Location Validation

If you do not want to use the structured directory, you can use the '-d' option if data files are located in a different directory than where the metadata payloads are listed.

```bash
seq-tools validate -d ../sequencing-data-directory/ metadata_file_only/sequencing_experiment_payload.json
```
Or validate all metadata payloads in a directory at once using a wildcard: 
```
seq-tools validate -d ../sequencing-data-directory/ submission-payload-directory/*/*.json  
seq-tools-in-docker validate -d ../sequencing-data-directory/ submission-payload-directory/*/*.json
```

You can use this method to build your own script to validate payloads in different locations. 

### Understanding the Validation Report
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