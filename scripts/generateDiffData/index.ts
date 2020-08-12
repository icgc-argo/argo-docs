import get from 'lodash/get';

type Meta = {
  validationDependency: boolean;
  primaryId: boolean;
  examples: string;
  notes: string;
  displayName: string;
  core: boolean;
};

type Field = {
  name: string;
  valueType: string;
  description: string;
  meta: Meta;
  restrictions: {
    required: boolean;
    regex: string;
    script: string;
  };
};

type FieldDiff = {
  valueType?: string;
  description?: {
    type: string;
    data: string;
  };
  meta?: {
    type: string;
    data: Meta;
  };
  restrictions?: {
    required?: {
      type: string;
      data: boolean;
    };
    codeList?: {
      type: string;
      data: {
        added: string[];
        deleted: string[];
      };
    };
    regex?: {};
    script?: { type: string; data: { added: string[]; deleted: string[] } };
  };
};

type InputDiffField = {
  left?: Field;
  right?: Field;
  diff?: FieldDiff;
};

type Diffs = { schemas: any; counts: { updated: number; created: number; deleted: number } };

export enum ChangeTypeName {
  CREATED = 'created',
  DELETED = 'deleted',
  UPDATED = 'updated',
}

const checkDiff = (name, field, leftDiff, rightDiff) =>
  Object.entries(field).reduce((changes, val) => {
    const [fieldName] = val;
    const left = get(leftDiff, [name, fieldName], null);
    const right = get(rightDiff, [name, fieldName], null);
    console.log(fieldName, left, right);
    changes[fieldName] = {
      left,
      right,
    };
    return changes;
  }, {});

const checkDeleted = (field) => {
  const changes = {};
  const deletedFields = field.data;
  for (let [key, value] of Object.entries(deletedFields)) {
    changes[key] = { left: value, right: null };
  }
  return changes;
};

const checkField = (field) => {
  const changes = {};
  const { left: leftDiff, right: rightDiff, diff } = field;

  if (diff.description) {
    changes['description'] = { left: leftDiff.description, right: rightDiff.description };
  }

  if (diff.valueType) {
    changes['valueType'] = { left: leftDiff.valueType, right: rightDiff.valueType };
  }

  const meta = diff.meta;

  if (meta) {
    'meta' in changes || (changes['meta'] = {});

    if (!meta.type) {
      // construct changes, null on left if created, null on right if deleted
      const metaChanges = checkDiff('meta', meta, leftDiff, rightDiff);
      changes['meta'] = metaChanges;
    }

    // deleted fields
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
        changes['restrictions']['codeList'] = {
          left: leftDiff.restrictions.codeList,
          right: rightDiff.restrictions.codeList,
          data: diff.restrictions.codeList.data,
        };
      }
    }

    // deleted fields
    else if (restrictions.type && restrictions.type === 'deleted') {
      changes['restrictions'] = { ...changes['restrictions'], ...checkDeleted(restrictions) };
    }
  }

  return changes;
};

// created and deleted fields will just be displayed, no need to diff properties
const generateDiffChanges = (schemaDiff: any): Diffs =>
  schemaDiff.reduce(
    (acc, val) => {
      const schemas = acc.schemas;
      const counts = acc.counts;
      const [name, changes] = val;
      const { schemaName, fieldName } = parseDiffFieldName(name);
      // console.log(schemaName, fieldName, acc);
      const fieldChanges = changes.diff;
      schemaName in schemas ||
        (schemas[schemaName] = {
          [ChangeTypeName.UPDATED]: {},
          [ChangeTypeName.CREATED]: {},
          [ChangeTypeName.DELETED]: {},
        });

      if (
        fieldChanges.type === ChangeTypeName.CREATED ||
        fieldChanges.type === ChangeTypeName.DELETED
      ) {
        // created or deleted field
        schemas[schemaName][fieldChanges.type][fieldName] = {
          changeType: fieldChanges.type,
          ...fieldChanges.data,
        };

        // update counts
        fieldChanges.type === ChangeTypeName.CREATED ? counts.created++ : counts.deleted++;
      } else {
        // updated field, find out which fields updated
        schemas[schemaName][ChangeTypeName.UPDATED][fieldName] = checkField(changes);
        counts.updated++;
      }

      return { schemas, counts };
    },
    { schemas: {}, counts: { updated: 0, deleted: 0, created: 0 } },
  );

const parseDiffFieldName = (fieldName: string): { schemaName: string; fieldName: string } => {
  const strArray = fieldName.split('.');
  return { schemaName: strArray[0], fieldName: strArray[1] };
};

export default generateDiffChanges;
