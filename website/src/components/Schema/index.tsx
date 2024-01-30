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
import React, { useState, useMemo, useEffect, Fragment } from 'react';
import Table from '../Table';
import Tag, { TagVariant, TAG_DISPLAY_NAME, TagContainer } from '../Tag';
import styles from './styles.module.css';
import DefaultTag, { TAG_VARIANTS } from '@icgc-argo/uikit/Tag';
import CodeList, { Code } from './CodeList';
import Regex, { RegexExamples } from './Regex';
import startCase from 'lodash/startCase';
import { DataTypography, SchemaTitle } from '../Typography';
import { ModalPortal } from '../../pages/dictionary';
import get from 'lodash/get';
import { styled } from '@icgc-argo/uikit';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Icon from '@icgc-argo/uikit/Icon';
import { useTheme } from 'emotion-theming';
import { Theme } from '../../styles/theme/icgc-argo';
import { Script } from './TableComponents';
import Modal from '../Modal';
import Typography from '@icgc-argo/uikit/Typography';
import CodeBlock, { CompareCodeBlock } from '../CodeBlock';
import { css } from '@emotion/core';
import { DiffText, deletedStyle, createdStyle, updatedStyle } from './DiffText';
import union from 'lodash/union';
import { ChangeType, Schema } from '../../../types';
import Button from '../Button';
import { compareText } from '../CompareLegend';

