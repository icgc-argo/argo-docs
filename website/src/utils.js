const schemasAvailable = require('../static/data/schemas/schema-versions.json');

export const getLatestVersion = () => schemasAvailable.sort().slice(-1)[0];
