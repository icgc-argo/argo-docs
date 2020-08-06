type Field = {};
type TextChange = { left: string; right: string };

type DiffField = {
  description?: TextChange;
  restrictions?: {
    regex?: TextChange;
  };
  meta?: {
    notes: TextChange;
    examples: TextChange;
  };
};

type Diff = {
  [key: string]: {
    [key in ChangeTypeName]: {
      [key: string]: Field | DiffField;
    };
  };
};

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
const generateDiffChanges = (schemaDiff: any): any => {
  return schemaDiff.reduce((acc, val) => {
    const [name, changes] = val;
    const { schemaName, fieldName } = parseDiffFieldName(name);
    // console.log(schemaName, fieldName, acc);
    const fieldChanges = changes.diff;
    schemaName in acc ||
      (acc[schemaName] = {
        [ChangeTypeName.UPDATED]: {},
        [ChangeTypeName.CREATED]: {},
        [ChangeTypeName.DELETED]: {},
      });

    if (
      fieldChanges.type === ChangeTypeName.CREATED ||
      fieldChanges.type === ChangeTypeName.DELETED
    ) {
      // created or deleted field
      acc[schemaName][fieldChanges.type][fieldName] = {
        //  changeType: fieldChanges.type,
        ...fieldChanges.data,
      };
    } else {
      // updated field, find out which fields updated
      acc[schemaName][ChangeTypeName.UPDATED][fieldName] = checkField(changes);
    }

    //console.log(acc);
    return acc;
  }, {});
};

export enum ChangeTypeName {
  CREATED = 'created',
  DELETED = 'deleted',
  UPDATED = 'updated',
}

type Change<T> = {
  type: ChangeTypeName;
  definition: T;
};

type DiffMap = {
  [fieldName: string]: {
    metaChanges: {
      key?: Change<boolean>;
      core?: Change<boolean>;
      default?: any;
      examples?: Change<string>;
    };
    restrictionChanges?: {
      regex?: Change<string>;
      codelist?: Change<Array<string | number>>;
      required?: Change<boolean>;
      script?: Change<Array<string> | string>;
      range?: Change<any>;
    };
  };
};

const parseDiffFieldName = (fieldName: string): { schemaName: string; fieldName: string } => {
  const strArray = fieldName.split('.');
  return { schemaName: strArray[0], fieldName: strArray[1] };
};

export default generateDiffChanges;
