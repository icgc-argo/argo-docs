---
id: submitting-molecular-data
title: Submitting Molecular Data
platform_key: DOCS_SUBMITTING_MOLECULAR_DATA
---

Molecular data consists of raw molecular data files (e.g. sequencing reads), as well as any associated file metadata (data that describes your data).

Raw molecular data is submitted to a **Regional Data Processing Centre (RDPC)**. RDPCs are responsible for processing your program's molecular data according to the [Analysis Pipeline](/docs/analysis-workflows/analysis-overview). If you are unsure which RDPC you should submit to, please [contact the DCC](https://platform.icgc-argo.org/contact).

:::note
[Sample Registration](/docs/submission/registering-samples) is the first step in the data submission process. You **must** register samples before submitting molecular data. Please ensure that your samples are registered on the ARGO Data Platform before continuing with this step.
:::

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

```yml title="song-client config"
client:
  serverUrl: https://submission-song.rdpc.cancercollaboratory.org
  studyId: DASH-CA #add your Program ID here
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

```yaml title="score-client config"
# The access token for authorized access to data
accessToken=92038829-338c-4aa2-92fc2-a3c241f63ff0

# The location of the metadata service (SONG)
metadata.url=https://submission-song.rdpc.cancercollaboratory.org

# The location of the object storage service (SCORE)
storage.url=https://submission-score.rdpc.cancercollaboratory.org
```

## How to Upload Molecular Data

### Step 1. Prepare molecular metadata sequencing_experiment payload

Before proceeding, please read the instructions on how to [prepare and validate](/docs/submission/molecular-data-prep) molecular metadata payloads.

### Step 2. Upload the metadata file

Once you have formatted the payload correctly, use the song-client `submit` command to upload the payload.

```shell
bin/sing submit -f dash-5-tumour.json
```

If your payload is not formatted correctly, you will receive an error message detailing what is wrong. Please fix any errors and resubmit. If your payload is formatted correctly, you will get an `analysisId` in response:

```json
{
  "analysisId": "a4142a01-1274-45b4-942a-01127465b422",
  "status": "OK"
}
```

At this point, since the payload data has successfully been submitted and accepted by Song, it is now referred to as an analysis. The newly created analysis will be state `UNPUBLISHED`.

### Step 3. Generate a manifest file

Use the returned `analysis_id` from step 2 to generate a manifest for file upload. This manifest will be used with the score-client in the next step. Using the song-client `manifest` command, define

- the analysis id using `-a` parameter
- the location of your input files with the `-d` parameter,
- the output file path for the manifest file with the `-f` parameter

```shell

bin/sing manifest -a a4142a01-1274-45b4-942a-01127465b422 -f /some/output/dir/manifest.txt  -d /submitting/file/directory

Wrote manifest file 'manifest.txt' for analysisId 'a4142a01-1274-45b4-942a-01127465b422'
```

The `manifest.txt` file will be written out to the directory /some/output/dir/. If the output directory does not exist, it will be automatically created.

### Step 4. Upload sequencing files

Using the score-client `upload` command, upload all files associated with the payload. This requires the manifest file generated in step 3.

```shell
bin/score-client  upload --manifest manifest.txt
```

If the file(s) successfully upload, then you will receive an `Upload completed` message.

### Step 5. Publish the analysis

The final step to submitting molecular data is to set the state of an analysis to `PUBLISHED`. A published analysis signals to the DCC that this data is ready to be processed.

```shell
bin/sing publish -a a4142a01-1274-45b4-942a-01127465b422

AnalysisId a4142a01-1274-45b4-942a-01127465b422 successfully published
```

Once your `sequencing_experiment` analysis has been successfully submitted and published, it will be queued for data processing. You can follow the progress of [molecular data processing](/docs/analysis-workflows/analysis-overview) for submitted data on your [Program Dashboard](/docs/submission/submitted-data).

### Troubleshooting help

#### Upload error

During upload, a temporary file is written to the directory where the file that is being uploaded is located. If you do not have permission to write to this directory, the upload will fail. To address this, update the score-client `conf/application.properties` configuration file with a `client.uploadStateDir` parameter.

```yaml title="score-client config"
# The access token for authorized access to data
accessToken=92038829-338c-4aa2-92fc2-a3c241f63ff0

# The location of the metadata service (SONG)
metadata.url=https://submission-song.rdpc.cancercollaboratory.org

# The location of the object storage service (SCORE)
storage.url=https://submission-score.rdpc.cancercollaboratory.org

# Optional absoloute path of a directory to write temporary progress files.
client.uploadStateDir=/dir/with/write/access/scratch
```

Once you have updated the configuration, use the `--force` option to reinitiate the upload.

```shell
bin/score-client  upload --manifest manifest.txt --force
```
