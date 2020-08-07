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

/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { useState, createRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Layout from '@theme/Layout';
import axios from 'axios';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';
import Typography from '@icgc-argo/uikit/Typography';
import StyleWrapper from '../../components/StyleWrapper';
import FileFilters, {
  NO_ACTIVE_FILTER,
  generateFilter,
  DEFAULT_FILTER,
  generateComparisonFilter,
} from '../../components/FileFilters';
import TreeView from '../../components/TreeView';
import startCase from 'lodash/startCase';
import get from 'lodash/get';
import { TAG_TYPES } from '../../components/Tag';
import Modal from '@icgc-argo/uikit/Modal';
import SchemaMenu from '../../components/ContentMenu';
import { Display, DownloadTooltip, DownloadButtonContent } from '../../components/common';
import { getLatestVersion } from '../../utils';
import uniq from 'lodash/uniq';
import Tabs, { Tab } from '@icgc-argo/uikit/Tabs';
import { StyledTab, TAB_STATE } from '../../components/Tabs';
import flattenDeep from 'lodash/flattenDeep';
import Meta from '../../components/Meta';
import Icon from '@icgc-argo/uikit/Icon';
import OldButton from '@icgc-argo/uikit/Button';
import Button from '../../components/Button';
import { ResetButton, ButtonWithIcon } from '../../components/Button';
import CompareLegend from '../../components/CompareLegend';
import Row from '../../components/Row';
import VersionSelect from '../../components/VersionSelect';
import EmotionThemeProvider from '../../styles/EmotionThemeProvider';
import argoTheme from '../../styles/theme/icgc-argo';
import { css } from '@emotion/core';
import { ChangeType } from '../../components/Schema';
import styled from '@emotion/styled';
import Dictionary from '../../components/Dictionary';

const InfoBar = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #dcdde1;
  padding-bottom: 8px;
`;

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

// one version (that has been downloaded) behind latest version
const preloadedDiff = require('../../../static/data/schemas/diffs/1.2/1.2-diff-1.1.json');

//const dictionaryTreeData = require('./tree.json');

// versions
const versions = data.versions;

async function fetchDictionary(version) {
  try {
    const dict = await axios.get(`/data/schemas/${version}.json`);
    const tree = await axios.get(`/data/schemas/${version}_tree.writeFile`);
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
 * @param {string} version
 * @param {string} diffVersion
 */
const getDictionaryDiff = async (version, diffVersion) => {
  const diff = await fetchDiff(version, diffVersion);
  return parseDiff(diff);
};

/**
 * @param schema
 * @param schemaDiff
 * add diff data to object
 */
const updateSchemaField = (schema, schemaDiff) => {
  const { created = {}, deleted = {}, updated = {} } = schemaDiff;
  const fieldsToAdd = Object.values(deleted);

  // if a field has been created or updated, add this data
  const allFields = schema.fields
    .map((field) => {
      const fieldName = field.name;
      return updated[fieldName]
        ? { ...field, diff: updated[fieldName], changeType: ChangeType.UPDATED }
        : created[fieldName]
        ? { ...field, diff: updated[fieldName], changeType: ChangeType.CREATED }
        : field;
    })
    .concat(fieldsToAdd);

  return { ...schema, fields: allFields };
};

const diffObjectToArray = (diff) => Object.entries(diff).map((fieldPair) => fieldPair[1]);

const resolveSchemas = (dictionarySchemas, diffSchemas) => {
  const dictionarySchemaNames = new Set();
  dictionarySchemas.forEach((schema) => dictionarySchemaNames.add(schema.name));

  const resolvedSchemas = Object.keys(diffSchemas).reduce((acc, diffSchemaName) => {
    const diffSchema = diffSchemas[diffSchemaName];
    const { created, deleted, updated, description = 'destription' } = diffSchema;
    if (dictionarySchemaNames.has(diffSchemaName)) {
      // field needs updating
      const schema = updateSchemaField(
        dictionarySchemas.find((schema) => schema.name === diffSchemaName),
        diffSchema,
      );
      return acc.concat(schema);
    } else {
      // created or deleted field
      return acc.concat({
        name: diffSchemaName,
        fields: [...diffObjectToArray(created), ...diffObjectToArray(deleted)],
        description,
      });
    }
  }, []);

  return resolvedSchemas;
};

function DictionaryPage() {
  // docusaurus context
  const context = useDocusaurusContext();
  const {
    siteConfig: {
      customFields: { PLATFORM_UI_ROOT = '', GATEWAY_API_ROOT = '' },
    },
  } = context;

  const [version, setVersion] = useState(preloadedDictionary.version);
  const [dictionary, setDictionary] = useState(preloadedDictionary.data);
  //  const [treeData, setTreeData] = useState(dictionaryTreeData);

  const diffVersions = versions.filter((v) => v !== version);

  const [diffVersion, setDiffVersion] = useState(diffVersions[0]);
  const [dictionaryDiff, setDictionaryDiff] = useState(preloadedDiff);
  const [isDiffShowing, setIsDiffShowing] = useState(false);

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

  const defaultSearchParams = {
    tier: DEFAULT_FILTER.value,
    attribute: DEFAULT_FILTER.value,
    comparison: DEFAULT_FILTER.value,
  };
  const [searchParams, setSearchParams] = useState(defaultSearchParams);
  const [searchValue, setSearchValue] = useState('');

  const [selectedTab, setSelectedTab] = React.useState(TAB_STATE.DETAILS);

  const downloadTsvFileTemplate = (fileName) =>
    window.location.assign(`${GATEWAY_API_ROOT}clinical/template/${fileName}`);

  const schemas = resolveSchemas(dictionary.schemas, dictionaryDiff.schemas);

  // filter out diff fields
  const filteredDiffSchemas = React.useMemo(
    () =>
      schemas
        .map((schema) => ({
          ...schema,
          fields: schema.fields.filter((field) =>
            isDiffShowing
              ? Boolean
              : field.changeType !== ChangeType.CREATED && field.changeType !== ChangeType.DELETED,
          ),
        }))
        // filter out schemas with no fields
        .filter((schema) => schema.fields.length > 0),
    [schemas, isDiffShowing],
  );

  // filter based on search results
  const filteredSchemas = React.useMemo(
    () =>
      filteredDiffSchemas
        .map((schema) => {
          const { tier, attribute, comparison } = searchParams;
          const filteredFields = schema.fields
            .filter(
              tier === NO_ACTIVE_FILTER && attribute === NO_ACTIVE_FILTER
                ? Boolean
                : (field) => {
                    const meta = get(field, 'meta', {});
                    const { primaryId = false, core = false, dependsOn = false } = meta;
                    const required = get(field, 'restrictions.required', false);

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

                    return tierBool && attributeBool;
                  },
            )
            .filter(
              comparison === NO_ACTIVE_FILTER
                ? Boolean
                : (field) => {
                    // check if field has a change
                    const change = get(
                      dictionaryDiff.schemas,
                      [schema.name, comparison, field.name],
                      false,
                    );

                    return change;
                  },
            );

          return {
            ...schema,
            fields: filteredFields,
          };
        })
        .filter((schema) => schema.fields.length > 0),
    [searchParams, isDiffShowing],
  );

  // create filters dynamically based on active schemas
  const filters = React.useMemo(() => {
    const fields = filteredDiffSchemas.map((schema) => schema.fields);

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
  }, [schemas]);

  const fileCount = filteredSchemas.length;
  const fieldCount = filteredSchemas.reduce((acc, schema) => acc + schema.fields.length, 0);

  const generateMenuContents = (activeSchemas) => {
    const activeSchemaNames = activeSchemas.map((s) => s.name);
    return activeSchemas.map((schema) => ({
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
    <EmotionThemeProvider theme={argoTheme}>
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
              <InfoBar>
                <div
                  css={css`
                    display: flex;
                  `}
                >
                  <VersionSelect
                    value={version}
                    versions={versions}
                    onChange={(v) => {
                      setVersion(v);
                    }}
                  />
                  <OldButton size="sm" onClick={() => setIsDiffShowing(true)}>
                    Compare with...
                  </OldButton>
                  <Display
                    visible={isDiffShowing}
                    visibleStyle={css`
                      display: flex;
                      align-items: center;
                    `}
                  >
                    <VersionSelect
                      value={diffVersion}
                      versions={diffVersions}
                      onChange={setDiffVersion}
                    />
                    <CompareLegend
                      comparison={dictionaryDiff.counts}
                      styles={css`
                        margin: 0 10px;
                      `}
                    />
                    <Button variant="secondary" size="sm" onClick={() => setIsDiffShowing(false)}>
                      <Icon
                        name="times"
                        height="8px"
                        css={css`
                          padding-right: 5px;
                        `}
                      />
                      CLEAR
                    </Button>
                  </Display>
                </div>

                <div>
                  <OldButton
                    variant="secondary"
                    size="sm"
                    onClick={(item) => downloadTsvFileTemplate(`all`)}
                  >
                    <DownloadButtonContent>File Templates</DownloadButtonContent>
                  </OldButton>

                  {/*<Button variant="secondary" size="sm" onClick={() => console.log('pdf')}>
                    <DownloadButtonContent>PDF</DownloadButtonContent>
                  </Button>*/}
                </div>
              </InfoBar>
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
                    css={css`
                      display: flex;
                      flex-direction: row;
                    `}
                  >
                    <FileFilters
                      dataTiers={filters.tiers.map(generateFilter)}
                      dataAttributes={filters.attributes.map(generateFilter)}
                      comparisons={Object.keys(dictionaryDiff.counts).map(generateComparisonFilter)}
                      isDiffShowing={isDiffShowing}
                      searchParams={searchParams}
                      onFilter={(search) => setSearchParams(search)}
                    />
                    <ResetButton
                      disabled={
                        searchParams.tier === NO_ACTIVE_FILTER &&
                        searchParams.attribute === NO_ACTIVE_FILTER &&
                        searchParams.comparison === NO_ACTIVE_FILTER
                      }
                      onClick={() => setSearchParams(defaultSearchParams)}
                    >
                      Reset
                    </ResetButton>
                  </div>
                </Row>
              </Display>

              <Display visible={selectedTab === TAB_STATE.DETAILS}>
                <div
                  css={css`
                    margin-top: 30px;
                  `}
                >
                  <Dictionary
                    schemas={filteredSchemas}
                    menuContents={menuContents}
                    isLatestSchema={isLatestSchema}
                    isDiffShowing={isDiffShowing}
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
    </EmotionThemeProvider>
  );
}

export default DictionaryPage;
