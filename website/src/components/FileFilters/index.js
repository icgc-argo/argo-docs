import React from 'react';
import Select from '@icgc-argo/uikit/form/Select';
import Input from '@icgc-argo/uikit/form/Input';
import styles from './styles.module.css';
import Typography from '@icgc-argo/uikit/Typography';
import debounce from 'lodash/debounce';

const FileFilters = ({
  files = 0,
  fields = 0,
  dataTiers = [],
  dataAttributes = [],
  onSearch = e => console.log(e.target.val),
  searchValue,
}) => {
  const [inputValue, setInputValue] = React.useState('');
  const applySearch = debounce(onSearch, 500);
  return (
    <Typography variant="data" color="#151c3d">
      <div className={styles.fileFilters}>
        {`${files} files > ${fields} fields`}
        <div className={styles.dataSelectors}>
          Data Tier: <Select options={dataTiers} size="sm" />
          Attribute: <Select options={dataAttributes} size="sm" />
          <Input
            onChange={e => {
              setInputValue(e.target.value);
              applySearch(e.target.value);
            }}
            value={inputValue}
            placeholder="Search Dictionary..."
            preset="search"
            className={styles.search}
          />
        </div>
      </div>
    </Typography>
  );
};

export default FileFilters;
