const config = () => {
  return {
    apiRoot: process.env.LECTERN_ROOT,
    dictionaryName: process.env.DICTIONARY_NAME,
  };
};

export default config;
