---
id: data-download
title: How to Download Data
---

> NOTE: Clinical data can be downloaded by any user. In order to download controlled molecular data, you **must have ICGC DACO approval**. Learn more about the [DACO application process here](data-access), or [apply for DACO approval here](https://icgc.org/daco).

### Installing the Score-Client

Download the **[latest version of the Score-client](https://artifacts.oicr.on.ca/artifactory/dcc-release/bio/overture/score-client/[RELEASE]/score-client-[RELEASE}-dist.tar.gz)**. Once you have unzipped the tarball, update the `/conf/application.properties` configuration file with the correct user values, including:

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

### Searching for Files

Use the Platform [File Repository](https://platform.icgc-argo.org/repository) to search for a file set of interest. You can narrow file results down by key facet filters on the left side of the page. Once you have a file set identified, click `Download > File Manifest` to download a TSV file manifest.

The file manifest will contain a listing of the files that matched your query, along with some additional metatdata to assist in file identification.

### Using the Score-client to Download Files

Once you have identified files of interest and have downloaded a file manifest from the ARGO Platform, you will be ready to initiate your download. Run the score-client from within the `/bin` directory using the `download` command.

```
score-client-3.1.1/bin/score-client --profile collab download --manifest ./directory-path/score-manifest.20200520.tsv --output-dir ./output-directory-path
```

Please note:

- Downloads are done in part and can be paused/resumed as needed
- The score-client will automatically resume downloads if interrupted or paused briefly
