import React from 'react';
import Select from '@icgc-argo/uikit/form/Select';
import Input from '@icgc-argo/uikit/form/Input';

import styles from './styles.module.css';

const Bar = ({
  files = 14,
  fields = 64,
  attributes = ['All', 'Required'],
  onSearch = e => console.log(e.target.val),
}) => {
  return (
    <div className={styles.bar}>
      <div>{`${files} files > ${fields} fields`}</div>
      <div>
        Attributes: <Select options={attributes} /> <Input onChange={onSearch} />
      </div>
    </div>
  );
};

export default Bar;
