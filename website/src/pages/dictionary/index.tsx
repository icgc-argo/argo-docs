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
  generateComparisonFilter,
  createFilters,
  attributeFilter,
  tierFilter,
  comparisonFilter,
  defaultSearchParams,
  DEFAULT_FILTER,
} from '../../components/FileFilters';
import TreeView from '../../components/TreeView';
import startCase from 'lodash/startCase';
import Modal from '@icgc-argo/uikit/Modal';
import SchemaMenu from '../../components/ContentMenu';
import { Display, DownloadTooltip, DownloadButtonContent } from '../../components/common';
import { getLatestVersion } from '../../utils';
import Tabs, { Tab } from '@icgc-argo/uikit/Tabs';
import { StyledTab, TAB_STATE } from '../../components/Tabs';
import Meta from '../../components/Meta';
import Icon from '@icgc-argo/uikit/Icon';
import OldButton from '@icgc-argo/uikit/Button';
import Button from '../../components/Button';
import { ResetButton } from '../../components/Button';
import CompareLegend, { generateComparisonCounts } from '../../components/CompareLegend';
import Row from '../../components/Row';
import VersionSelect from '../../components/VersionSelect';
import EmotionThemeProvider from '../../styles/EmotionThemeProvider';
import argoTheme from '../../styles/theme/icgc-argo';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import Dictionary from '../../components/Dictionary';
import { createSchemasWithDiffs, getDictionary, getDictionaryDiff } from '../../helpers/schema';
import { ChangeType, Schema } from '../../../types';

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

const modalPortalRef = React.createRef<HTMLDivElement>();

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
const preloadedDictionary = { data: data.dictionary, version: data.currentVersion.version };

// versions
const versions: Array<{ version: string; date: string }> = data.versions;

function DictionaryPage() {
  // docusaurus context
  const context = useDocusaurusContext();
  const {
    siteConfig: {
      customFields: { PLATFORM_UI_ROOT = '', GATEWAY_API_ROOT = '' },
    },
  } = context;

  const [version, setVersion] = useState<string>(preloadedDictionary.version);

  // set diff version to 2nd version to compare to
  const [diffVersion, setDiffVersion] = useState<string>(versions[1].version);

  const [isDiffShowing, setIsDiffShowing] = useState(false);

  const [activeSchemas, setActiveSchemas] = useState<Schema[]>(preloadedDictionary.data.schemas);

  // Check if current schema is the latest version
  const isLatestSchema = getLatestVersion() === version ? true : false;

  React.useEffect(() => {
    async function resolveSchemas() {
      try {
        const dict = await getDictionary(version);
        const diff = await getDictionaryDiff(version, diffVersion);
        const schemas = diff ? createSchemasWithDiffs(dict.schemas, diff.schemas) : dict.schemas;
        setActiveSchemas(schemas);
      } catch (e) {
        console.error('Cannot resolve schemas', e);
        setActiveSchemas([]);
      }
    }
    resolveSchemas();
  }, [version, diffVersion]);

  const [searchParams, setSearchParams] = useState(defaultSearchParams);
  const [selectedTab, setSelectedTab] = React.useState(TAB_STATE.DETAILS);

  const downloadTsvFileTemplate = (fileName) =>
    window.location.assign(`${GATEWAY_API_ROOT}clinical/template/${fileName}`);

  // filter schemas
  const filteredSchemas = React.useMemo(
    () =>
      //  filter DELETED schemas out if not showing diff
      activeSchemas
        .filter((schema) => (isDiffShowing ? Boolean : schema.changeType !== ChangeType.DELETED))
        .map((schema) => ({
          ...schema,
          fields: schema.fields.filter((field) =>
            isDiffShowing ? Boolean : field.changeType !== ChangeType.DELETED,
          ),
        }))
        // filter schemas based on active/search
        .map((schema) => {
          const { tier, attribute, comparison } = searchParams;

          const filteredFields = schema.fields
            .filter(tierFilter(tier))
            .filter(attributeFilter(attribute))
            .filter(comparisonFilter(comparison as ChangeType));

          return {
            ...schema,
            fields: filteredFields,
          };
        })
        .filter((schema) => schema.fields.length > 0),
    [activeSchemas, isDiffShowing, searchParams],
  );

  const comparisonCounts = generateComparisonCounts(filteredSchemas);
  const fileCount = filteredSchemas.length;
  const fieldCount = filteredSchemas.reduce((acc, schema) => acc + schema.fields.length, 0);

  // create filters dynamically based on active schemas
  const filters = React.useMemo(() => createFilters(activeSchemas), [activeSchemas]);

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
                  The CancerModels.org Data Dictionary expresses the details of the data model,
                  which adheres to specific formats and restrictions to ensure a standard of data
                  quality. The following describes the attributes and permissible values for all of
                  the fields within the clinical tsv files for the{' '}
                  <Link to={PLATFORM_UI_ROOT as string}>CancerModels.org platform.</Link>
                </Typography>
              </div>
              <InfoBar>
                <div
                  css={css`
                    display: flex;
                  `}
                >
                  <VersionSelect
                    style={css`
                      margin-right: 10px;
                    `}
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
                      style={css`
                        margin-left: 10px;
                      `}
                      value={diffVersion}
                      versions={versions}
                      onChange={setDiffVersion}
                    />
                    <CompareLegend
                      comparison={comparisonCounts}
                      styles={css`
                        margin: 0 10px;
                      `}
                    />
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => {
                        setIsDiffShowing(false);
                        setSearchParams({ ...searchParams, comparison: DEFAULT_FILTER.value });
                      }}
                    >
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
                      tiers={filters.tiers.map(generateFilter)}
                      attributes={filters.attributes.map(generateFilter)}
                      comparisons={
                        version === diffVersion
                          ? []
                          : filters.comparison.map(generateComparisonFilter)
                      }
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
