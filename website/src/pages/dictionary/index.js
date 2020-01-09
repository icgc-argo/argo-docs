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
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const data = require('./data.json');

import styles from './styles.module.css';

import Typography from '@icgc-argo/uikit/Typography';
import Select from '@icgc-argo/uikit/form/Select';
import Button from '@icgc-argo/uikit/Button';
import DropdownButton from '@icgc-argo/uikit/DropdownButton';
import DnaLoader from '@icgc-argo/uikit/DnaLoader';
import Icon from '@icgc-argo/uikit/Icon';
import StyleWrapper from '../../theme/StyleWrapper';
import Schema from '../../components/Schema';
import FileFilters from '../../components/FileFilters';

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

  const updateVersion = async newVersion => {
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
            value={version}
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

  const RenderDictionary = () =>
    dictionary && dictionary.schemas ? (
      dictionary.schemas.map(schema => <Schema schema={schema} />)
    ) : (
      <DnaLoader />
    );

  const context = useDocusaurusContext();
  const {
    siteConfig: {
      customFields: { platformUrl = '' },
    },
  } = context;

  return (
    <ThemeProvider>
      <Layout permalink="dictionary">
        <StyleWrapper>
          <div className={styles.mainContainer}>
            <div className={styles.dict}>
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
                  The ICGC ARGO Data Dictionary expresses the details of the data model, which
                  adheres to specific formats and restrictions to ensure a standard of data quality.
                  The following list describes the attributes and permissible values for all of the
                  fields within the clinical tsv files for the{' '}
                  <Link to={platformUrl}>ARGO Data Platform.</Link>
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
                <div className={styles.downloads}>
                  <DropdownButton variant="secondary" size="sm" menuItems={[]}>
                    <span>
                      <DownloadIcon />
                      File Templates
                      <Icon name="chevron_down" ffill="accent2_dark" height="9px" />
                    </span>
                  </DropdownButton>
                  <Button variant="secondary" size="sm">
                    <DownloadIcon />
                    PDF
                  </Button>
                </div>
              </div>
              <FileFilters />

              <RenderDictionary />
            </div>
            <div className={styles.menu}>Menu</div>
          </div>
        </StyleWrapper>
      </Layout>
    </ThemeProvider>
  );
}

export default DataDictionary;
