import { ChangeType } from '../../components/Schema';
import { Schema } from '../../ts/interfaces/schema';
import axios from 'axios';
import get from 'lodash/get';

/**
 *
 * @param schemas
 * @param diffs
 * Add diffs to schemas
 */
export const createSchemasWithDiffs = (schemas: Array<Schema>, diffs) => {
  const schemasWithDiffs = schemas.map((schema) => {
    const schemaName = schema.name;
    const schemaDiff = diffs[schemaName];

    const existingFieldDiffs = { ...schemaDiff.updated, ...schemaDiff.deleted };

    // add diffs to existing fields
    const fieldsWithDiffs = schema.fields.map((field) => {
      const fieldName = field.name;

      const diff = existingFieldDiffs[fieldName] || { changeType: 'unchanged' };

      return { ...field, diff };
    });

    // newly created fields won't exist already, add them
    const newFields = Object.keys(schemaDiff.created).map((key) => schemaDiff.created[key]);

    // join all modified fields
    const fields = [...fieldsWithDiffs, ...newFields];

    // schema with diffs
    return { ...schema, fields };
  });

  return schemasWithDiffs;
};

export async function fetchDictionary(version) {
  try {
    const dict = await axios.get(`/data/schemas/${version}.json`);
    //const tree = await axios.get(`/data/schemas/${version}_tree.writeFile`);
    return { dict: dict.data, tree: null };
  } catch (e) {
    throw e;
  }
}

export async function fetchDiff(version, diffVersion) {
  const response = await axios.get(
    `/data/schemas/diffs/${version}/${version}-diff-${diffVersion}.json`,
  );
  return response.data;
}

export const parseDiff = (diff) => {
  console.log(diff);
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
  if (version === preloadedDictionary.version) return preloadedDictionary.data;
  const { dict, tree } = await fetchDictionary(version);
  return dict;
};

/**
 * @param {string} version
 * @param {string} diffVersion
 */
export const getDictionaryDiff = async (version, diffVersion) => {
  const diff = await fetchDiff(version, diffVersion);
  return parseDiff(diff);
};
/* 
export const resolveSchemaDiffs = (schemas: Array<Schema>, diffs) => {
  console.log('schemas', schemas, 'diffs', diffs);
  const dictionarySchemaNames = new Set();
  schemas.forEach((schema) => dictionarySchemaNames.add(schema.name));

  const resolvedSchemas = Object.keys(diffs).reduce((acc, diffSchemaName) => {
    const diffSchema = diffs[diffSchemaName];
    const { created, deleted, updated, description = 'destription' } = diffSchema;
    if (dictionarySchemaNames.has(diffSchemaName)) {
      // field needs updating
      const schema = updateSchemaFields(
        schemas.find((schema) => schema.name === diffSchemaName),
        diffSchema,
      );
      return acc.concat(schema);
    } else {
      // created or deleted field
      return acc.concat({
        name: diffSchemaName,
        fields: [...diffObjectToArray(created), ...diffObjectToArray(deleted)],
        description,
      });
    }
  }, []);

  return resolvedSchemas;
};

/**
 * @param schema
 * @param schemaDiff
 * add diff data to object
 *
const updateSchemaFields = (schema, schemaDiff) => {
  const { created = {}, deleted = {}, updated = {} } = schemaDiff;
  const deletedFields = Object.values(deleted);

  // if a field has been created or updated, add this data
  const allFields = schema.fields
    .map((field) => {
      const fieldName = field.name;
      return updated[fieldName]
        ? { ...field, diff: updated[fieldName], changeType: ChangeType.UPDATED }
        : created[fieldName]
        ? { ...field, diff: updated[fieldName], changeType: ChangeType.CREATED }
        : field;
    })
    // add deleted fields
    .concat(
      deletedFields.map(({ name, ...rest }) => ({
        changeType: ChangeType.DELETED,
        name,
        diff: rest,
      })),
    );

  return { ...schema, fields: allFields };
};

const diffObjectToArray = (diff) => Object.entries(diff).map((fieldPair) => fieldPair[1]);
 */
