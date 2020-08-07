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
import React, { useState, useMemo, useEffect } from 'react';
import Table from '../Table';
import Tag, { TAG_TYPES } from '../Tag';
import styles from './styles.module.css';
import DefaultTag from '@icgc-argo/uikit/Tag';
import CodeList from './CodeList';
import Regex from './Regex';
import startCase from 'lodash/startCase';
import { DataTypography, SchemaTitle } from '../Typography';
import { ModalPortal } from '../../pages/dictionary';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { styled } from '@icgc-argo/uikit';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Icon from '@icgc-argo/uikit/Icon';
import { useTheme } from 'emotion-theming';
import { Theme } from '../../styles/theme/icgc-argo';
import { FieldDescription, Script } from './TableComponents';
import Modal from '../Modal';
import Typography from '@icgc-argo/uikit/Typography';
import CodeBlock, { CompareCodeBlock } from '../CodeBlock';
import { css } from '@emotion/core';

const TagContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  div {
    display: inline;
    :not(:first-child) {
      margin-top: 5px;
    }
  }
`;

const formatFieldType = (value) => {
  switch (value) {
    case 'string':
      return 'TEXT';
    default:
      return value.toUpperCase();
  }
};

const HeaderName = ({ name }) => {
  const sentenceCase = startCase(name);
  return (
    <SchemaTitle>
      {sentenceCase} ({name})
    </SchemaTitle>
  );
};

const FieldsTag = ({ fieldCount }) => (
  <DefaultTag
    className={`${styles.tag} ${styles.fields}`}
    style={{ marginTop: '3px' }}
  >{`${fieldCount} Field${fieldCount > 1 ? 's' : ''}`}</DefaultTag>
);

const getTableData = (isDiffShowing, schema) =>
  isDiffShowing
    ? schema.fields
    : schema.fields
        .filter((field) => {
          // filter out fields which have deleted or created
          // return field.changeType !== ChangeType.DELETED;
          return field.changeType !== ChangeType.DELETED;
        })
        .map((field) => ({ ...field, changeType: null, diff: null }));

const Schema = ({ schema, menuItem, isLatestSchema, isDiffShowing }) => {
  const context = useDocusaurusContext();
  const {
    siteConfig: {
      customFields: { GATEWAY_API_ROOT = '' },
    },
  } = context;

  const downloadTsvFileTemplate = (fileName) => {
    window.location.assign(`${GATEWAY_API_ROOT}clinical/template/${fileName}`);
  };

  /**
   * need to pass in state for Cell rendering
   * react-table rerenders everything
   */
  const initialExpandingFields = useMemo(
    () =>
      schema.fields.reduce((acc, val) => {
        acc[val.name] = false;
        return acc;
      }, {}),
    [schema],
  );

  const [expandedCodeLists, setExpandedCodeLists] = useState(initialExpandingFields);

  useEffect(() => {
    setExpandedCodeLists(initialExpandingFields);
  }, [schema]);

  const onCodelistExpandToggle = (field) => () =>
    setExpandedCodeLists({ ...expandedCodeLists, [field]: !expandedCodeLists[field] });

  const isCodeListExpanded = (field) => expandedCodeLists[field];

  const [currentShowingScript, setCurrentShowingScripts] = React.useState<{
    diff?: { left: string[]; right: string[] };
    content?: string[];
    fieldName: string;
  }>(null);

  const CellContentCenter = styled('div')`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `;

  const StarIcon = (props) => <Icon name="star" width="16px" height="16px" {...props} />;

  const cols = [
    {
      id: 'compare',
      headerClassName: 'reset',
      Header: (
        <CellContentCenter>
          <StarIcon fill="#babcc2" />
        </CellContentCenter>
      ),
      Cell: ({ original }) => {
        const changeType = original.changeType;
        return changeType ? (
          <CellContentCenter>
            <StarIcon fill={theme.diffColors[changeType]} />
          </CellContentCenter>
        ) : null;
      },
      resizable: false,
      width: 40,
      headerStyle: { textAlign: 'center' },
    },

    {
      Header: 'Field & Description',
      id: 'fieldDescription',
      Cell: ({ original: { name, description, diff } }) => (
        <FieldDescription name={name} description={description} diff={diff && diff.description} />
      ),
      style: { whiteSpace: 'normal', wordWrap: 'break-word', padding: '8px' },
    },
    {
      Header: 'Data Tier',
      Cell: ({ original }) => {
        const meta = get(original, 'meta', {});
        if (isEmpty(meta)) {
          return <Tag type={TAG_TYPES.extended} />;
        } else {
          const { primaryId, core } = meta;
          return primaryId ? (
            <Tag type={TAG_TYPES.id} />
          ) : core ? (
            <Tag type={TAG_TYPES.core} />
          ) : (
            <Tag type={TAG_TYPES.extended} />
          );
        }
      },
      style: { padding: '8px' },
      width: 85,
    },
    {
      Header: 'Attributes',
      id: 'attributes',
      Cell: ({ original: { restrictions, meta } }) => {
        const isRestrictedField = restrictions && restrictions.required;
        const isConditionalField = meta && !!meta.dependsOn;
        return (
          <TagContainer>
            {isRestrictedField && <Tag type={TAG_TYPES.required} />}
            {isConditionalField && <Tag type={TAG_TYPES.conditional} />}
          </TagContainer>
        );
      },
      style: { padding: '8px' },
      width: 102,
    },
    {
      Header: 'Type',
      id: 'valueType',
      accessor: ({ valueType }) => formatFieldType(valueType),
      style: { padding: '8px' },
      width: 70,
    },
    {
      Header: 'Permissible Values',
      id: 'permissibleValues',
      accessor: 'restrictions',
      Cell: ({ original }) => {
        const { name: field, restrictions, meta, diff } = original;

        const regex = get(restrictions, 'regex', null);

        const codeList = get(restrictions, 'codeList', null);
        const codeListDiff = get(diff, 'restrictions.codeList', null);

        const examples = get(meta, 'examples', '');

        if (regex) {
          return <Regex regex={regex} examples={examples.split(',')} />;
        } else if (codeList) {
          return (
            <CodeList
              codeList={codeList}
              diff={codeListDiff}
              onToggle={onCodelistExpandToggle(field)}
              isExpanded={isCodeListExpanded(field)}
            />
          );
        } else {
          return null;
        }
      },
      style: { whiteSpace: 'normal', wordWrap: 'break-word', padding: '8px' },
    },
    {
      Header: 'Notes & Scripts',
      Cell: ({ original: { name, meta, restrictions, diff } }) => {
        const notes = meta && meta.notes;
        const script = restrictions && restrictions.script;
        return (
          <Script
            name={name}
            notes={notes}
            script={script}
            diff={diff}
            showScript={setCurrentShowingScripts}
          />
        );
      },
      style: { whiteSpace: 'normal', wordWrap: 'break-word', padding: '8px' },
    },
  ].filter((col) => (isDiffShowing ? true : col.id !== 'compare'));

  const containerRef = React.createRef();

  const theme: Theme = useTheme();
  const rowColors = theme.schema.row;

  const highlightRowDiff = (changeType) => ({
    style: {
      background: rowColors[changeType],
    },
  });

  const tableData = getTableData(isDiffShowing, schema);

  return (
    <div ref={menuItem.contentRef} data-menu-title={menuItem.name} className={styles.schema}>
      {currentShowingScript && (
        <ModalPortal>
          <Modal
            css={css`
              min-width: 600px;
            `}
            title={
              <Typography variant="subtitle">
                Field Script Restriction for:{' '}
                <span style={{ fontWeight: 600 }}>{currentShowingScript.fieldName}</span>
              </Typography>
            }
            onCloseClick={() => {
              setCurrentShowingScripts(null);
            }}
            onCancelClick={() => {
              setCurrentShowingScripts(null);
            }}
            actionVisible={false}
            buttonSize="sm"
          >
            {currentShowingScript.diff ? (
              <CompareCodeBlock
                left={currentShowingScript.diff.left}
                right={currentShowingScript.diff.right}
              />
            ) : (
              <CodeBlock codes={currentShowingScript.content} />
            )}
          </Modal>
        </ModalPortal>
      )}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: '11px',
        }}
      >
        <HeaderName name={schema.name} />
        <FieldsTag fieldCount={schema.fields.length} />
      </div>

      <div
        style={{
          marginBottom: '11px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <DataTypography style={{ flex: 1 }}>
          {schema && schema.description}
          <div>
            File Name Example:{' '}
            <span className={styles.fileExampleHighlight}>{`${schema.name}`}</span>
            [-optional-extension]<span className={styles.fileExampleHighlight}>.tsv</span>
          </div>
        </DataTypography>

        {/* <DownloadTooltip disabled={isLatestSchema}>
          <div style={{ marginLeft: '50px', alignSelf: 'flex-start' }}>
            <Button
              disabled={!isLatestSchema}
              variant="secondary"
              size="sm"
              onClick={() => downloadTsvFileTemplate(`${schema.name}.tsv`)}
            >
              <DownloadButtonContent disabled={!isLatestSchema}>
                File Template
              </DownloadButtonContent>
            </Button>
          </div>
        </DownloadTooltip> */}
      </div>

      <div ref={containerRef}>
        <Table
          getTrProps={(state, rowInfo) => {
            const changeType = rowInfo.original.changeType;
            return changeType ? highlightRowDiff(changeType) : {};
          }}
          parentRef={containerRef}
          columns={cols}
          data={tableData}
          showPagination={false}
          defaultPageSize={tableData.length}
          pageSize={tableData.length}
          sortable={true}
          cellAlignment="top"
          withOutsideBorder
          highlight={false}
        />
      </div>
    </div>
  );
};

export enum ChangeType {
  CREATED = 'created',
  UPDATED = 'updated',
  DELETED = 'deleted',
}

export default Schema;
