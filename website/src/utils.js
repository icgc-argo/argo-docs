const schemasAvailable = require('../static/data/schemas/schema-versions.json');

export const getLatestVersion = () => schemasAvailable.sort().slice(-1)[0];

export const isSearchAvailable =
  !process.env.ALGOLIA_API_KEY || !process.env.ALGOLIA_INDEX ? false : true;
