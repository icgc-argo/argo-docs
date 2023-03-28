---
id: data-download
title: Accessing and Downloading Data
platform_key: DOCS_DATA_DOWNLOAD
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The [ICGC ARGO Data Platform](https://platform.icgc-argo.org/) contains a harmonized dataset against the latest reference genome, GRCh38. For information on the data analysis and data types, please see [Analysis Pipeline](/docs/analysis-workflows/analysis-overview) documentation.

## Data Download

The ARGO Data Platform uses the score-client as a file download manager. The score-client facilitates the transfer of data with resumable downloads and has built in BAM/CRAM slicing to make data download fast and smooth.

Please note:

- downloads are done in parts and can be resumed as needed
- the score-client will automatically resume downloads if interrupted or paused briefly

## Searching for Files

Platform users can search for a file set of interest using the File Repository. File sets can be narrowed down by selecting specific values in the filter panel on the left side of the page. Once you have a file set identified, click the `Download > File Manifest` on the top right side of the table to download a TSV file manifest.

The file manifest contains a list of the files that match your search query, along with some additional metadata to assist in file identification. The file manifest will be used by the score-client to identify the list of files to download.

> NOTE: Clinical data can be downloaded by any user and does not require the score-client. In order to download controlled molecular data, you **must have ICGC DACO approval for access to controlled data**. Learn more about the [DACO application process here](/docs/data-access/daco/applying), or [apply for DACO approval here](https://daco.icgc-argo.org/).

## Installing the score-client

The score-client can be run in different ways depending on your operating system or setup:

- If you are on Windows, use the score-client Docker distribution.
- If you are on a Unix system (IOS/Linux) you can use the Docker distribution, or score-client directly.

### Prerequisites

Using the `score-client` directly requires Java 11 to be installed. The procedure for installing OpenJDk 11 will vary depending on the operating system and package manager used.

```shell
apt-get install openjdk-11-jdk
```

If using the Docker distribution, Java is bundled and does not need to be installed.

By default the score-client is configured to use a maximum of 8G of RAM. Most of time this is more than sufficient for fast downloads.

### Distributions

<!---  Tabs start here -->

<Tabs
groupId="operating-systems"
defaultValue="Client"
values={[
{ label: 'Client', value: 'Client', },
{ label: 'Client with ENV variables', value: 'Client-ENV', },
{ label: 'Docker', value: 'Docker', },
]
}>
<TabItem value="Docker">

Pull the latest version of the score-client Docker distribution:

```shell
docker pull overture/score
```

Once pulled, you can open a shell in the container by executing:

```shell
docker run -it overture/score
score-client
```

Update the docker configuration with your user values, including:

- **METADATA_URL**: the file metadata Song server URL
- **STORAGE_URL**: the object storage Score server URL
- **ACCESSTOKEN**: your personal [API Token](/docs/data-access/user-profile-and-api-token)

```shell
docker run -it -e "METADATA_URL=https://api.platform.icgc-argo.org/storage-api" -e "STORAGE_URL=https://api.platform.icgc-argo.org/storage-api" -e "ACCESSTOKEN=92038829-338c-4aa2-92fc2-a3c241f63ff0" overture/score
```

There is no entry point or command defined for the image. The software is located at score-client which is also the working directory of the container.

</TabItem>
<TabItem value="Client-ENV">

Download the **[latest version of the score-client](https://artifacts.oicr.on.ca/artifactory/dcc-release/bio/overture/score-client/[RELEASE]/score-client-[RELEASE]-dist.tar.gz)**. Once you have unzipped the tarball, change directories into the unzipped folder:

```shell
wget -O score-client.tar.gz https://artifacts.oicr.on.ca/artifactory/dcc-release/bio/overture/score-client/[RELEASE]/score-client-[RELEASE]-dist.tar.gz

tar xvzf score-client.tar.gz

## Note: Once unzipped, the final directory will be suffixed with the latest release number.
cd score-client-<latest-release-number>
```

You can define required inputs as ENV variable, stored on system or defined with each client operation:

- **METADATA_URL**: the file metadata Song server URL
- **STORAGE_URL**: the object storage Score server URL
- **ACCESSTOKEN**: your personal [API Token](/docs/data-access/user-profile-and-api-token)

For example to download files with a manifest:

```shell
METADATA_URL=https://api.platform.icgc-argo.org/storage-api STORAGE_URL=https://api.platform.icgc-argo.org/storage-api bin/score-client download --manifest manifest1.txt
```

</TabItem>
<TabItem value="Client">

Download the **[latest version of the score-client](https://artifacts.oicr.on.ca/artifactory/dcc-release/bio/overture/score-client/[RELEASE]/score-client-[RELEASE]-dist.tar.gz)**. Once you have unzipped the tarball, change directories into the unzipped folder:

```shell
wget -O score-client.tar.gz https://artifacts.oicr.on.ca/artifactory/dcc-release/bio/overture/score-client/[RELEASE]/score-client-[RELEASE]-dist.tar.gz

tar xvzf score-client.tar.gz

## Note: Once unzipped, the final directory will be suffixed with the latest release number.
cd score-client-<latest-release-number>
```

Update the `conf/application.properties` file with your user values, including:

- **accessToken**: your personal [API Token](/docs/data-access/user-profile-and-api-token)
- **metadata.url**: the file metadata Song server URL
- **storage.url**: the object storage Score server URL

This is an example of how your `application.properties` configuration file should look:

```yaml
# The access token for authorized access to data
accessToken=92038829-338c-4aa2-92fc2-a3c241f63ff0

# The location of the metadata service (SONG)
metadata.url=https://api.platform.icgc-argo.org/storage-api

# The location of the object storage service (SCORE)
storage.url=https://api.platform.icgc-argo.org/storage-api
```

Once you have configured your `application.properties`, you will be ready to use the score-client.

</TabItem>
</Tabs>

<!---  Tabs end here -->

## Score-client Usage

This section provides information on how to use the score-client once it has been properly downloaded and configured according to the [distribution type](/docs/data-access/data-download#distributions).

The score-client has the general syntax:

```shell
score-client [options] [command] [command options]
```

It offers a set of commands, where each command has its own set of options to influence its operation. You can find all options with `--help`:

```
  Options:
        --silent
       Do not produce any informational messages
       Default: false
        --help
       Show help information
       Default: false
        --profile
       Define environment profile used to resolve configuration properties
       Default: default
        --quiet
       Reduce output for non-interactive usage
       Default: false
        --version
       Show version information
       Default: false
  Commands:
    view      Locally store/display some or all of a remote SAM/BAM file object
    version   Display application version information
    mount     Mount a read-only FUSE file system view of the remote storage repository
    url       Resolve the URL of a specified remote file object
    help      Display help information for a specified command name
    info      Display application configuration information
    manifest  Resolve a file object manifest and display it
    download  Retrieve file object(s) from the remote storage repository
    upload    Upload file object(s) to the remote storage repository
```

## Download

### Download a list of files by manifest

> NOTE: You will experience some warnings when downloading files by manifest, however you should still be able to proceed with the download. This is a known issue that will be fixed in an upcoming release.

Using a manifest is ideal for downloading multiple files identified through the [ARGO Platform](https://platform.icgc-argo.org/repository).

Run the score-client using the `download` command. Define your options:

- **--manifest** : location of the manifest file listing files to be downloaded
- **--output-dir**: location you want the downloaded files to be written to

For example:

```shell
bin/score-client download --manifest ./directory-path/score-manifest.20200520.tsv --output-dir ./output-directory-path
```

The optional `--output-layout` option can be used to organize the downloads into a couple of predefined directory layouts. See the `--help` option for additional information.

### Download a single file by object ID

Run the score-client using the `download` command. Define your options:

- **--object-id** : object-id of the file to be downloaded
- **--output-dir**: directory location you want the downloaded files to be written to

For example:

```shell
bin/score-client download --object-id ce86a332-407a-11eb-b378-0242ac130002 --output-dir ./output-directory-path
```

You can also specify multiple object id's separated by spaces:

```shell
bin/score-client download --object-id ddcdd044-adda-5f09-8849-27d6038f8ccd 5cc35183-9291-5711-967d-30afcf20e71f --output-dir data
```

## BAM/CRAM Slicing

The view command is a minimal version of [samtools](http://www.htslib.org/doc/samtools.html) view. You can view a “genomic slice” of the remote BAM file, freeing the user from having to download the entire file locally, saving bytes and time.

The following example will download reads overlapping the region 1 - 10,000 on chromosome 1:

```shell
bin/score-client view --object-id ddcdd044-adda-5f09-8849-27d6038f8ccd --query 1:1-10000
```

The BAI is automatically discovered and streamed as part of the operation. For quickly accessing only the BAM header one can issue:

```shell
bin/score-client view --header-only --object-id ddcdd044-adda-5f09-8849-27d6038f8ccd
```

It is also possible to pipe the output of the above to `samtools`, etc. for pipelining a workflow:

```shell
bin/score-client view --object-id ddcdd044-adda-5f09-8849-27d6038f8ccd --query 1:1-100000 | samtools mpileup -
```

## FUSE Mounting

The mount command can be used to mount the remote S3 bucket as a read-only FUSE file system. This is very useful to browse and explore the available files, as well as quickly see their size and date of modification using common commands such as `ls`, `find`, `du` and `tree`. It also works very well with standard analysis tools such as `samtools`.

In order to use the mount feature, `FUSE` is required. On most Linux based systems, this will require installing `libfuse-dev`, `fuse` and other packages. Below is the command to install them on Ubuntu.

```shell
sudo apt-get install -y libfuse-dev fuse curl wget software-properties-common
```

Files are organized into a virtual directory structure. The following shows the default bundle layout:

```
/bundleId1/fileName1
/bundleId1/fileName2
...
/bundleId1/fileNamei
...
/bundleIdn/fileName1
/bundleIdn/fileName2
...
/bundleIdn/fileNamej
```

where `bundleId` and `fileName` are the original Bundle ID and file name of the file respectively. It is possible to control the layout using the `--layout` option. Using `--layout object-id` will instead produce a flat list of files named by their associated object id.

The file system implementation's performance is optimized for serial reads. Frequent random access patterns will lead to very poor performance. Under the covers, each random seek requires a new HTTP connection to S3 with the appropriate Range header set which is an expensive operation. For this reason, it is only recommended for streaming analysis (e.g. `samtools view` like functionality).

### Mount a manifest of files

<!---  Tabs start here -->

<Tabs
groupId="operating-systems"
defaultValue="Client"
values={[
{ label: 'Client', value: 'Client', },
{ label: 'Docker', value: 'Docker', },
]
}>
<TabItem value="Client">

```shell
# Create the mount point
sudo mkdir /mnt/icgc-argo
sudo chmod 777 /mnt/icgc-argo

# Mount
bin/score-client mount --mount-point /mnt/icgc-argo --manifest manifest_file_name.txt --cache-metadata
```

Once mounted, you can use standard analysis tools against files found under the mount point:

```shell
samtools view /mnt/icgc/fff75930-0f8c-4c99-9b48-732e7ed4c625/443a7a6ab964e41c011cc9a303bc086c.bam 1:10000-20000
```

</TabItem>

<TabItem value="Docker">

To avoid having to install the FUSE and Java dependencies when working with the mount command, it is very convenient to mount from within a Docker container. This is also useful for creating a custom image for analysis that derives from the one published by ICGC. First, ensure that both Docker and the score-client image are installed.

Next, export your personal [API Token](/docs/data-access/user-profile-and-api-token) generated from the ARGO Data Platform:

```shell
# Export access token, please replace accessToken with your own token
export ACCESSTOKEN=92038829-338c-4aa2-92fc2-a3c241f63ff0
```

And then mount the file system inside the container against the empty /mnt directory:

```shell
# Alias for ease of use
alias docker-score-client="docker run -it --rm -e ACCESSTOKEN --privileged -v `pwd`:/score-client/manifest overture/score bin/score-client"

# Mount the file system in the container
docker-score-client mount --mount-point /mnt --manifest manifest_file_name.txt
```

Note that the `--privileged` Docker option is required for FUSE in order to access the host's /dev/fuse device.

In another terminal, you can access the newly mounted file system:

```shell
# List all files recursively
docker exec -it $(docker ps -lq) find /mnt
```

To perform analysis within the container:

```shell
# Open a shell in the previously created container
docker exec -it $(docker ps -lq) bash

# Install samtools
apt-get install samtools

# Slice
samtools view /mnt/fff75930-0f8c-4c99-9b48-732e7ed4c625/443a7a6ab964e41c011cc9a303bc086c.bam 1:10000-20000
```

</TabItem>
</Tabs>

<!---  Tabs end here -->

## Additional Data Sources

In addition to the latest harmonized data on the ICGC ARGO Platform, you can also access legacy data from the ICGC 25K project.

- [ICGC 25K Data Portal](https://dcc.icgc.org/): Contains a compiled dataset against the GRCh37 reference genome.
  - For more information, consult the [ICGC 25K Data Download documentation](https://docs.icgc.org/download/downloading-data/.).
- [EGA Data Portal](https://ega-archive.org/): Contains raw datasets of data submitted to ICGC 25k.
  - Data can only be downloaded through their [EGA download client](https://ega-archive.org/download/downloader-quickguide-APIv3#DownloadClient), but metadata may be viewed on their website. Files are grouped into datasets based on the study they were collected in, and access is granted on a dataset by dataset basis. This repository carries both ICGC and non-ICGC data.
  - For more information, consult the [Guide to Data Access](https://ega-archive.org/access/data-access).
