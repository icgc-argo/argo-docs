import React from 'react';
import Select from '@icgc-argo/uikit/form/Select';
import Input from '@icgc-argo/uikit/form/Input';
import styles from './styles.module.css';
import Typography from '@icgc-argo/uikit/Typography';

const search = {
  tier: '',
  attribute: '',
  text: '',
};

const FileFilters = ({
  files = 0,
  fields = 0,
  dataTiers = [],
  dataAttributes = [],
  searchParams = {},
  onSearch = e => console.log(e.target.val),
}) => {
  const [searchValue, setSearchValue] = React.useState('');

  return (
    <Typography variant="data" color="#151c3d">
      <div className={styles.fileFilters}>
        {`${files} files > ${fields} fields`}

        <div className={styles.dataSelectors}>
          Data Tier:{' '}
          <Select
            options={dataTiers}
            value={searchParams.tier}
            onChange={val => onSearch({ tier: val })}
            size="sm"
          />
          Attribute: <Select options={dataAttributes} size="sm" />
          {/*<Input
            onChange={e => {
              const val = e.target.value;
              setSearchValue(val);
              onSearch(e);
            }}
            value={searchValue}
            placeholder="Search Dictionary..."
            preset="search"
            className={styles.search}
          />*/}
        </div>
      </div>
    </Typography>
  );
};

export default FileFilters;
