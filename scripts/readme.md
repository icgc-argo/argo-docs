# Generate data

To generate data run:

```
npm run add
```

this will generate data for production and move into the website for deployment.

To generate test data, add the `--test` flag.
This will generate data using `TEST_` env variables and will move it into website deployment for testing

```
npm run add -- --test
```

# Generate links

External projects eg. `platform-ui` link to docs site. Sometimes urls change so we need to update code.
The following script is a convienence to help generate these new urls
It outputs constants into a file called `links.js`

```
npm run links
```
