/*
 * Copyright (c) 2020 The Ontario Institute for Cancer Research. All rights reserved
 *
 * This program and the accompanying materials are made available under the terms of the GNU Affero General Public License v3.0.
 * You should have received a copy of the GNU Affero General Public License along with
 * this program. If not, see <http://www.gnu.org/licenses/>.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 *
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
import StyleWrapper from '../../components/StyleWrapper';
import Schema from '../../components/Schema';
import FileFilters, { NO_ACTIVE_FILTER, DEFAULT_FILTER } from '../../components/FileFilters';
import TreeView from '../../components/TreeView';
import startCase from 'lodash/startCase';
import get from 'lodash/get';
import { TAG_TYPES } from '../../components/Tag';
import { format as formatDate } from 'date-fns';
import Modal from '@icgc-argo/uikit/Modal';
import SchemaMenu from '../../components/ContentMenu';
import find from 'lodash/find';
import { Display, DownloadTooltip, DownloadButtonContent } from '../../components/common';
import { getLatestVersion } from '../../utils';
import uniq from 'lodash/uniq';
import Tabs, { Tab } from '@icgc-argo/uikit/Tabs';
import { StyledTab, TAB_STATE } from '../../components/Tabs';
import flattenDeep from 'lodash/flattenDeep';
import Meta from '../../components/Meta';
import { css, injectGlobal } from 'emotion';
import DropdownButton from '@icgc-argo/uikit/DropdownButton';
import Icon from '@icgc-argo/uikit/Icon';
import Button from '@icgc-argo/uikit/Button';
import { ResetButton, ButtonWithIcon } from '../../components/Button';
import ComparisonFilters, { compareFilterTypes } from '../../components/ComparisonFilters';
import Row from '../../components/Row';
import VersionSelect from '../../components/VersionSelect';

export const useModalState = () => {
  const [visibility, setVisibility] = useState(false);

  const setModalVisibility = (visibility) => {
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
const preloadedDictionary = { data: data.dictionary, version: data.currentVersion };

//const dictionaryTreeData = require('./tree.json');

// versions
const versions = data.versions;

async function fetchDictionary(version) {
  try {
    const dict = await axios.get(`/data/schemas/${version}.json`);
    const tree = await axios.get(`/data/schemas/${version}_tree.json`);
    return { dict: dict.data, tree: tree.data };
  } catch (e) {
    throw e;
  }
}

async function fetchDiff(version, diffVersion) {
  const response = await axios.get(
    `/data/schemas/diffs/${version}/${version}-diff-${diffVersion}.json`,
  );
  return response.data;
}

const parseDiff = (diff) =>
  diff
    .map((schemaFieldArray) => {
      const [schema, field] = schemaFieldArray[0].split('.');
      const { left, right, diff } = schemaFieldArray[1];
      return {
        schema,
        field,
        left,
        right,
        diff,
      };
    })
    .reduce((acc, { schema, field: fieldName, ...rest }) => {
      const fields = get(acc, [schema], {});
      fields[fieldName] = rest;
      acc[schema] = fields;
      return acc;
    }, {});

const RenderDictionary = ({ schemas, menuContents, isLatestSchema, diff }) =>
  schemas.length > 0 ? (
    schemas.map((schema) => {
      const menuItem = find(menuContents, { name: startCase(schema.name) });
      const schemaDiff = get(diff, schema.name, null);

      return (
        <Schema
          schema={schema}
          menuItem={menuItem}
          isLatestSchema={isLatestSchema}
          diff={schemaDiff}
        />
      );
    })
  ) : (
    <div>No schemas found</div>
  );

/**
 *
 * @param {string} version
 * @param {{data: Dictionary, version: string}} preloadedDictionary
 */
const getDictionary = async (version, preloadedDictionary) => {
  if (version === preloadedDictionary.version) return preloadedDictionary.data;

  const { dict, tree } = await fetchDictionary(version);

  return dict;
};

/**
 *
 * @param {string} version
 * @param {string} diffVersion
 */
const getDictionaryDiff = async (version, diffVersion) => {
  const diff = await fetchDiff(version, diffVersion);

  return parseDiff(diff);
};

