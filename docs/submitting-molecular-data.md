---
id: submitting-molecular-data
title: Submitting Molecular Data
---
Molecular data will be submitted to your local **Regional Data Processing Centre (RDPC)**. RDPCs are responsible for processing your program's molecular data according to the [Harmonization Pipeline](dna-pipeline). If you are unsure which RDPC you should submit to, please [contact the DCC](https://platform-ui.qa.argo.cancercollaboratory.org/contact).


This guide will describe how to submit molecular data to the ARGO Data Platform. Molecular data consists of all raw data files generated from your program's donors (e.g. sequencing reads, slide images), as well as any associated file metadata.

## Data Submission Client Configuration
Molecular data is uploaded to the ARGO Data Platform using the Song and Score CLIs (Command Line Clients).  Song is an open source system used to track and validate metadata about raw data submissions. Score securely and quickly manages upload and download of files to cloud repositories. The Song and Score clients are used in conjuction to  upload raw data files while maintaining file metadata and provenance.

### Song-Client
Download the **[latest version of the Song client](https://artifacts.oicr.on.ca/artifactory/dcc-release/bio/overture/song-client/4.0.0/song-client-4.0.0-dist.tar.gz)**. Once you have unzipped the tarball, update the  `/conf/application.yaml` configuration file with the correct user and data submission program values, including:
- local RDPC Song server URL
- [API Token](user-profile-and-api-token)
- ARGO Program Id that you are submitting to (studyId within the config file)

This is an example of how your `application.yaml` configuration file should look:
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
Download the **[latest version of the Score-client](https://artifacts.oicr.on.ca/artifactory/dcc-release/bio/overture/score-client/3.0.1/score-client-3.0.1-dist.tar.gz)**. Once you have unzipped the tarball, update the  `/conf/application.properties` configuration file with the correct user and data submission program values, including:
- local RDPC Song server URL
- [API Key](user-profile-and-token)
- local RDPC Song server URL

This is an example of how your `application.properties` configuration file should look:

```yaml
# The access token for authorized access to data
accessToken=92038829-338c-4aa2-92fc2-a3c241f63ff0

# The location of the metadata service (SONG)
metadata.url=https://song.qa.argo.cancercollaboratory.org

# The location of the object storage service (SCORE)
storage.url=https://score.qa.argo.cancercollaboratory.org
```
## Uploading Molecular Data
### 1. Format the payload
/////// NEED THE TAB DISPLAY HERE TO SHOW DIFFEERENT STARTING PAYLOADS {SEQUENCING EXPEIRMETN FOR ONE}
```
{
  "studyId": "DASH-CA",
  "analysisType": {
    "name": "sequencing_experiment"
  },
  "samples": [
    {
      "submitterSampleId": "sample-5",
      "matchedNormalSubmitterSampleId": "sample-5.1",
      "sampleType": "Amplified DNA",
      "specimen": {
        "submitterSpecimenId": "specimen-5",
        "specimenType": "Primary tumour",
        "tumourNormalDesignation": "Tumour",
        "specimenTissueSource": "Bone marrow"
      },
      "donor": {
        "submitterDonorId": "DASH-5",
        "gender": "Male"
      }
    }
  ],
  "files": [
    {
      "dataType": "submittedReads",
      "fileName": "dash-5-tumour.bam",
      "fileSize": 29,
      "fileType": "BAM",
      "fileMd5sum": "14a754c1066adcd2024620b51b2dc244",
      "fileAccess": "controlled"
    }
  ],
  "read_groups": [
    {
      "file_r1": "dash-r5.bam",
      "file_r2": "",
      "insert_size": null,
      "is_paired_end": true,
      "library_name": "Dashboard-Testing",
      "platform_unit": "Dashboard-Testing",
      "read_length_r1": null,
      "read_length_r2": null,
      "sample_barcode": null,
      "submitter_read_group_id": "dash-1-rg-5"
    }
  ],
  "experiment": {
    "submitter_sequencing_experiment_id": "DASH-SE-5",
    "library_strategy": "WGS",
    "sequencing_center": "",
    "platform": "ILLUMINA",
    "platform_model": null,
    "sequencing_date": null
  },
  "read_group_count": 1
}
```

### 2. Upload the payload
Once you have formatted the payload, use the song-client `submit` command to upload the json payload to the configured Song.

```
> ./bin/sing submit -f dash-5-tumour.json
```

If your payload is not formatted correctly, you will receive an error message detailing what is wrong.  Please fix any errors and resubmit.  If your payload is formatted correctly, you will get an `analysisId` in response.

```
{
  "analysisId" : "a4142a01-1274-45b4-942a-01127465b422",
  "status" : "OK"
}
```
Use the returned `analysis_id` to generate a manifest for file upload using the song-client `manifest` command.  This manifest will be used with the score-client in the next step.  

```
> ./bin/sing manifest -a a4142a01-1274-45b4-942a-01127465b422 -f manifest.txt

Wrote manifest file 'tumor_manifest.txt' for analysisId 'a4142a01-1274-45b4-942a-01127465b422'
```

### 3. Upload sequencing files
Using the score-client  `upload` command, upload all files associated with the payload.
```
> .bin/score-client  upload --manifest manifest.txt
```
If the file successfully uploads, then you will receive an `Upload completed` message.  

### 4. Publish the payload
```
AnalysisId a4142a01-1274-45b4-942a-01127465b422 successfully published
```
## Data Processing and Harmonization
