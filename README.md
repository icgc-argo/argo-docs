# ICGC-ARGO Doc Site

User documentation for the ICGC-ARGO platform.

## Visit Site

[ICGC-ARGO Platform - User Documentation](https://docs.icgc-argo.org)

## Contents

This docs site has been generated using [Docusaurus](https://docusaurus.io/).

Documentation is written in [Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) and can be found in [/docs](docs).

The website, including the Docusaurus library, custom pages and components, and all styling is kept in [/website](website).

## Dependencies

To run the docs site requires the following:

- NodeJS version 15
  - This is done best using nvm (node version manager). A good summary of this process can be found here for your reference: https://gist.github.com/d2s/372b5943bce17b964a79
  - May work with other versions but is only tested with the specified version.

## Contributing

To contribute to the docs:

1. Clone the repository to your machine:

   ```
   git clone git@github.com:icgc-argo/argo-docs.git
   ```

1. Move into the website directory ...

   ```
   cd argo-docs/website
   ```

   ...and install dependencies via npm:

   ```
   npm ci --legacy-peer-deps
   ```

1. Setup Environment config:

   Copy the file `argo-docs/website/.env.example` to `argo-docs/website/.env`

   > **Note**  
   > This file contains the configuration for the Algolia search used on the site. It is not necessary to set correct values for this config to get the site to run. If you would like to have working Algolia search on while working on your local dev instance, reach out to another team member for the account values.

1. Run the development server to see your edits live in the browser:

   ```
   npm start
   ```

   The site should open in a new page in your browser at the address: [localhost:3000](http://localhost:3000)

1. Edit the markdown files in [/docs](docs)! The content in the browser will update whenever you save the file.

   For other changes to the site, see the extended editing guide in [/website](website):

   - add new documentation pages
   - modify the links in the Header or Footer
   - update the sidebar links

## Updating Dictionary Content

The Data Dictionary content is not updated dynamically when the dictionary is updated. Instead, the dictionary content is included as static files included in this repository. This allows the docs site to be completely static and not have to load the dictionary from the source everytime it is requested.

To simplify updating the dictionary content, the process has been scripted so it can be run by following the commands below. Files will be saved in `scripts/data` folder and then moved to website directory by `copy-data` script.

1. Pull latest code and branch off `develop`

2. Firstly create `.env` file based on the `.env.schema` file in the `scripts` folder.
   Ensure `LECTERN_ROOT` and `DICTIONARY_NAME` variables are set.

3. From the argo-docs root directory:

```
cd scripts
```

4. Install script dependencies:

```
npm ci
```

5. Run the 'Add Dictionary' script:

```
npm run add
```

6. Follow the prompts in the script - Use keyboard arrow keys to highlight the versions you want to add. Hit enter when you have selected the desired versions.

7. The script has added files in the following places:

   - /website/static/data/schemas/{{version number}}
   - /website/static/data/schemas/diffs/{{version number}}

   And modified the following files:

   - /website/static/data/schemas/schema-versions.json
   - /website/src/pages/dictionary/data.json

   Commit all these added and modified files to git. The following command will work from the argo-docs root directory:

   ```
   git add ./website/static/data/schemas/ ./website/src/pages/dictionary/data.json

   git commit
   ```

8. Open a PR in the Argo Docs github using `develop` as the base branch.

## Cleaning dictionary script data

```
npm run clean
```

Cleans `scripts/data` folder. Destructive action. Will remove everything. All versions will have to be added again.

## Generate links

External projects eg. `platform-ui` link to docs site. Sometimes urls change so we need to update code.
The following script is a convienence to help generate these new urls
It outputs constants into a file called `links.js`

```
npm run links
```

## Upgrading Docusaurus

- Increment each version and test for breaking changes
- nb. "swizzled" components are prone to breaking changes eg. prop name change
  - easy to find out new values by swizzling same component in new version of Docusaurus
- be sure to run `npm run build` to make sure build isn't broken
  - Docusaurus has some nice validators that run in the build step
- be sure to manual test site for breaking changes

# Styling

ref: https://github.com/facebook/docusaurus/issues/1763
docusaurus theme classic uses Infima stylesheets/component lib by default
This is still currently a private Facebook repo so it can be hard to find out where styles are coming from/what they're doing

Best approach right now is to swizzle a component and use Emotion as we are developing our own components simiarly.
