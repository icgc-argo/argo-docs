/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, createRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Layout from '@theme/Layout';
import axios from 'axios';
import { ThemeProvider } from '@icgc-argo/uikit';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';
import Typography from '@icgc-argo/uikit/Typography';
import Select from '@icgc-argo/uikit/form/Select';
import DnaLoader from '@icgc-argo/uikit/DnaLoader';
import StyleWrapper from '../../theme/StyleWrapper';
import Schema from '../../components/Schema';
import FileFilters, { NO_ACTIVE_FILTER, DEFAULT_FILTER } from '../../components/FileFilters';
import startCase from 'lodash/startCase';
import get from 'lodash/get';
import { TAG_TYPES } from '../../components/Tag';
import { format as formatDate } from 'date-fns';
import Modal from '@icgc-argo/uikit/Modal';
import SchemaMenu from '../../components/ContentMenu';
import find from 'lodash/find';
import DropdownButton from '@icgc-argo/uikit/DropdownButton';
import { DownloadButtonContent, DownloadTooltip } from '../../components/common';
import flatten from 'lodash/flatten';
import { getLatestVersion } from '../../utils';
import { css } from '@icgc-argo/uikit';
import Icon from '@icgc-argo/uikit/Icon';

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

const RenderDictionary = ({ schemas, menuContents, isLatestSchema }) =>
  schemas.length > 0 ? (
    schemas.map(schema => {
      const menuItem = find(menuContents, { name: startCase(schema.name) });
      return <Schema schema={schema} menuItem={menuItem} isLatestSchema={isLatestSchema} />;
    })
  ) : (
    <div>No schemas found</div>
  );

function DataDictionary() {
  const [version, setVersion] = useState(data.currentVersion);
  const [dictionary, setDictionary] = useState(data.dictionary);

  const [filters, setFilters] = useState({ tiers: [], attributes: [] });
  const [meta, setMeta] = useState({ fileCount: 0, fieldCount: 0 });

  const [searchParams, setSearchParams] = useState({ tier: '', attribute: '' });
  const [schemas, setSchemas] = useState(data.dictionary.schemas);

  // menu
  const generateMenuContents = activeSchemas => {
    const activeSchemaNames = activeSchemas.map(s => s.name);
    return dictionary.schemas.map(schema => ({
      key: schema.name,
      name: startCase(schema.name),
      contentRef: createRef(),
      active: false,
      disabled: !activeSchemaNames.includes(schema.name),
    }));
  };

  const [menuContents, setMenuContents] = useState(generateMenuContents(schemas));

  const updateVersion = async newVersion => {
    const newDict = await fetchDictionary(newVersion);
    if (newDict) {
      setVersion(newVersion);
      setDictionary(newDict);
      setSchemas(newDict.schemas);
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

  // TODO: Memo
  const searchSchemas = () =>
    dictionary.schemas
      .map(schema => {
        const { tier, attribute } = searchParams;
        const filteredFields = schema.fields.filter(field => {
          const meta = get(field, 'meta', {});
          const { primaryId = false, core = false, dependsOn = false } = meta;
          const required = get(field, 'restrictions.required', false);

          let tierBool = false;
          let attributeBool = false;

          if (tier === '' && attribute === '') return true;

          if (
            (tier === TAG_TYPES.id && primaryId) ||
            (tier === TAG_TYPES.core && core) ||
            (tier === TAG_TYPES.extended && !core && !primaryId) ||
            tier === '' ||
            tier === NO_ACTIVE_FILTER
          ) {
            tierBool = true;
          }

          if (
            (attribute === TAG_TYPES.dependency && Boolean(dependsOn)) ||
            (attribute === TAG_TYPES.required && required) ||
            attribute === '' ||
            attribute === NO_ACTIVE_FILTER
          ) {
            attributeBool = true;
          }

          return tierBool && attributeBool;
        });
        return { ...schema, fields: filteredFields };
      })
      .filter(schema => schema.fields.length > 0);

  const context = useDocusaurusContext();
  const {
    siteConfig: {
      customFields: { PLATFORM_UI_ROOT = '', GATEWAY_API_ROOT = '' },
    },
  } = context;

  const downloadTsvFileTemplate = fileName => {
    window.location.assign(`${GATEWAY_API_ROOT}clinical/template/${fileName}`);
  };

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
    setMenuContents(generateMenuContents(schemas));
  }, [dictionary]);

  const filteredSchemas = React.useMemo(() => searchSchemas(), [searchParams]);

  useEffect(() => {
    setSchemas(filteredSchemas);
    setMenuContents(generateMenuContents(filteredSchemas));
  }, [searchParams]);

  const isLatestSchema = getLatestVersion() === version ? true : false;

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
                  <Link to={PLATFORM_UI_ROOT}>ARGO Data Platform.</Link>
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

                {/* <div className={styles.downloads}>
                  <DownloadTooltip disabled={isLatestSchema}>
                    <DropdownButton
                      disabled={!isLatestSchema}
                      variant="secondary"
                      size="sm"
                      onItemClick={item => {
                        if (item.value === 'all') {
                          downloadTsvFileTemplate(`all`);
                        } else {
                          downloadTsvFileTemplate(`${item.value}.tsv`);
                        }
                      }}
                      menuItems={[
                        {
                          display: 'Download All',
                          value: 'all',
                        },
                        ...dictionary.schemas.map(schema => ({
                          value: schema.name,
                          display: startCase(schema.name.split('_').join(' ')),
                        })),
                      ]}
                    >
                      <DownloadButtonContent disabled={!isLatestSchema}>
                        File Templates
                        <Icon
                          name="chevron_down"
                          fill={!isLatestSchema ? 'white' : 'accent2_dark'}
                          height="9px"
                          css={css`
                            margin-left: 5px;
                          `}
                        />
                      </DownloadButtonContent>
                    </DropdownButton>
                  </DownloadTooltip>
                  {/*
                  <Button variant="secondary" size="sm" onClick={() => console.log('pdf')}>
                    <DownloadButtonContent>PDF</DownloadButtonContent>
                  </Button>*/}
                {/*</div> */}
              </div>

              <FileFilters
                files={meta.fileCount}
                fields={meta.fieldCount}
                dataTiers={DEFAULT_FILTER.concat(
                  filters.tiers.map(d => ({ content: startCase(d), value: d })),
                )}
                dataAttributes={DEFAULT_FILTER.concat(
                  filters.attributes.map(d => ({
                    content: startCase(d),
                    value: d,
                  })),
                )}
                searchParams={searchParams}
                onSearch={search => setSearchParams(search)}
              />

              <RenderDictionary
                schemas={schemas}
                menuContents={menuContents}
                isLatestSchema={isLatestSchema}
              />
            </div>
            <div className={styles.menu}>
              <SchemaMenu
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
