const config = () => {
  const isDev = process.env.IS_DEV === 'true' ? true : false;

  const dataPath = `./data/${isDev ? 'test' : 'prod'}/schemas`;
  return {
    apiRoot: isDev ? process.env.TEST_LECTERN_ROOT : process.env.LECTERN_ROOT,
    dictionaryName: isDev ? process.env.TEST_DICTIONARY_NAME : process.env.DICTIONARY_NAME,
    schemaPath: dataPath,
    versionsFilename: `${dataPath}/schema-versions.json`,
    dataDirPath: dataPath,
    dataFilename: '../website/src/pages/dictionary/data.json',
    dataFileTreeName: '../website/src/pages/dictionary/tree.json',
  };
};

export default config;
