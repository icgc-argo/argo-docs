const chalk = require('chalk');
const get = require('lodash/get');
const pickBy = require('lodash/pickBy');
/**
 * Generates tree structure for tree viz
 * ! Assumes single root node
 */

// TODO can probably just pass schemas
function generateTreeData(data) {
  const schemas = get(data, 'schemas', []);

  // keep track of nesting of schema
  //   /const treeNestedMap = {};

  const tree = [];

  const mapping = schemas.reduce((mapp, schema) => {
    mapp[schema.name] = { ...schema, children: [] };
    return mapp;
  }, {});

  Object.keys(mapping).forEach(schemaKey => {
    const schema = mapping[schemaKey];
    const parentName = get(schema, 'meta.parent', null);

    if (parentName) {
      mapping[parentName]['children'].push(schema);
    } else {
      tree.push(schema);
    }
  });

  return tree;
}

module.exports = generateTreeData;

/**
 *  /**
     * no parent adds schema directly to treeData
     * it's nested path is just it's name
     
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

          ========


function generateTreeData(data) {
  const schemas = get(data, 'schemas', []);

  // keep track of nesting of schema
  //   /const treeNestedMap = {};

  const temp = {};

  const constructedTreeData = schemas.reduce((treeData, schema) => {
    // pull out fields
    const { name, required, fields: schemaFields } = schema;
    const schemaName = name;

    const fields = schemaFields.map(field => ({
      name: field.name,
      required: get(field, 'restrictions.required', false),
    }));
    const parentName = get(schema, 'meta.parent', null);
    const children = temp[schemaName] ? temp[schemaName] : [];
    // TODO: Delete temp key
    const currentTreeSchema = pickBy(
      { name: schemaName, fields, required: required, children },
      value => value != null,
    );

    if (parentName) {
      temp[parentName] = [currentTreeSchema];
      console.log();
      if (parentName === treeData.name) {
        return { ...treeData, children: treeData.children.concat(currentTreeSchema) };
      }
    } else {
      const builtTree = temp[schemaName];
      return { ...currentTreeSchema, children: builtTree ? builtTree : [] };
    }
    return treeData;
  }, {});
  console.log('TEMP', temp);
  return constructedTreeData;
 */
