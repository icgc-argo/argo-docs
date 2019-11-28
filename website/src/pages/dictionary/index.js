/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import Layout from '@theme/Layout';
import axios from 'axios';

import { ThemeProvider } from '@icgc-argo/uikit';

import DictionaryDiff from './DictionaryDiff';

const data = require('./data.json');

import styles from './styles.module.css';

import Typography from '@icgc-argo/uikit/Typography';
import Select from '@icgc-argo/uikit/form/Select';
import Button from '@icgc-argo/uikit/Button';
import DropdownButton from '@icgc-argo/uikit/DropdownButton';
import Icon from '@icgc-argo/uikit/Icon';
import ResetWrapper from '../../theme/ResetWrapper';

const DownloadIcon = props => (
  <Icon
    name="download"
    fill="accent2_dark"
    height="12px"
    style={{
      marginRight: '5px',
    }}
  />
);

async function fetchDictionary(version) {
  const response = await axios.get(`/data/schemas/${version}.json`);
  return response.data;
}

async function fetchDiff(version, diffVersion) {
  const response = await axios.get(
    `/data/schemas/diffs/${version}/${version}-diff-${diffVersion}.json`,
  );
  return response.data;
}

function DataDictionary() {
  const [version, setVersion] = useState(data.currentVersion);
  const [dictionary, setDictionary] = useState(data.dictionary);

  const [diffVersion, setDiffVersion] = useState(null);
  const [diff, setDiff] = useState(null);

  const updateVersion = async newVersion => {
    setDiffVersion(null);
    setDiff(null);
    const newDict = await fetchDictionary(newVersion);
    if (newDict) {
      setVersion(newVersion);
      setDictionary(newDict);
    } else {
      alert('DICTIONARY FETCHING ERROR - TODO: MAKE THIS A TOASTER');
    }
  };

  const renderVersionSelect = () => {
    return (
      <form>
        <div style={{ width: '150px', marginRight: '10px' }}>
          <Select
            aria-label="version-select"
            value={data.versions[0]}
            options={data.versions.map(d => ({ content: `Version ${d}`, value: d }))}
            onChange={val => updateVersion(val)}
          />
        </div>
      </form>
    );
  };

  const updateDiffVersion = async newDiffVersion => {
    setDiffVersion(newDiffVersion);
    const newDiff = await fetchDiff(version, newDiffVersion);
    if (newDiff) {
      setDiff(newDiff);
    } else {
      alert('DIFF FETCHING ERROR - TODO: MAKE THIS A TOASTER');
    }
  };

  const renderDiffSelect = () => {
    const lowerVersions = data.versions.filter(v => parseFloat(v) < parseFloat(version));
    return lowerVersions.length > 0 ? (
      <form>
        <label>View Version Diff:</label>
        <select name="version" onChange={e => updateDiffVersion(e.target.value)}>
          <option></option>
          {lowerVersions.map(v => {
            return <option value={v}>{v}</option>;
          })}
        </select>
      </form>
    ) : (
      <p>No older versions available, can't show diff</p>
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

  const FieldRow = field => {
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

  const Schema = schema => {
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
          {schema.fields.map((field, i) => (
            <FieldRow {...field} key={i} />
          ))}
        </table>
        <br />
      </div>
    );
  };

  const RenderDictionary = () => (
    <>
      {dictionary.schemas.map((schema, i) => (
        <Schema {...schema} key={i} />
      ))}
    </>
  );

  return (
    <ThemeProvider>
      <Layout permalink="dictionary">
        <ResetWrapper>
          <div className={styles.mainContainer}>
            <div className={styles.heading}>
              <Typography
                color="#151c3d"
                css={{
                  fontSize: '28px',
                  display: 'inline-block',
                  marginRight: '55px',
                  flexShrink: 0,
                }}
                as="h1"
              >
                Data Dictionary
              </Typography>
              <Typography variant="paragraph" color="#000">
                The ICGC ARGO Data Dictionary expresses the details of the data model, which adheres
                to specific formats and restrictions to ensure a standard of data quality. The
                following list describes the attributes and permissible values for all of the fields
                within the clinical tsv files for the ARGO Data Platform.
              </Typography>
            </div>

            <div className={styles.infobar}>
              <div>
                {renderVersionSelect()}
                <span>
                  <Typography variant="data">Last updated: </Typography>
                  <Typography variant="data" bold>
                    January 20, 2020
                  </Typography>
                </span>
              </div>
              <div>
                <div>Overview</div>
                <div>Details</div>
              </div>
              <div>
                <DropdownButton variant="secondary" size="sm" menuItems={[]}>
                  <span>
                    <DownloadIcon />
                    File Templates
                    <Icon name="chevron_down" fill="accent2_dark" height="9px" />
                  </span>
                </DropdownButton>
                <Button variant="secondary" size="sm">
                  <DownloadIcon />
                  Details
                </Button>
              </div>
            </div>

            {renderDiffSelect()}
            {diffVersion
              ? `Showing difference between ${version} and ${diffVersion}`
              : `Showing Version: ${version}`}
            <br />

            {diffVersion && diff ? (
              <DictionaryDiff diff={diff} high={version} low={diffVersion} />
            ) : (
              <RenderDictionary />
            )}
          </div>
        </ResetWrapper>
      </Layout>
    </ThemeProvider>
  );
}

export default DataDictionary;
