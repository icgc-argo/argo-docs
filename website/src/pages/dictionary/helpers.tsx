import axios from 'axios';
import get from 'lodash/get';
import { ChangeType, Schema } from '../../../types';
import isEmpty from 'lodash/isEmpty';

/**
 *
 * @param schemas
 * @param diffs
 * Add diffs to schemas
 * Updated fields will be present already
 * Deleted fields will be present
 * Created fields/schemas need to be added explicitly as they have no related field/schema
 */
export const createSchemasWithDiffs = (schemas, diffs): Schema[] => {
  let schemasToAdd = Object.keys(diffs) || [];

  const schemaWithUpdates = schemas.map((schema) => {
    const schemaName = schema.name;
    const schemaDiff = diffs[schemaName];
    schemasToAdd = schemasToAdd.filter((s) => s !== schemaName);

    const { updated, created } = schemaDiff;
    // add diffs to existing fields
    const fieldsWithDiffs = schema.fields.map((field) => {
      const fieldName = field.name;
      const updatedField = updated[fieldName];
      const createdField = created[fieldName];

      // add diff fields for updated (need left and right data)
      const diff = updatedField ? updatedField : null;

      // add changetype
      const changeType = updatedField
        ? ChangeType.UPDATED
        : createdField
        ? ChangeType.CREATED
        : ChangeType.NONE;

      return { ...field, diff, changeType };
    });

    // newly created fields won't exist already, add them
    const newFields = Object.keys(schemaDiff.deleted).map((key) => ({
      ...schemaDiff.deleted[key],
      changeType: ChangeType.DELETED,
    }));

    // join all modified fields
    const fields = [...fieldsWithDiffs, ...newFields];

    // schema with diffs
    return { ...schema, fields };
  });

  // add created and deleted schemas
  const newSchemas = schemasToAdd.map((schemaName) => {
    const diffSchema = diffs[schemaName];
    const changeType = !isEmpty(diffSchema.created)
      ? ChangeType.CREATED
      : !isEmpty(diffSchema.deleted)
      ? ChangeType.DELETED
      : !isEmpty(diffSchema.updated)
      ? ChangeType.UPDATED
      : ChangeType.NONE;

    const allFields = { ...diffSchema.created, ...diffSchema.deleted };
    const fields = Object.keys(allFields).map((f) => allFields[f]);

    return {
      name: schemaName,
      changeType,
      description: diffSchema.description || '',
      fields,
    };
  });

  return [...schemaWithUpdates, ...newSchemas];
};

async function fetchDictionary(version) {
  try {
    const dict = await axios.get(`/data/schemas/${version}.json`);

    //const tree = await axios.get(`/data/schemas/${version}_tree.writeFile`);
    return { dict: dict.data, tree: null };
  } catch (e) {
    throw e;
  }
}

async function fetchDiff(version, diffVersion) {
  try {
    const response = await axios.get(
      `/data/schemas/diffs/${diffVersion}/${diffVersion}-diff-${version}.json`,
    );
    return response.data;
  } catch (e) {
    console.error('fetchDiff failed: ', e);
    return null;
  }
}

export const parseDiff = (diff) => {
  return diff
    .map((schemaFieldArray) => {
      const [schema, field] = schemaFieldArray[0].split('.');
      const { left, right, diff } = schemaFieldArray[1];
      return {
        schema,
        field,
        left,
        right,
        diff,
      };
    })
    .reduce((acc, { schema, field: fieldName, ...rest }) => {
      const fields = get(acc, [schema], {});
      fields[fieldName] = rest;
      acc[schema] = fields;
      return acc;
    }, {});
};

/**
 *
 * @param {string} version
 * @param {{data: Dictionary, version: string}} preloadedDictionary
 */
export const getDictionary = async (version, preloadedDictionary) => {
  // if (version === preloadedDictionary.version) return preloadedDictionary.data;
  const { dict, tree } = await fetchDictionary(version);
  return dict;
};

/**
 * @param {string} version
 * @param {string} diffVersion
 */
export const getDictionaryDiff = async (version, diffVersion) => {
  const diff = await fetchDiff(version, diffVersion);
  return diff;
  //return parseDiff(diff);
};
