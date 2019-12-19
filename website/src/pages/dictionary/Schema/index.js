import React, { useState, useMemo, useEffect } from 'react';
import Table from '@icgc-argo/uikit/Table';
import TagButton, { TAG_TYPES } from './TagButton';
import styles from './styles.module.css';
import Tag from '@icgc-argo/uikit/Tag';
import CodeList from './CodeList';
import Regex from './Regex';

const formatFieldType = value => {
  switch (value) {
    case 'string':
      return 'TEXT';
    default:
      return value.toUpperCase();
  }
};

const FieldDescription = ({ name, description }) => (
  <div className={styles.fieldDescription}>
    <div className={styles.name}>{name}</div>
    <div>{description}</div>
  </div>
);

const FieldsTag = ({ fieldCount }) => (
  <Tag className={styles.fieldsTag}>{`${fieldCount} Field${fieldCount > 1 ? 's' : ''}`}</Tag>
);

const Schema = ({ schema, key }) => {
  /**
   * need to pass in state for Cell rendering
   * react-table rerenders everything, change shape of codelist to pass in state
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
    setExpandedCodeLists({ ...expandedCodeLists, [field]: true });

  const isCodeListExpanded = field => expandedCodeLists[field];

  const cols = [
    {
      Header: 'Field & Description',
      id: 'fieldDescription',
      accessor: ({ name, description }) => (
        <FieldDescription name={name} description={description} />
      ),
    },
    { Header: 'Data Tier' },
    {
      Header: 'Attributes',
      id: 'attributes',
      accessor: ({ restrictions }) =>
        restrictions && restrictions.required && <TagButton type={TAG_TYPES.required} />,
    },
    { Header: 'Type', id: 'valueType', accessor: ({ valueType }) => formatFieldType(valueType) },
    {
      Header: 'Permissible Values',
      id: 'permissibleValues',
      accessor: 'restrictions',
      Cell: ({ original }) => {
        const { name: field, restrictions = {} } = original;
        const { regex = null, codeList = null } = restrictions;
        if (regex) {
          return <Regex regex={regex} />;
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
    { Header: 'Notes & Scripts' },
  ];
  const containerRef = React.createRef();
  const prefix = 'prefix_prefix';
  const ext = 'tsv';

  return (
    <div className={styles.schema}>
      <h2 className={styles.schemaTitle}>{schema.name}</h2>
      <FieldsTag fieldCount={schema.fields.length} />
      <div className={styles.fieldExample}>
        Field Name Example: <span>{`${prefix}`}</span>[-optional-extension]<span>{`.${ext}`}</span>
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
