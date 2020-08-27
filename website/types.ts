interface Dictionary {
  name: string;
  createdAt: string;
  schemas: Schema[];
  updatedAt: string;
  version: string;
}

export interface Schema {
  changeType: ChangeType;
  name: string;
  description: string;
  fields: Array<Field>;
  diff: SchemaDiff;
}

interface SchemaDiff {
  description: Diff<string>;
}

export enum ChangeType {
  CREATED = 'created',
  UPDATED = 'updated',
  DELETED = 'deleted',
  NONE = 'NONE',
}

export interface Field {
  changeType: ChangeType;
  name: string;
  valueType: string;
  description: string;
  meta: Meta;
  restrictions: Restrictions;
  diff: FieldDiff;
}

export interface Meta {
  validationDependency: boolean;
  primaryId: boolean;
  examples: string;
  notes: string;
  displayName: string;
  core: boolean;
}

export interface Restrictions {
  required: boolean;
  regex: string;
  script: string;
}

export type Diff<T> = {
  left: T;
  right: T;
};

export interface FieldDiff {
  valueType: Diff<string>;
  description: Diff<string>;
  meta: MetaDiff;
  restrictions: RestrictionsDiff;
}

export interface MetaDiff {
  validationDependency: Diff<boolean>;
  primaryId: Diff<boolean>;
  examples: Diff<string>;
  notes: Diff<string>;
  displayName: Diff<string>;
  core: Diff<boolean>;
}

export interface RestrictionsDiff {
  required: Diff<boolean>;
  regex: Diff<string>;
  script: Diff<string>;
}
