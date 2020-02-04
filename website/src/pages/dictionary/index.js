/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, createRef, useEffect } from 'react';
import Layout from '@theme/Layout';
import axios from 'axios';
import { ThemeProvider } from '@icgc-argo/uikit';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';
import Typography from '@icgc-argo/uikit/Typography';
import Select from '@icgc-argo/uikit/form/Select';
import DropdownButton from '@icgc-argo/uikit/DropdownButton';
import DnaLoader from '@icgc-argo/uikit/DnaLoader';
import Icon from '@icgc-argo/uikit/Icon';
import StyleWrapper from '../../theme/StyleWrapper';
import Schema from '../../components/Schema';
import FileFilters from '../../components/FileFilters';
import camelCase from 'lodash/camelCase';
import startCase from 'lodash/startCase';
import get from 'lodash/get';
import { TAG_TYPES } from '../../components/Tag';
import { format as formatDate } from 'date-fns';
import { DownloadIcon, DownloadButton } from '../../components/common';
import flatten from 'lodash/flatten';
import ReactDOM from 'react-dom';
import Modal from '@icgc-argo/uikit/Modal';
import Menu from '../../components/ContentMenu';

export const useModalState = () => {
  const [visibility, setVisibility] = useState(false);

  const setModalVisibility = visibility => {
    setVisibility(visibility);
    const bodyClassList = document.getElementsByTagName('html')[0].classList;
    if (visibility) {
      bodyClassList.add('modal-open');
    } else {
      bodyClassList.remove('modal-open');
    }
  };

  return [visibility, setModalVisibility];
};

const modalPortalRef = React.createRef();
export const ModalPortal = ({ children }) => {
  const ref = modalPortalRef.current;
  return ref
    ? ReactDOM.createPortal(
        <div style={{ width: '100vw', height: '100vh' }}>
          <Modal.Overlay>{children}</Modal.Overlay>
        </div>,
        ref,
      )
    : null;
};

const data = require('./data.json');

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

const RenderDictionary = ({ schemas, menuRefs }) =>
  schemas ? (
    schemas.map(schema => <Schema schema={schema} menuRef={menuRefs[camelCase(schema.name)]} />)
  ) : (
    <DnaLoader />
  );

function DataDictionary() {
  const [version, setVersion] = useState(data.currentVersion);
  const [dictionary, setDictionary] = useState(data.dictionary);
  const [filters, setFilters] = useState({ tiers: [], attributes: [] });
  const [meta, setMeta] = useState({ fileCount: 0, fieldCount: 0 });

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

  const context = useDocusaurusContext();
  const {
    siteConfig: {
      customFields: { platformUrl = '' },
    },
  } = context;

  // menu
  const schemaRefs = dictionary.schemas.reduce((acc, schema) => {
    acc[camelCase(schema.name)] = createRef();
    return acc;
  }, {});
  const menuContents = dictionary.schemas.map(schema => ({
    name: startCase(schema.name),
    contentRef: schemaRefs[camelCase(schema.name)],
  }));

  useEffect(() => {
    const schemas = get(dictionary, 'schemas', []);
    const files = schemas.length;
    const fields = schemas.reduce((acc, schema) => acc + schema.fields.length, 0);
    setMeta({ fileCount: files, fieldCount: fields });

    const schemaFields = flatten(schemas.map(schema => schema.fields));
    const { validDataTiers, validDataAttributes } = schemaFields.reduce(
      (acc, field) => {
        const meta = get(field, 'meta', {});
        const { primaryId = false, core = false, dependsOn = false } = meta;
        const restrictions = get(field, 'restrictions', false);
        if (primaryId) {
          acc.validDataTiers.add(TAG_TYPES.id);
        }

        if (!!restrictions) {
          acc.validDataAttributes.add(TAG_TYPES.required);
        }

        if (dependsOn) {
          acc.validDataAttributes.add(TAG_TYPES.dependency);
        }

        if (core) {
          acc.validDataTiers.add(TAG_TYPES.core);
        }

        if (!core && !primaryId) {
          acc.validDataTiers.add(TAG_TYPES.extended);
        }
        return acc;
      },
      { validDataTiers: new Set(), validDataAttributes: new Set() },
    );

    setFilters({ tiers: [...validDataTiers], attributes: [...validDataAttributes] });
  }, [dictionary]);

  return (
    <ThemeProvider>
      <div id="modalCont" className={styles.modalCont} ref={modalPortalRef} />

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
                      {formatDate(get(dictionary, 'updatedAt', ''), 'MMMM D, YYYY')}
                    </Typography>
                  </span>
                </div>
                {/*<div className={styles.downloads}>
                  <DropdownButton variant="secondary" size="sm" menuItems={[]}>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      <DownloadIcon />
                      File Templates
                      <Icon name="chevron_down" fill="accent2_dark" height="9px" />
                    </div>
                  </DropdownButton>
                  <DownloadButton>PDF</DownloadButton>
                </div>*/}
              </div>

              <FileFilters
                files={meta.fileCount}
                fields={meta.fieldCount}
                dataTiers={filters.tiers.map(d => ({ content: startCase(d), value: d }))}
                dataAttributes={filters.attributes.map(d => ({
                  content: startCase(d),
                  value: d,
                }))}
              />

              <RenderDictionary schemas={dictionary.schemas} menuRefs={schemaRefs} />
            </div>
            <div className={styles.menu}>
              <Menu
                title="Clinical Files"
                contents={menuContents}
                color="#0774d3"
                scrollYOffset="70"
              />
            </div>
          </div>
        </StyleWrapper>
      </Layout>
    </ThemeProvider>
  );
}

export default DataDictionary;