const formatFieldType = (value) => {
  switch (value) {
    case null:
      return '';
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

const FileExample = ({ name }) => (
  <div>
    File Name Example:{' '}
    <span
      css={css`
        font-weight: 600;
      `}
    >{`${name}`}</span>
    [-optional-extension]
    <span
      css={css`
        font-weight: 600;
      `}
    >
      .tsv
    </span>
  </div>
);

const styleSchemaDiff = (theme, changeType) =>
  changeType !== ChangeType.NONE && changeType !== ChangeType.UPDATED
    ? css`
        > div,
        h3 {
          padding: 2px;
          text-decoration: ${changeType === ChangeType.DELETED && 'line-through'};
          background: ${theme.diffColors.schemaField[changeType]};
          width: fit-content;
        }
      `
    : null;

type SchemaMetaProps = { schema: Schema; fieldCount: number; isDiffShowing: boolean };
const SchemaMeta = ({ schema, fieldCount, isDiffShowing }: SchemaMetaProps) => {
  const { name, changeType, description, diff } = schema;
  return (
    <div css={(theme) => isDiffShowing && styleSchemaDiff(theme, changeType)}>
      <div
        css={css`
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-bottom: 11px;
        `}
      >
        <HeaderName name={name} />
        <FieldsTag fieldCount={fieldCount} />
      </div>

      <div
        css={css`
          margin-bottom: 11px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: flex-start;
        `}
      >
        <DataTypography>
          {diff && diff.description ? (
            <div>
              <div css={updatedStyle}>{diff.description.left}</div>
              <div css={deletedStyle}>{diff.description.right}</div>
            </div>
          ) : description ? (
            description
          ) : null}
          <FileExample name={name} />
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
    </div>
  );
};

/**
 *
 * @param diff
 * @param fields
 * Check if all fields present in diff object
 */
const checkDiff = (diff, fields) =>
  fields.reduce((acc, field) => acc && Boolean(get(diff, field, false)), true);

// TODO: dont like this, cells should render based on isDiffShowing
const getTableData = (isDiffShowing, fields) =>
  isDiffShowing
    ? fields
    : fields
        .filter((field) => {
          return field.changeType !== ChangeType.DELETED;
        })
        .map((field) => ({ ...field, changeType: null, diff: null }));

const SchemaView = ({
  schema,
  menuItem,
  isLatestSchema,
  isDiffShowing,
}: {
  schema: Schema;
  menuItem: any;
  isLatestSchema: boolean;
  isDiffShowing: boolean;
}) => {
  const context = useDocusaurusContext();
  const {
    siteConfig: {
      customFields: { GATEWAY_API_ROOT = '' },
    },
  } = context;

  const downloadTsvFileTemplate = (fileName) => {
    window.location.assign(`${GATEWAY_API_ROOT}clinical/proxy/template/${fileName}`);
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

  const ComparisonCell = styled('div')`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: left;
    position: relative;
    top: 8px;
    font-weight: bold;
    box-sizing: unset;
    svg {
      margin-right: 3px;
      flex-shrink: 0;
    }

    span {
      position: relative;
      top: 1px;
    }
  `;

  const StarIcon = (props) => <Icon name="star" width="16px" height="16px" {...props} />;

  const cols = [
    {
      id: 'compare',
      Header: 'Comparison',

      Cell: ({ original: { diff, changeType } }) => {
        return changeType && changeType !== ChangeType.NONE ? (
          <ComparisonCell>
            <StarIcon fill={theme.diffColors.star[changeType]} />
            <span>{compareText[changeType]}</span>
          </ComparisonCell>
        ) : null;
      },
      resizable: false,
      width: 82,
      headerStyle: { textAlign: 'center' },
    },
    {
      Header: 'Field & Description',
      id: 'fieldDescription',
      Cell: ({ original }) => {
        const { name, description, diff, changeType } = original;
        const hasDiff = checkDiff(diff, ['description']);

        return (
          <div
            css={css`
              font-size: 12px;
            `}
          >
            <div
              css={css`
                font-weight: 600;
              `}
            >
              {name}
            </div>
            {changeType === ChangeType.UPDATED && hasDiff ? (
              <DiffText oldText={diff.description.left} newText={diff.description.right} />
            ) : (
              description
            )}
          </div>
        );
      },
      style: { whiteSpace: 'normal', wordWrap: 'break-word', padding: '8px' },
    },
    {
      Header: 'Data Tier',
      Cell: ({ original }) => {
        const { meta = {}, diff, changeType } = original;

        const hasDiff = checkDiff(diff, ['meta.core', 'meta.primaryId']);

        const tier = getDataTier(meta.primaryId, meta.core);

        return changeType === ChangeType.UPDATED && hasDiff ? (
          <DiffText
            newText={TAG_DISPLAY_NAME[getDataTier(diff.meta.primaryId.right, diff.meta.core.right)]}
            oldText={TAG_DISPLAY_NAME[getDataTier(diff.meta.primaryId.left, diff.meta.core.left)]}
          />
        ) : changeType === ChangeType.DELETED ? (
          TAG_DISPLAY_NAME[tier]
        ) : (
          <Tag variant={tier} />
        );
      },
      style: { padding: '8px' },
      width: 85,
    },
    {
      Header: 'Attributes',
      id: 'attributes',
      Cell: ({ original }) => {
        const { restrictions = {}, meta = {}, diff, changeType } = original;

        const hasDiff =
          checkDiff(diff, ['meta.dependsOn']) || checkDiff(diff, ['restrictions.required']);

        const attributes = getAttributes(restrictions.required, meta.dependsOn);
        const diffRequired = get(diff, 'restrictions.required', null);
        const diffDependsOn = get(diff, 'meta.dependsOn', null);

        const leftAttributes = getAttributes(
          diffRequired && diffRequired.left,
          diffDependsOn && diffDependsOn.left,
        );
        const rightAttributes = getAttributes(
          diffRequired && diffRequired.right,
          diffDependsOn && diffDependsOn.right,
        );

        return (
          <TagContainer>
            {changeType === ChangeType.UPDATED && hasDiff ? (
              <div>
                <div css={rightAttributes.length > 0 && createdStyle}>
                  {rightAttributes.map((att) => (
                    <div key={att}>{TAG_DISPLAY_NAME[att]}</div>
                  ))}
                </div>
                <div css={leftAttributes.length > 0 && deletedStyle}>
                  {leftAttributes.map((att) => (
                    <div key={att}>{TAG_DISPLAY_NAME[att]}</div>
                  ))}
                </div>
              </div>
            ) : changeType === ChangeType.DELETED && attributes.length > 0 ? (
              attributes.map((attribute) => TAG_DISPLAY_NAME[attribute])
            ) : attributes.length > 0 ? (
              attributes.map((attribute) => <Tag variant={attribute} key={attribute} />)
            ) : null}
          </TagContainer>
        );
      },
      style: { padding: '8px' },
      width: 102,
    },
    {
      Header: 'Type',
      id: 'valueType',
      Cell: ({ original: { valueType, diff } }) =>
        diff && diff.valueType ? (
          <DiffText
            oldText={formatFieldType(diff.valueType.left)}
            newText={formatFieldType(diff.valueType.right)}
          />
        ) : (
          formatFieldType(valueType)
        ),
      style: { padding: '8px' },
      width: 70,
    },
    {
      Header: 'Permissible Values',
      id: 'permissibleValues',
      accessor: 'restrictions',
      Cell: ({ original }) => {
        const { name: field, diff, changeType, ...rest } = original;

        const regex = get(rest, 'restrictions.regex', null);
        const codeList = get(rest, 'restrictions.codeList', null);
        const examples = get(rest, 'meta.examples', '');

        const diffRegex = get(diff, 'restrictions.regex');
        const diffExamples = get(diff, 'meta.examples');
        const diffCodeList = get(diff, 'restrictions.codeList');

        const formattedCodes = diffCodeList ? getFormattedCodes(diffCodeList) : null;

        return (
          <div>
            {diffRegex || diffExamples ? (
              <div
                css={css`
                  div {
                    margin-top: 5px;
                  }
                `}
              >
                <div css={deletedStyle}>
                  {diffRegex && <Regex regex={diffRegex.left} />}
                  {diffRegex && diffExamples && (
                    <RegexExamples regex={diffRegex.left} examples={diffExamples.left} />
                  )}
                </div>

                <div css={createdStyle}>
                  {diffRegex && <Regex regex={diffRegex.right} />}
                  {diffRegex && diffExamples && (
                    <RegexExamples regex={diffRegex.right} examples={diffExamples.right} />
                  )}
                </div>
              </div>
            ) : (
              regex && (
                <div>
                  <Regex regex={regex} />
                  <RegexExamples regex={regex} examples={examples} />
                </div>
              )
            )}
            {checkDiff(diff, ['restrictions.codeList']) ? (
              <div>{formattedCodes}</div>
            ) : (
              codeList && (
                <CodeList
                  codeList={codeList}
                  onToggle={onCodelistExpandToggle(field)}
                  isExpanded={isCodeListExpanded(field)}
                />
              )
            )}
          </div>
        );
      },

      style: { whiteSpace: 'normal', wordWrap: 'break-word', padding: '8px' },
    },
    {
      Header: 'Notes & Scripts',
      Cell: ({ original: { name, meta, restrictions, diff, changeType } }) => {
        const notes = meta && meta.notes;
        const script = restrictions && restrictions.script;
        const diffScript = get(diff, 'restrictions.script');
        const diffNotes = get(diff, 'meta.notes');

        return (
          <div>
            {changeType === ChangeType.UPDATED && checkDiff(diff, ['meta.notes']) ? (
              <DiffText newText={diffNotes.right} oldText={diffNotes.left} />
            ) : (
              notes
            )}
            {script && changeType === ChangeType.DELETED ? (
              <Button variant="secondary" size="sm" disabled>
                View Scripts
              </Button>
            ) : script || diffScript ? (
              <Script
                name={name}
                script={script}
                diff={diffScript}
                showScript={setCurrentShowingScripts}
              />
            ) : null}
          </div>
        );
      },
      style: { whiteSpace: 'normal', wordWrap: 'break-word', padding: '8px' },
    },
  ].filter((col) => (isDiffShowing ? true : col.id !== 'compare'));

  const containerRef = React.createRef<HTMLDivElement>();

  const theme: Theme = useTheme();
  const rowColors = theme.diffColors.schemaField;

  const highlightRowDiff = (changeType) => ({
    style: {
      background: rowColors[changeType],
      textDecoration: changeType === ChangeType.DELETED ? 'line-through' : null,
    },
  });

  const tableData = getTableData(isDiffShowing, schema.fields);

  const getDataTier = (primaryId: boolean, core: boolean): TagVariant => {
    return primaryId ? TagVariant.ID : core ? TagVariant.CORE : TagVariant.EXTENDED;
  };

  const getAttributes = (required: boolean, dependsOn: boolean): TagVariant[] => {
    const attributes = [];
    if (required) attributes.push(TagVariant.REQUIRED);
    if (dependsOn) attributes.push(TagVariant.CONDITIONAL);
    return attributes;
  };

  const getFormattedCodes = (codeList) => {
    const createdCodes = get(codeList, 'data.added', []);
    const deletedCodes = get(codeList, 'data.deleted', []);

    const left = codeList.left || [];
    const right = codeList.right || [];
    const allCodes: string[] = union(left, right);

    return (
      <div>
        {allCodes.map((code) => {
          const formatter = deletedCodes.includes(code)
            ? ChangeType.DELETED
            : createdCodes.includes(code)
            ? ChangeType.CREATED
            : null;

          return <Code key={code} code={code} format={formatter} />;
        })}
      </div>
    );
  };

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

      <SchemaMeta isDiffShowing={isDiffShowing} fieldCount={schema.fields.length} schema={schema} />

      <div ref={containerRef}>
        <Table
          getTrProps={(state, rowInfo) => {
            const changeType = rowInfo.original.changeType;
            return changeType ? highlightRowDiff(changeType) : {};
          }}
          withRowBorder
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

export default SchemaView;
