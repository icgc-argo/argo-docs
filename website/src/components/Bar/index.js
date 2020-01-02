import React from 'react';
import Select from '@icgc-argo/uikit/form/Select';
import Input from '@icgc-argo/uikit/form/Input';

import styles from './styles.module.css';
import Typography from '@icgc-argo/uikit/Typography';

const Bar = ({
  files = 14,
  fields = 64,
  attributes = ['All', 'Required'],
  onSearch = e => console.log(e.target.val),
}) => (
  <Typography variant="data" color="#151c3d">
    <div className={styles.bar}>
      {`${files} files > ${fields} fields`}
      <div className={styles.dataSelectors}>
        Data Tier: <Select options={attributes} size="sm" />
        Attribute: <Select options={attributes} size="sm" />
        <Input
          onChange={onSearch}
          placeholder="Search Dictionary..."
          preset="search"
          className={styles.search}
        />
      </div>
    </div>
  </Typography>
);

export default Bar;
