import React from 'react';

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

const Schema = ({ schema, key }) => (
  <div key={key}>
    <h2 className={styles.schemaTitle}>{schema.name}</h2>
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

export default Schema;