function DataDictionary() {
  const [version, setVersion] = useState(preloadedDictionary.version);
  const [dictionary, setDictionary] = useState(preloadedDictionary.data);
  //  const [treeData, setTreeData] = useState(dictionaryTreeData);

  const [diffVersion, setDiffVersion] = useState(null);
  const diffVersions = versions.filter((v) => v !== version);

  const [dictionaryDiff, setDictionaryDiff] = useState(null);

  React.useEffect(() => {
    async function updateDictionaryState() {
      const dict = await getDictionary(version, preloadedDictionary);
      setDictionary(dict);
    }
    updateDictionaryState();
  }, [version]);

  React.useEffect(() => {
    if (diffVersion === null) return;
    async function updateDictionaryDiff() {
      const diff = await getDictionaryDiff(version, diffVersion);
      setDictionaryDiff(diff);
    }
    updateDictionaryDiff();
  }, [diffVersion]);

  const defaultSearchParams = { tier: '', attribute: '' };
  const [searchParams, setSearchParams] = useState(defaultSearchParams);
  const [searchValue, setSearchValue] = useState('');

  const [selectedTab, setSelectedTab] = React.useState(TAB_STATE.DETAILS);

  const defaultCompareFilters = {
    [compareFilterTypes.ADDITION]: true,
    [compareFilterTypes.UPDATE]: true,
    [compareFilterTypes.DELETION]: true,
  };
  const [compareFilters, setCompareFilters] = useState(defaultCompareFilters);

  const context = useDocusaurusContext();
  const {
    siteConfig: {
      customFields: { PLATFORM_UI_ROOT = '', GATEWAY_API_ROOT = '' },
    },
  } = context;

  const downloadTsvFileTemplate = (fileName) =>
    window.location.assign(`${GATEWAY_API_ROOT}clinical/template/${fileName}`);

  const filters = React.useMemo(() => {
    const schemas = get(dictionary, 'schemas', []);

    const fields = schemas.map((schema) => schema.fields);

    const filters = flattenDeep(fields).reduce(
      (acc, field) => {
        const meta = get(field, 'meta', {});
        const { primaryId = false, core = false, dependsOn = false } = meta;
        const restrictions = get(field, 'restrictions', false);
        if (primaryId) {
          acc.tiers.push(TAG_TYPES.id);
        }

        if (!!restrictions) {
          acc.attributes.push(TAG_TYPES.required);
        }

        if (dependsOn) {
          acc.attributes.push(TAG_TYPES.conditional);
        }

        if (core) {
          acc.tiers.push(TAG_TYPES.core);
        }

        if (!core && !primaryId) {
          acc.tiers.push(TAG_TYPES.extended);
        }
        return acc;
      },
      { tiers: [], attributes: [] },
    );
    return { tiers: uniq(filters.tiers), attributes: uniq(filters.attributes) };
  }, [dictionary]);

  const filteredSchemas = React.useMemo(
    () =>
      dictionary.schemas
        .map((schema) => {
          const { tier, attribute } = searchParams;
          const filteredFields = schema.fields
            .map((fields) => {
              // comparison filters
              return fields;
            })
            .filter((field) => {
              const meta = get(field, 'meta', {});
              const { primaryId = false, core = false, dependsOn = false } = meta;
              const required = get(field, 'restrictions.required', false);

              if (tier === NO_ACTIVE_FILTER && attribute === NO_ACTIVE_FILTER) return true;

              const tierBool =
                (tier === TAG_TYPES.id && primaryId) ||
                (tier === TAG_TYPES.core && core) ||
                (tier === TAG_TYPES.extended && !core && !primaryId) ||
                tier === '' ||
                tier === NO_ACTIVE_FILTER
                  ? true
                  : false;

              const attributeBool =
                (attribute === TAG_TYPES.conditional && Boolean(dependsOn)) ||
                (attribute === TAG_TYPES.required && required) ||
                attribute === '' ||
                attribute === NO_ACTIVE_FILTER
                  ? true
                  : false;

              const compareVal = get(field, 'compare', '');
              const { ADDITION, DELETION, UPDATE } = compareFilters;

              const comparisonBool =
                (ADDITION && compareVal === compareFilterTypes.ADDITION) ||
                (DELETION && compareVal === compareFilterTypes.DELETION) ||
                (UPDATE && compareVal === compareFilterTypes.UPDATE);

              return tierBool && attributeBool;
            });

          return { ...schema, fields: filteredFields };
        })
        .filter((schema) => schema.fields.length > 0),
    [searchParams, dictionary, compareFilters],
  );

  const fileCount = filteredSchemas.length;
  const fieldCount = filteredSchemas.reduce((acc, schema) => acc + schema.fields.length, 0);

  const generateMenuContents = (activeSchemas) => {
    const activeSchemaNames = activeSchemas.map((s) => s.name);
    return dictionary.schemas.map((schema) => ({
      key: schema.name,
      name: startCase(schema.name),
      contentRef: createRef(),
      active: false,
      disabled: !activeSchemaNames.includes(schema.name),
    }));
  };

  // Menu Contents
  const menuContents = generateMenuContents(filteredSchemas);

  // Check if current schema is the latest version
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
                  The following views describes the attributes and permissible values for all of the
                  fields within the clinical tsv files for the{' '}
                  <Link to={PLATFORM_UI_ROOT}>ARGO Data Platform.</Link>
                </Typography>
              </div>
              <div className={styles.infobar}>
                <div>
                  <VersionSelect
                    value={version}
                    versions={versions}
                    onChange={(v) => {
                      setVersion(v);
                    }}
                  />
                  <Button
                    size="sm"
                    onClick={() => {
                      setDiffVersion(diffVersions[0]);
                    }}
                  >
                    Compare with...
                  </Button>
                  {diffVersion ? (
                    <div style={{ display: 'flex' }}>
                      <VersionSelect
                        value={diffVersion}
                        versions={diffVersions}
                        onChange={setDiffVersion}
                      />
                      <Button variant="secondary" onClick={() => setDiffVersion(null)}>
                        <Icon name="times" height="8px" />
                        <span style={{ marginLeft: '5px' }}>CLEAR</span>
                      </Button>
                    </div>
                  ) : null}
                </div>
                <div className={styles.downloads}>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={(item) => downloadTsvFileTemplate(`all`)}
                  >
                    <DownloadButtonContent>File Templates</DownloadButtonContent>
                  </Button>

                  {/*<Button variant="secondary" size="sm" onClick={() => console.log('pdf')}>
                    <DownloadButtonContent>PDF</DownloadButtonContent>
                  </Button>*/}
                </div>
              </div>

              {/*<div className={styles.infobar} style={{ justifyContent: 'center' }}>
                {
                  <Tabs
                    value={selectedTab}
                    onChange={(e, newValue) => {
                      setSelectedTab(newValue);
                    }}
                    styles={{
                      marginBottom: '-2px',
                    }}
                  >
                    <StyledTab value={TAB_STATE.OVERVIEW} label="Overview" />
                    <StyledTab value={TAB_STATE.DETAILS} label="Details" />
                  </Tabs>
                } 
              </div>*/}

              <Display visible={selectedTab === TAB_STATE.DETAILS}>
                <Row>
                  <Meta files={fileCount} fields={fieldCount} />
                  <div
                    className={css`
                      display: flex;
                      flex-direction: row;
                    `}
                  >
                    <ComparisonFilters
                      additions={24}
                      updates={13}
                      deletions={53}
                      filters={compareFilters}
                      onChange={(type) => {
                        const newFilters = {
                          ...compareFilters,
                          ...{ [type]: !compareFilters[type] },
                        };
                        setCompareFilters(newFilters);
                      }}
                    />

                    <FileFilters
                      dataTiers={DEFAULT_FILTER.concat(
                        filters.tiers.map((d) => ({ content: startCase(d), value: d })),
                      )}
                      dataAttributes={DEFAULT_FILTER.concat(
                        filters.attributes.map((d) => ({
                          content: startCase(d),
                          value: d,
                        })),
                      )}
                      searchParams={searchParams}
                      onSearch={(search) => setSearchParams(search)}
                    />
                    <ResetButton
                      disabled={searchParams.tier === '' && searchParams.attribute === ''}
                      onClick={() => setSearchParams(defaultSearchParams)}
                    >
                      Reset
                    </ResetButton>
                  </div>
                </Row>
              </Display>

              <Display visible={selectedTab === TAB_STATE.DETAILS}>
                <div
                  className={css`
                    margin-top: 30px;
                  `}
                >
                  <RenderDictionary
                    schemas={filteredSchemas}
                    diff={dictionaryDiff}
                    menuContents={menuContents}
                    isLatestSchema={isLatestSchema}
                  />
                </div>
              </Display>

              <Display visible={false}>
                {/*   <TreeView searchValue={searchValue} data={treeData} />
                 */}
              </Display>
            </div>

            <Display visible={selectedTab === TAB_STATE.DETAILS}>
              <div className={styles.menu}>
                <SchemaMenu
                  title="Clinical Files"
                  contents={menuContents}
                  color="#0774d3"
                  scrollYOffset="70"
                  dataTiers={filters.tiers.map((d) => ({ content: startCase(d), value: d }))}
                  dataAttributes={filters.attributes.map((d) => ({
                    content: startCase(d),
                    value: d,
                  }))}
                />
              </div>
            </Display>
          </div>
        </StyleWrapper>
      </Layout>
    </ThemeProvider>
  );
}

export default DataDictionary;
