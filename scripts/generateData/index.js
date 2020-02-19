const chalk = require('chalk');
const get = require('lodash/get');

/**
 * Generates tree structure for tree viz
 * Two pass to account for random order
 * Generates objects in first pass
 * Maps objects in second pass
 */
function generateTreeData(data) {
  const schemas = get(data, 'schemas', []);

  const mapping = schemas.reduce((mapp, schema) => {
    const { name, fields: schemaFields, required = false } = schema;
    const parentName = get(schema, 'meta.parent', '');
    const fields = schemaFields.map(field => ({
      name: field.name,
      required: get(field, 'restrictions.required', false),
    }));
    mapp[schema.name] = { name, fields, required, parentName, children: [] };
    return mapp;
  }, {});

  const tree = schemas.reduce((tree, schema) => {
    const mappedEl = mapping[schema.name];
    const parentName = mappedEl.parentName;

    if (parentName) {
      mapping[parentName]['children'].push(mappedEl);
    } else {
      return { ...tree, ...mappedEl };
    }
    return tree;
  }, {});

  return tree;
}

module.exports = generateTreeData;
