import get from 'lodash/get';
import { analyzer } from '@overturebio-stack/lectern-client';
import { parse } from 'querystring';

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

const generateDiffChanges = (schemaDiff: any): any => {
  return schemaDiff.reduce((acc, val) => {
    const [name, changes] = val;
    const { schemaName, fieldName } = parseDiffFieldName(name);
    console.log(schemaName, fieldName, acc);
    const diff = changes.diff;
    schemaName in acc ||
      (acc[schemaName] = {
        [ChangeTypeName.UPDATED]: {},
        [ChangeTypeName.CREATED]: {},
        [ChangeTypeName.DELETED]: {},
      });

    if (diff.type === ChangeTypeName.CREATED || diff.type === ChangeTypeName.DELETED) {
      // created or deleted field
      acc[schemaName][diff.type][fieldName] = diff.data;
    } else {
      // created field
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

const createEntry = (fieldChange, diffs, type, fieldType) => {
  const { field, definition } = fieldChange;
  const { schemaName, fieldName } = parseDiffFieldName(field);
  console.log(schemaName, fieldName, definition);
  schemaName in diffs || (diffs[schemaName] = {});
  fieldName in diffs[schemaName] || (diffs[schemaName][fieldName] = {});
  diffs[schemaName][fieldName][fieldType] = {
    type,
    diff: definition,
  };
};

/* const iterateFieldType = (fieldType) => {
  Object.keys(fieldType).map((k) => {
    const { created, deleted, updated } = fieldType[k];
    for (const fieldChange of created) {
      createEntry(fieldChange, diffs, ChangeTypeName.CREATED);
    }
    for (const fieldChange of deleted) {
      createEntry(fieldChange, diffs, ChangeTypeName.DELETED);
    }
    for (const fieldChange of updated) {
      createEntry(fieldChange, diffs, ChangeTypeName.UPDATED);
    }
}
 */
function x(schemaDiff) {
  /**
   * extra step here, using js-lectern-client code to generate a change object
   * generating further objects from the change object
   */
  const changes = generateDiffChanges(schemaDiff);
  console.log('changes', changes);
  const { metaChanges, restrictionsChanges } = changes;
  const diffs = {};
  Object.keys(restrictionsChanges).map((k) => {
    const { created, deleted, updated } = restrictionsChanges[k];
    for (const fieldChange of created) {
      createEntry(fieldChange, diffs, ChangeTypeName.CREATED, 'restrictions');
    }
    for (const fieldChange of deleted) {
      createEntry(fieldChange, diffs, ChangeTypeName.DELETED, 'restrictions');
    }
    for (const fieldChange of updated) {
      createEntry(fieldChange, diffs, ChangeTypeName.UPDATED, 'restrictions');
    }
  });
  Object.keys(metaChanges).map((k) => {
    const { created, deleted, updated } = metaChanges[k];
    for (const fieldChange of created) {
      createEntry(fieldChange, diffs, ChangeTypeName.CREATED, 'meta');
    }
    for (const fieldChange of deleted) {
      createEntry(fieldChange, diffs, ChangeTypeName.DELETED, 'meta');
    }
    for (const fieldChange of updated) {
      createEntry(fieldChange, diffs, ChangeTypeName.UPDATED, 'meta');
    }
  });
  console.log('diffs', diffs);
  return diffs;
}

export { generateDiffChanges, x };
