---
id: data-download
title: How to Download Data
platform_key: DOCS_DATA_DOWNLOAD
---

The ARGO Data Platform uses the score-client as a file download manager. The score-client facilitates the transfer of data with resumable download and has built in BAM/CRAM slicing to make data download fast and smooth.

Please note:

- downloads are done in parts and can be paused/resumed as needed
- the score-client will automatically resume downloads if interrupted or paused briefly

## Searching for Files

Platform users can search for a file set of interest using the File Repository. File sets can be narrowed down by selecting specific values in the filter panel on the left side of the page. Once you have a file set identified, click the `Download > File Manifest` on the top right side of the table to download a TSV file manifest.

The file manifest contains a list of the files that match your search query, along with some additional metadata to assist in file identification. The file manifest will be used by the score-client to identify the list of files to download.

> NOTE: Clinical data can be downloaded by any user and does not require the score-client. In order to download controlled molecular data, you **must have ICGC DACO approval**. Learn more about the [DACO application process here](/docs/data-access/data-access), or [apply for DACO approval here](https://icgc.org/daco).

## Installing the Score-Client

The score-client can be run in different ways depending on your operating system or setup:

- If you are on Windows, use the score-client Docker distribution.
- If you are on a Unix system (IOS/Linux) you can use the Docker distribution, or score-client directly.

## Installing the Score-Client to Download Files

### Docker Distribution

Pull the latest version of the score-client Docker distribution:

```
> docker pull overture/score
```

Use the `docker run` command with the correct variables specified. You will need to define:

- **ACCESSTOKEN**: your personal [API Token](/docs/data-access/user-profile-and-api-token)
- **METADATA_URL**: the file metadata Song server URL
- **STORAGE_URL**: the object storage Score server URL
- the absolute directory path where your file manifest is located
- an output directory path

```shell
> docker run --rm -it -e "METADATA_URL=https://song.rdpc.cancercollaboratory.org" -e "STORAGE_URL=https://score.rdpc.cancercollaboratory.org" -e "ACCESSTOKEN=92038829-338c-4aa2-92fc2-a3c241f63ff0" -v "C:\Users\username\Desktop\directory-path\" overture/score:latest score-client download --manifest /directory-path/score-manifest.20200520.tsv --output-dir C:\Users\username\Desktop\download\
```

### Score-Client with Configured Values

Download the **[latest version of the score-client](https://artifacts.oicr.on.ca/artifactory/dcc-release/bio/overture/score-client/[RELEASE]/score-client-[RELEASE]-dist.tar.gz)**. Once you have unzipped the tarball, change directories into the unzipped folder:

```shell
> wget -O score-client.tar.gz https://artifacts.oicr.on.ca/artifactory/dcc-release/bio/overture/score-client/[RELEASE]/score-client-[RELEASE]-dist.tar.gz

> tar xvzf score-client.tar.gz

## Note: Once unzipped, the final directory will be suffixed with the latest release number.
> cd score-client-<latest-release-number>
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
metadata.url=https://song.rdpc.cancercollaboratory.org

# The location of the object storage service (SCORE)
storage.url=https://score.rdpc.cancercollaboratory.org
```

Once you have configured your `application.properties`, you will be ready to initiate your download. Run the score-client from within the `/bin` directory using the `download` command.

```shell
> score-client-3.1.1/bin/score-client download --manifest ./directory-path/score-manifest.20200520.tsv --output-dir ./output-directory-path
```

<!---
### Score-Client with Environment Variables

Download the **[latest version of the score-client](https://artifacts.oicr.on.ca/artifactory/dcc-release/bio/overture/score-client/[RELEASE]/score-client-[RELEASE]-dist.tar.gz)**.

Alternately, you can define environment variables to specify the correct paths. For example:

```shell
> METADATA_URL=https://song.rdpc.cancercollaboratory.org STORAGE_URL=https://score.rdpc.cancercollaboratory.org score-client download --manifest manifest1.txt
```

//// need details of if the ENV means you have to define aceess token as an env variable???


## BAM Slicing
-->
