import get from 'lodash/get';
import { ChangeType } from '../../website/types';

// gets fields, left null means created, right null means deleted
const checkDiff = (name, field, leftDiff, rightDiff) =>
  Object.entries(field).reduce((changes, val) => {
    const [fieldName] = val;
    const left = get(leftDiff, [name, fieldName], null);
    const right = get(rightDiff, [name, fieldName], null);

    changes[fieldName] = {
      left,
      right,
    };
    return changes;
  }, {});

// checks entire field deletions
const checkDeleted = (field) => {
  const changes = {};
  const deletedFields = field.data;
  for (let [key, value] of Object.entries(deletedFields)) {
    if (key === 'codeList') {
      changes[key] = { left: value, right: null, data: { added: [], deleted: value } };
    } else {
      changes[key] = { left: value, right: null };
    }
  }
  return changes;
};

const checkField = (field) => {
  const changes = {};
  const { left: leftDiff, right: rightDiff, diff } = field;

  if (diff.description) {
    changes['description'] = {
      left: get(leftDiff, 'description', null),
      right: get(rightDiff, 'description', null),
    };
  }

  if (diff.valueType) {
    changes['valueType'] = {
      left: get(leftDiff, 'valueType', null),
      right: get(rightDiff, 'valueType', null),
    };
  }

  const meta = diff.meta;

  if (meta) {
    'meta' in changes || (changes['meta'] = {});

    if (!meta.type) {
      // construct changes, null on left if created, null on right if deleted
      const metaChanges = checkDiff('meta', meta, leftDiff, rightDiff);
      changes['meta'] = metaChanges;
    }

    // add deleted fields
    else if (meta.type && meta.type === 'deleted') {
      changes['meta'] = { ...changes['meta'], ...checkDeleted(meta) };
    }
  }

  const restrictions = diff.restrictions;
  if (restrictions) {
    'restrictions' in changes || (changes['restrictions'] = {});

    if (!restrictions.type) {
      const restrictionsChanges = checkDiff('restrictions', restrictions, leftDiff, rightDiff);
      changes['restrictions'] = restrictionsChanges;
      if (restrictions.codeList) {
        const left = leftDiff.restrictions.codeList;
        const right = rightDiff.restrictions.codeList;
        changes['restrictions']['codeList'] = {
          left,
          right,
          //  created or deleted still needs data to be passed
          data: diff.restrictions.codeList.data,
        };
      }
    }

    // add deleted fields
    else if (restrictions.type && restrictions.type === 'deleted') {
      changes['restrictions'] = { ...changes['restrictions'], ...checkDeleted(restrictions) };
    }
  }

  return changes;
};

// created and deleted fields will just be displayed, no need to diff properties
const generateDiffChanges = (schemaDiff: any) =>
  schemaDiff.reduce(
    (acc, schemaFieldDiff) => {
      const schemas = acc.schemas;
      const [name, changes] = schemaFieldDiff;

      const { schemaName, fieldName } = parseDiffFieldName(name);
      // console.log(schemaName, fieldName, acc);
      const fieldChanges = changes.diff;

      schemaName in schemas ||
        (schemas[schemaName] = {
          [ChangeType.UPDATED]: {},
          [ChangeType.CREATED]: {},
          [ChangeType.DELETED]: {},
        });

      if (fieldChanges.type === ChangeType.CREATED || fieldChanges.type === ChangeType.DELETED) {
        // created or deleted field, pass data through, no diff field
        schemas[schemaName][fieldChanges.type][fieldName] = {
          changeType: fieldChanges.type,
          ...fieldChanges.data,
        };
      } else {
        // updated field, find out which fields updated
        schemas[schemaName][ChangeType.UPDATED][fieldName] = checkField(changes);
      }

      return { schemas };
    },
    { schemas: {} },
  );

const parseDiffFieldName = (fieldName: string): { schemaName: string; fieldName: string } => {
  const strArray = fieldName.split('.');
  return { schemaName: strArray[0], fieldName: strArray[1] };
};

export default generateDiffChanges;
