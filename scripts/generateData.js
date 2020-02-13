const chalk = require('chalk');
const get = require('lodash/get');
const find = require('lodash/find');

function generateTreeData(data) {
  console.log('data', data);
  const schemas = get(data, 'schemas', []);

  // keep track of nesting of schema
  const treeNestedMap = {};

  const constructedTreeData = schemas.reduce((treeData, schema) => {
    const schemaName = schema.name;
    // const fields = schema.fields.map(field => ({
    //   name: field.name,
    //   required: get(field, 'restrictions.required', false),
    //}));
    const parent = get(schema, 'meta.parent', null);
    const treeSchema = { name: schemaName, children: [] }; //fields,

    /**
     * no parent adds schema directly to treeData
     * it's nested path is just it's name
     */
    if (!parent) {
      treeNestedMap[schemaName] = [schemaName];
      treeData[schemaName] = treeSchema;
    } else {
      if (!treeNestedMap[parent]) {
        treeNestedMap[schemaName] = [parent, schemaName];
        treeNestedMap[parent] = [parent];
        treeData[parent] = { name: parent, children: [treeSchema] };
      } else {
        const paths = treeNestedMap[parent];

        const findParent = (tree, paths) =>
          paths.reduce((acc, path, i) => {
            if (i % 2 === 0) {
              return acc[path];
            } else {
              return find(acc, { name: path });
            }
          }, tree);

        const pData = findParent(treeData, paths);

        //        const parentData = get(treeData, nestedPath, null);
        //let newParentData = { ...pData, children: pData.children.concat(treeSchema) };
        let newParentData = null;
        // schema already has children, use it's current object
        if (treeNestedMap[schemaName]) {
          const currentSchemaObj = treeData[schema.name];
          newParentData = { ...pData, children: pData.children.concat(currentSchemaObj) };
          // update mapping
        } else {
          newParentData = { ...pData, children: pData.children.concat(treeSchema) };
        }

        const ntree = { ...treeData };
        // update tree map
        //treeData[''] = newParentData;
        const newTreeData = { ...treeData, [parent]: newParentData };
        return newTreeData;
      }
    }

    return treeData;
  }, {});

  const tree = {};
  console.log(chalk.yellow('Generating tree data..'));
  return constructedTreeData;
}

module.exports = { generateTreeData };
