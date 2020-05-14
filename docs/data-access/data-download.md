---
id: data-download
title: How to Download Data
---

The ARGO Data Platform uses the score-cient as a file download manager. Score facilitates the transfer of data with resumable download and built in BAM/CRAM slicing to make data download transfer fast and smooth.

Please note:

- Downloads are done in part and can be paused/resumed as needed
- The score-client will automatically resume downloads if interrupted or paused briefly

## Searching for Files

Use the Platform [File Repository](https://platform.icgc-argo.org/repository) to search for a file set of interest. Query results can be narrowed down by selecting specific file values in the facet filters on the left side of the page. Once you have a file set identified, click `Download > File Manifest` on the top right of the table to download a TSV file manifest.

The file manifest will contain a listing of the files that matched your query, along with some additional metatdata to assist in file identification. This file manifest will be used by the score-client as a list of files to download.

> NOTE: Clinical data can be downloaded by any user. In order to download controlled molecular data, you **must have ICGC DACO approval**. Learn more about the [DACO application process here](data-access), or [apply for DACO approval here](https://icgc.org/daco).

## Installing the Score-Client

The score-client can be run in different ways depending on your operating system or setup:

- If you are on Windows, use the Docker distribution
- If you are on a Unix system (IOS/Linux) you can use the Docker distribution, or score-client directly.

## Installing the Score-Client to Download Files

### Docker Distribution

Pull the latest version of the Score Docker distribution:

```
docker pull overture/score
```

Use the docker run command with the correct variables specified. You will need to define:

- your personal [API Key](user-profile-and-token)
- the file metadata Song server URL
- the object storage Score server URL
- the absoloute directory path where your file manifest is located
- an output directory path

```
docker run --rm -it -e "METADATA_URL=https://song.argo.cancercollaboratory.org" -e "STORAGE_URL=https://score.argo.cancercollaboratory.org" -e "ACCESSTOKEN=92038829-338c-4aa2-92fc2-a3c241f63ff0" -v "C:\Users\username\Desktop\directory-path\" overture/score:latest score-client download --manifest /directory-path/score-manifest.20200520.tsv --output-dir C:\Users\rbajari\Desktop\download\
```

### Score-client with Configured Values

Download the **[latest version of the Score-client](https://artifacts.oicr.on.ca/artifactory/dcc-release/bio/overture/score-client/[RELEASE]/score-client-[RELEASE]-dist.tar.gz)**.
Once you have unzipped the tarball, update the `/conf/application.properties` configuration file with the correct user values, including:

- your personal [API Key](user-profile-and-token)
- the file metadata Song server URL
- the object storage Score server URL

This is an example of how your `application.properties` configuration file should look:

```yaml
# The access token for authorized access to data
accessToken=92038829-338c-4aa2-92fc2-a3c241f63ff0

# The location of the metadata service (SONG)
metadata.url=https://song.argo.cancercollaboratory.org

# The location of the object storage service (SCORE)
storage.url=https://score.argo.cancercollaboratory.org
```

Once you have configured your `application.yaml`, you will be ready to initiate your download. Run the score-client from within the `/bin` directory using the `download` command.

```
score-client-3.1.1/bin/score-client download --manifest ./directory-path/score-manifest.20200520.tsv --output-dir ./output-directory-path
```

### Score-client with Environment Variables

Download the **[latest version of the Score-client](https://artifacts.oicr.on.ca/artifactory/dcc-release/bio/overture/score-client/[RELEASE]/score-client-[RELEASE]-dist.tar.gz)**.
Alternately, you can define environment variables to specify the correct

```
METADATA_URL=http://localhost:12345 STORAGE_URL=http://localhost:23456 score-client download --manifest manifest1.txt
```

//// need details of if the ENV means you have to define acceess token as an env variable???

## BAM Slicing
