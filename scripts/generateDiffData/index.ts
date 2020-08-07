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

const checkField = (field) => {
  const changes = {};
  const { left: leftDiff, right: rightDiff, diff } = field;

  if (diff.description) {
    changes['description'] = { left: leftDiff.description, right: rightDiff.description };
  }

  const meta = diff.meta;
  if (meta) {
    'meta' in changes || (changes['meta'] = {});
    if (meta.notes) {
      changes['meta']['notes'] = { left: leftDiff.meta.notes, right: rightDiff.meta.notes };
    }

    if (meta.validationDependency) {
      changes['meta']['validationDependency'] = {
        left: leftDiff.meta.validationDependency,
        right: rightDiff.meta.validationDependency,
      };
    }

    if (meta.core) {
      changes['meta']['core'] = { left: leftDiff.meta.core, right: rightDiff.meta.core };
    }

    if (meta.displayName) {
      changes['meta']['displayName'] = {
        left: leftDiff.meta.displayName,
        right: rightDiff.meta.displayName,
      };
    }

    // deleted fields
    if (meta.type && meta.type === 'deleted') {
      const deletedFields = meta.data;
      for (let [key, value] of Object.entries(deletedFields)) {
        changes['meta'][key] = { left: value, right: null };
      }
    }
  }

  const restrictions = diff.restrictions;
  if (restrictions) {
    'restrictions' in changes || (changes['restrictions'] = {});
    if (restrictions.script) {
      changes['restrictions']['script'] = {
        left: leftDiff.restrictions.script,
        right: rightDiff.restrictions.script,
      };
    }

    if (restrictions.codeList) {
      changes['restrictions']['codeList'] = {
        left: leftDiff.restrictions.codeList,
        right: rightDiff.restrictions.codeList,
        data: diff.restrictions.codeList.data,
      };
    }

    if (restrictions.required) {
      changes['restrictions']['required'] = {
        left: leftDiff.restrictions.required,
        right: rightDiff.restrictions.required,
      };
    }

    if (restrictions.regex) {
      changes['restrictions']['regex'] = {
        left: leftDiff.restrictions.regex,
        right: rightDiff.restrictions.regex,
      };
    }

    // deleted fields
    if (restrictions.type && restrictions.type === 'deleted') {
      const deletedFields = restrictions.data;
      for (let [key, value] of Object.entries(deletedFields)) {
        changes['restrictions'][key] = { left: value, right: null };
      }
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
