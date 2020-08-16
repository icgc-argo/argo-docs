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
import { TagVariant } from '../../components/Tag';
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

import styled from '@emotion/styled';
import Dictionary from '../../components/Dictionary';
import { TAG_VARIANTS } from '@icgc-argo/uikit/Tag';
import { createSchemasWithDiffs, getDictionary, getDictionaryDiff } from './helpers';
import { ChangeType, Schema, Field } from '../../../types';

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
console.log('data', data);
// one version (that has been downloaded) behind latest version
const preloadedDiff = require('../../../static/data/schemas/diffs/0.6/0.6-diff-0.5.json');

//const dictionaryTreeData = require('./tree.json');

// versions
const versions: string[] = data.versions;

// filters
const comparisonFilter = (comparison: ChangeType) => (field: Field) => {
  if (comparison === NO_ACTIVE_FILTER) return true;
  field.changeType === comparison;
};

const attributeFilter = (attribute) => (field: Field) => {
  if (attribute === NO_ACTIVE_FILTER) return true;
  const required = get(field, 'restrictions.required', false);
  const dependsOn = get(field, 'meta.dependsOn', false);

  return (
    (attribute === TagVariant.CONDITIONAL && Boolean(dependsOn)) ||
    (attribute === TagVariant.REQUIRED && required) ||
    false
  );
};

const tierFilter = (tier) => (field: Field) => {
  if (tier === NO_ACTIVE_FILTER) return true;

  const primaryId = get(field, 'meta.primaryId', false);
  const core = get(field, 'meta.core', false);

  return (
    (tier === TagVariant.ID && primaryId) ||
    (tier === TagVariant.CORE && core) ||
    (tier === TagVariant.EXTENDED && !core && !primaryId) ||
    false
  );
};

function DictionaryPage() {
  // docusaurus context
  const context = useDocusaurusContext();
  const {
    siteConfig: {
      customFields: { PLATFORM_UI_ROOT = '', GATEWAY_API_ROOT = '' },
    },
  } = context;

  const diffVersions: string[] = versions.filter((v) => v !== preloadedDictionary.version);

  const [version, setVersion] = useState<string>(preloadedDictionary.version);
  const [diffVersion, setDiffVersion] = useState<string>(diffVersions[0]);

  // Check if current schema is the latest version
  const isLatestSchema = getLatestVersion() === version ? true : false;

  const [dictionary, setDictionary] = useState(preloadedDictionary.data);
  //  const [treeData, setTreeData] = useState(dictionaryTreeData);

  const [dictionaryDiff, setDictionaryDiff] = useState(preloadedDiff);
  const [isDiffShowing, setIsDiffShowing] = useState(false);

  const [activeSchemas, setActiveSchemas] = useState<Schema[]>([]);
  console.log('active schema', activeSchemas);

  React.useEffect(() => {
    async function resolveSchemas() {
      try {
        const dict = await getDictionary(version, preloadedDictionary);
        const diff = await getDictionaryDiff(version, diffVersion);
        const schemas = createSchemasWithDiffs(dict.schemas, diff.schemas);
        setActiveSchemas(schemas);
      } catch (e) {
        console.error('Cannot resolve schemas', e);
        setActiveSchemas([]);
      }
    }
    resolveSchemas();
  }, [version, diffVersion]);

  /* 
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
 */
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

  const schemas = createSchemasWithDiffs(dictionary.schemas, dictionaryDiff.schemas);
  console.log('schemas', 'active schemas', activeSchemas);

  // filter schemas
  const filteredSchemas = React.useMemo(
    () =>
      //  filter CREATED schemas out if not showing diff
      activeSchemas
        .filter((schema) => schema.changeType !== ChangeType.CREATED && schema.fields.length > 0)
        .map((schema) => ({
          ...schema,
          fields: schema.fields.filter((field) => field.changeType !== ChangeType.CREATED),
        }))
        // filter schemas based on active/search
        .map((schema) => {
          const { tier, attribute, comparison } = searchParams;

          const filteredFields = schema.fields
            .filter(tierFilter(tier))
            .filter(attributeFilter(attribute))
            .filter(comparisonFilter(comparison));

          return {
            ...schema,
            fields: filteredFields,
          };
        }),
    [activeSchemas, isDiffShowing, searchParams],
  );

  console.log('filtered schemas', filteredSchemas);

  // create filters dynamically based on active schemas
  const filters = React.useMemo(() => {
    const fields = schemas.map((schema) => schema.fields);

    const filters = flattenDeep(fields).reduce(
      (acc, field) => {
        const meta = get(field, 'meta', {});
        const { primaryId = false, core = false, dependsOn = false } = meta;
        const restrictions = get(field, 'restrictions', false);
        if (primaryId) {
          acc.tiers.push(TagVariant.ID);
        }

        if (!!restrictions) {
          acc.attributes.push(TagVariant.REQUIRED);
        }

        if (dependsOn) {
          acc.attributes.push(TagVariant.CONDITIONAL);
        }

        if (core) {
          acc.tiers.push(TagVariant.CORE);
        }

        if (!core && !primaryId) {
          acc.tiers.push(TagVariant.EXTENDED);
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
