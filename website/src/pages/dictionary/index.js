/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import Layout from '@theme/Layout';
import axios from 'axios';

const data = require('./data.json');

import styles from './styles.module.css';

async function fetchDictionary(version) {
  const response = await axios.get(`/data/schemas/${version}.json`);
  return response.data;
}

function DataDictionary() {
  const [version, setVersion] = useState(data.currentVersion);
  const [dictionary, setDictionary] = useState(data.dictionary);

  const updateVersion = async newVersion => {
    const newDict = await fetchDictionary(newVersion);
    if (newDict) {
      setVersion(newVersion);
      setDictionary(newDict);
    } else {
      alert('FETCHING ERROR - TODO: MAKE THIS A TOASTER');
    }
  };

  const renderVersionSelect = () => {
    return (
      <form>
        <label>Select Version:</label>
        <select name="version" onChange={e => updateVersion(e.target.value)}>
          {data.versions.map(v => {
            return <option value={v}>{v}</option>;
          })}
        </select>
      </form>
    );
  };

  const renderRequired = () => {
    return <div className={styles.requiredTag}>Required</div>;
  };

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

  const renderFieldRow = field => {
    return (
      <tr>
        <td className={styles.schemaTable_column}>
          <h3>{field.name}</h3>
          <p className={styles.fieldDescription}>{field.description}</p>
        </td>
        <td className={styles.schemaTable_column}>
          {field.restrictions && field.restrictions.required && renderRequired()}
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

  const renderSchema = schema => {
    return (
      <div>
        <h2 className={styles.schemaTitle}>{schema.name}</h2>
        <table>
          <tr>
            <th>Field & Description</th>
            <th>Attributes</th>
            <th>Type</th>
            <th>Permissible Values</th>
            <th>Notes & Scripts</th>
          </tr>
          {schema.fields.map(renderFieldRow)}
        </table>
        <br />
      </div>
    );
  };

  const renderDictionary = () => {
    return dictionary.schemas.map(renderSchema);
  };

  return (
    <Layout permalink="dictionary">
      <div className={styles.mainContainer}>
        {renderVersionSelect()}
        <br />
        Showing Version: {version}
        {renderDictionary()}
      </div>
    </Layout>
  );
}

export default DataDictionary;
