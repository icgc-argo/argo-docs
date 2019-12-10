import React from 'react';
import Table from '@icgc-argo/uikit/Table';
import TagButton, { TAG_TYPES } from './TagButton';
import styles from './styles.module.css';
import Tag from '@icgc-argo/uikit/Tag';

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
  <div className={styles.fieldDescription}>
    <div className={styles.name}>{name}</div>
    <div>{description}</div>
  </div>
);

const FieldsTag = ({ fieldCount }) => (
  <Tag className={styles.fieldsTag}>{`${fieldCount} Field${fieldCount > 1 ? 's' : ''}`}</Tag>
);

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
  const fields = schema.fields;
  const prefix = 'prefix_prefix';
  const ext = 'tsv';
  return (
    <div key={key}>
      <h2 className={styles.schemaTitle}>{schema.name}</h2>

      <FieldsTag fieldCount={fields.length} />
      <div className={styles.fieldExample}>
        Field Name Example: <span>{`${prefix}`}</span>[-optional-extension]<span>{`.${ext}`}</span>
      </div>

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
        {fields.map((field, i) => (
          <FieldRow {...field} key={i} />
        ))}
      </table>
      <br />
    </div>
  );
};

export default Schema;
