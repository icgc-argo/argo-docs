import React, { useState, useMemo, useEffect } from 'react';
import Table from '@icgc-argo/uikit/Table';
import Tag, { TAG_TYPES } from '../Tag';
import styles from './styles.module.css';
import DefaultTag from '@icgc-argo/uikit/Tag';
import CodeList from './CodeList';
import Regex from './Regex';
import startCase from 'lodash/startCase';
import Button from '@icgc-argo/uikit/Button';
import { DataTypography, SchemaTitle } from '../Typography';

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
  <DefaultTag className={styles.fieldsTag}>{`${fieldCount} Field${
    fieldCount > 1 ? 's' : ''
  }`}</DefaultTag>
);

const Schema = ({ schema, key }) => {
  // SSR fix
  if (typeof schema === 'undefined') return null;

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

  const cols = [
    {
      Header: 'Field & Description',
      id: 'fieldDescription',
      Cell: ({ original: { name, description } }) => (
        <FieldDescription name={name} description={description} />
      ),
      style: { whiteSpace: 'normal', wordWrap: 'break-word' },
    },
    {
      Header: 'Data Tier',
      Cell: ({ original: { meta } }) => {
        if (!meta) return null;
        const { primaryId, core } = meta;
        const type = primaryId ? TAG_TYPES.id : core ? TAG_TYPES.core : TAG_TYPES.extended;
        return <Tag type={type} />;
      },
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
    },
    { Header: 'Type', id: 'valueType', accessor: ({ valueType }) => formatFieldType(valueType) },
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
    },
    {
      Header: 'Notes & Scripts',
      Cell: ({ original: { meta, restrictions } }) => {
        const script = restrictions && restrictions.script;
        return (
          <div>
            {meta && meta.notes && <div>{meta.notes}</div>}
            {script && <Button>View Script</Button>}
          </div>
        );
      },
      style: { whiteSpace: 'normal', wordWrap: 'break-word' },
    },
  ];
  const containerRef = React.createRef();

  return (
    <div className={styles.schema}>
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

      <div style={{ marginBottom: '11px' }}>
        <DataTypography>
          {schema && schema.description}
          <div>
            Field Name Example:{' '}
            <span className={styles.fieldExampleHighlight}>{`${schema.name}`}</span>
            [-optional-extension]<span className={styles.fieldExampleHighlight}>.tsv</span>
          </div>
        </DataTypography>
      </div>

      <div ref={containerRef}>
        <Table
          parentRef={containerRef}
          columns={cols}
          data={schema.fields}
          showPagination={false}
          sortable={true}
        />
      </div>
    </div>
  );
};

export default Schema;
