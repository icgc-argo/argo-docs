import React from 'react';
import Table from '@icgc-argo/uikit/Table';
import Tag from '@icgc-argo/uikit/Tag';
import styles from './styles.module.css';

const renderValuesList = list => {
  const maxEnumLength = 5;
  const fullOutput = list.map(item => (
    <p className={styles.fieldEnumValue}>
      <strong>{item}</strong>
    </p>
  ));
  return fullOutput.length > maxEnumLength
    ? [
        ...fullOutput.slice(0, maxEnumLength),
        <p className={styles.fieldEnumValue}>
          <strong>{fullOutput.length - maxEnumLength} more...</strong>
        </p>,
      ]
    : fullOutput;
};

const formatFieldType = value => {
  switch (value) {
    case 'string':
      return 'TEXT';
    default:
      return value.toUpperCase();
  }
};

const FieldRow = field => {
  return (
    <tr>
      <td className={styles.schemaTable_column}>
        <h3>{field.name}</h3>
        <p className={styles.fieldDescription}>{field.description}</p>
      </td>
      <td className={styles.schemaTable_column}>
        {field.restrictions && field.restrictions.required && (
          <div className={styles.requiredTag}>Required</div>
        )}
      </td>
      <td className={styles.schemaTable_column}>{formatFieldType(field.valueType)}</td>
      <td className={styles.schemaTable_column}>
        {field.restrictions &&
          field.restrictions.codeList &&
          renderValuesList(field.restrictions.codeList)}
      </td>
      <td className={styles.schemaTable_column}></td>
    </tr>
  );
};

const PermissibleValues = ({ regex }) => (
  <div>
    <div>
      <div>Values must meet the regular expression</div>
      <div>{regex}</div>
      <div>Examples:</div>
    </div>
  </div>
);

const FieldDescription = ({ name, description }) => (
  <div>
    <div>{name}</div>
    <div>{description}</div>
  </div>
);

const TAG_TYPES = Object.freeze({
  required: 'required',
  dependency: 'dependency',
  core: 'core',
  id: 'id',
  extended: 'extended',
});

const TagButton = ({ type }) => {
  switch (type) {
    case TAG_TYPES.required:
      return <Tag className={`${styles.tag} ${styles.required}`}>Required</Tag>;
    case TAG_TYPES.dependency:
      return <Tag className={`${styles.tag} ${styles.dependency}`}>Dependency</Tag>;
    case TAG_TYPES.core:
      return <Tag className={`${styles.tag} ${styles.core}`}>Core</Tag>;
    case TAG_TYPES.id:
      return <Tag className={`${styles.tag} ${styles.id}`}>ID</Tag>;
    case TAG_TYPES.extended:
      return <Tag className={`${styles.tag} ${styles.extended}`}>Extended</Tag>;
    default:
      return null;
  }
};

const Schema = ({ schema, key }) => {
  console.log('schema', schema);
  /**
   * name
   * descripton
   * field = name, description, restrictions : {required, regex, codelist...} , valuetype
   */
  const cols = [
    {
      Header: 'Field & Description',
      id: 'fieldDescription',
      accessor: ({ name, description }) => (
        <FieldDescription name={name} description={description} />
      ),
    },
    /*{ Header: 'Data Tier', accessor: '' },*/
    {
      Header: 'Attributes',
      id: 'attributes',
      accessor: ({ restrictions }) =>
        restrictions && restrictions.required && <TagButton type={TAG_TYPES.required} />,
    },
    { Header: 'Type', id: 'valueType', accessor: ({ valueType }) => valueType.toUpperCase() },
    {
      Header: 'Permissible Values',
      id: 'permissibleValues',
      accessor: ({ restrictions }) =>
        restrictions && restrictions.regex && <PermissibleValues regex={restrictions.regex} />,
    },
    {
      /*
    { Header: 'Notes & Scripts', accessor: '' }, */
    },
  ];
  const containerRef = React.createRef();

  return (
    <div key={key}>
      <h2 className={styles.schemaTitle}>{schema.name}</h2>
      <div ref={containerRef}>
        <Table parentRef={containerRef} columns={cols} data={schema.fields} />
      </div>
      <table>
        <tr>
          <th>Field & Description</th>
          <th>Attributes</th>
          <th>Type</th>
          <th>Permissible Values</th>
          <th>Notes & Scripts</th>
        </tr>
        {schema.fields.map((field, i) => (
          <FieldRow {...field} key={i} />
        ))}
      </table>
      <br />
    </div>
  );
};

export default Schema;
