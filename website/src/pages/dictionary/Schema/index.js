import React, { useState } from 'react';
import Table from '@icgc-argo/uikit/Table';
import TagButton, { TAG_TYPES } from './TagButton';
import styles from './styles.module.css';
import Tag from '@icgc-argo/uikit/Tag';
import CodeList from './CodeList';

const formatFieldType = value => {
  switch (value) {
    case 'string':
      return 'TEXT';
    default:
      return value.toUpperCase();
  }
};

const RegexRestriction = ({ regex }) => (
  <div className={styles.regexRestriction}>
    <div>Values must meet the regular expression</div>
    <div className={styles.regex}>{regex}</div>
    <br />
    <div>Examples:</div>
    <div>
      {[{ name: 'PACA-AU', link: '' }].map(({ name, link }, i) => (
        <a href={link}>{name}</a>
      ))}
    </div>
  </div>
);

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
  const fields = schema.fields.map(field => {
    /**
     * need to pass in state for Cell rendering
     * react-table rerenders everything, change shape of codelist to pass in state
     */
    const { restrictions: { codeList = null } = {} } = field;

    if (codeList) {
      const [isExpanded, setExpanded] = useState(false);
      const newCodeList = {};
      newCodeList.values = Array.isArray(codeList) ? codeList : codeList.values;
      newCodeList.isExpanded = isExpanded;
      newCodeList.setExpanded = setExpanded;
      return { ...field, restrictions: { codeList: newCodeList } };
    }
    return field;
  });

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
      Cell: ({ original: { restrictions = {} } }) => {
        const { regex = null, codeList = null } = restrictions;
        if (regex) {
          return <RegexRestriction regex={regex} />;
        } else if (codeList) {
          return <CodeList codeList={codeList} />;
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
      <FieldsTag fieldCount={fields.length} />
      <div className={styles.fieldExample}>
        Field Name Example: <span>{`${prefix}`}</span>[-optional-extension]<span>{`.${ext}`}</span>
      </div>
      <div ref={containerRef}>
        <Table
          parentRef={containerRef}
          columns={cols}
          data={fields}
          showPagination={false}
          sortable={true}
        />
      </div>
    </div>
  );
};

export default Schema;
