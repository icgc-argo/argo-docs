import React, { useState, useMemo, useEffect } from 'react';
import Table from '@icgc-argo/uikit/Table';
import Tag, { TAG_TYPES } from '../Tag';
import styles from './styles.module.css';
import DefaultTag from '@icgc-argo/uikit/Tag';
import CodeList from './CodeList';
import Regex from './Regex';
import startCase from 'lodash/startCase';
import { DownloadButtonContent, DownloadTooltip } from '../../components/common';
import Button from '@icgc-argo/uikit/Button';
import { DataTypography, SchemaTitle } from '../Typography';
import { ModalPortal, useModalState } from '../../pages/dictionary';
import ScriptModal from '../ScriptModal';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { styled } from '@icgc-argo/uikit';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const Notes = styled('div')`
  margin-bottom: 15px;
`;

const formatFieldType = value => {
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

const FieldDescription = ({ name, description }) => (
  <div className={styles.fieldDescription}>
    <div className={styles.name}>{name}</div>
    <div>{description}</div>
  </div>
);

const FieldsTag = ({ fieldCount }) => (
  <DefaultTag
    className={`${styles.tag} ${styles.fields}`}
    style={{ marginTop: '3px' }}
  >{`${fieldCount} Field${fieldCount > 1 ? 's' : ''}`}</DefaultTag>
);

const Schema = ({ schema, menuItem, isLatestSchema }) => {
  // SSR fix
  if (typeof schema === 'undefined') return null;

  const context = useDocusaurusContext();
  const {
    siteConfig: {
      customFields: { GATEWAY_API_ROOT = '' },
    },
  } = context;

  const downloadTsvFileTemplate = fileName => {
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

  const onCodelistExpandToggle = field => () =>
    setExpandedCodeLists({ ...expandedCodeLists, [field]: !expandedCodeLists[field] });

  const isCodeListExpanded = field => expandedCodeLists[field];

  const [currentShowingScripts, setCurrentShowingScripts] = React.useState(null);
  const ScriptCell = ({ original: { meta, restrictions, name } }) => {
    const scripts = restrictions && restrictions.script;
    return (
      <div>
        {meta && meta.notes && <Notes>{meta.notes}</Notes>}
        {scripts && (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              setCurrentShowingScripts({
                fieldName: name,
                content: scripts,
              });
            }}
          >
            View Script
          </Button>
        )}
      </div>
    );
  };

  const cols = [
    {
      Header: 'Field & Description',
      id: 'fieldDescription',
      Cell: ({ original: { name, description } }) => (
        <FieldDescription name={name} description={description} />
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
        if (restrictions && restrictions.required) {
          return <Tag type={TAG_TYPES.required} />;
        } else if (meta && !!meta.dependsOn) {
          return <Tag type={TAG_TYPES.dependency} />;
        } else {
          return null;
        }
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
        const { name: field, restrictions = {}, meta } = original;
        const { regex = null, codeList = null } = restrictions;
        const examples = meta && meta.examples && meta.examples.split(',');
        if (regex) {
          return <Regex regex={regex} examples={examples} />;
        } else if (codeList) {
          return (
            <CodeList
              codeList={codeList}
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
      Cell: ScriptCell,
      style: { whiteSpace: 'normal', wordWrap: 'break-word', padding: '8px' },
    },
  ];
  const containerRef = React.createRef();

  return (
    <div ref={menuItem.contentRef} data-menu-title={menuItem.name} className={styles.schema}>
      {currentShowingScripts && (
        <ModalPortal>
          <ScriptModal
            field={currentShowingScripts.fieldName}
            script={currentShowingScripts.content}
            onCloseClick={() => {
              setCurrentShowingScripts(null);
            }}
          />
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
          parentRef={containerRef}
          columns={cols}
          data={schema.fields}
          showPagination={false}
          sortable={true}
          cellAlignment="top"
          withOutsideBorder
        />
      </div>
    </div>
  );
};

export default Schema;
