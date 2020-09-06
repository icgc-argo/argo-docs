# Generate data

Firstly create your `.env` file based on the `.env.schema` file in the `scripts` folder.
Make sure your `LECTERN_ROOT` and `DICTIONARY_NAME` are set.

The scripts will write data to either a `data/prod` folder, or a `data/test` and then copy it to the website directory. This is to provide an easy way to test data without worrying about keeping the prod data up to date.

To generate data run:

```
npm run add-prod-schema
```

or

```
npm run add-test-schema
```

# Generate links

External projects eg. `platform-ui` link to docs site. Sometimes urls change so we need to update code.
The following script is a convienence to help generate these new urls
It outputs constants into a file called `links.js`

```
npm run links
```
