const config = () => {
  const isDev = process.env.IS_DEV === 'true' ? true : false;

  const schemaPath = `./data/${isDev ? 'test' : 'prod'}/schemas`;
  return {
    isDev,
    apiRoot: process.env.LECTERN_ROOT,
    dictionaryName: process.env.DICTIONARY_NAME,
    schemaPath,
    versionsFilename: `${schemaPath}/schema-versions.json`,
  };
};

export default config;
