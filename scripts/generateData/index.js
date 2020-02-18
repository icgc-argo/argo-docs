const chalk = require('chalk');
const get = require('lodash/get');
const find = require('lodash/find');
const pickBy = require('lodash/pickBy');
/**
 * Generates tree structure for tree viz
 * ! Assumes single root node
 */
function generateTreeData(data) {
  const schemas = get(data, 'dictionary.schemas', []);

  // keep track of nesting of schema
  //   /const treeNestedMap = {};

  const constructedTreeData = schemas.reduce((treeData, schema) => {
    const { name, required, fields: schemaFields } = schema;
    const schemaName = name;

    const fields = schemaFields.map(field => ({
      name: field.name,
      required: get(field, 'restrictions.required', false),
    }));
    const parentName = get(schema, 'meta.parent', null);
    const currentTreeSchema = pickBy(
      { name: schemaName, fields, required: required, children: [] },
      value => value != null,
    );

    console.log('current tree schema', currentTreeSchema);
    //treeData[schemaName] = currentTreeSchema;
    if (parentName) {
      //if(Object.keys(map).includes(parent)) {
      // const parentSchema = getPath();
      console.log('tD', treeData.children);

      const parentSchema =
        parentName === treeData.name
          ? treeData
          : treeData.children.find(childSchema => childSchema.name === parentName);

      console.log('parent schema', parentSchema);
      const updatedParent = {
        ...parentSchema,
        children: parentSchema.children.concat(currentTreeSchema),
      };
      console.log('update', updatedParent);
      //}
      return { ...treeData, ...updatedParent };
    } else {
      return { ...treeData, ...currentTreeSchema };
    }
    console.log('tree data', treeData);
    return treeData;
  }, {});

  console.log('cstree data', constructedTreeData);
  return constructedTreeData;
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
 */
