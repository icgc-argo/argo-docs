import React from 'react';
import Button from '@icgc-argo/uikit/Button';
import Icon from '@icgc-argo/uikit/Icon';

import styles from './styles.module.css';

const ComparisonFilters = ({ additions = 4, updates = 88, deletions = 33 }) => {
  // enabled or what here
  return (
    <div className={styles.comparisonFilters}>
      Comparison:
      <Button size="sm" className={`${styles.btn} ${styles.additions}`}>
        <div className={styles.row}>
          <Icon name="star" fill="#00c79d" width={'16px'} />
          {`${additions} new fields`}
        </div>
      </Button>
      <Button size="sm" className={`${styles.btn} ${styles.updates}`}>
        <div className={styles.row}>
          <Icon name="star" fill="#ec8f17" width={'16px'} />
          {`${additions} updated fields`}
        </div>
      </Button>
      <Button size="sm" className={`${styles.btn} ${styles.deletions}`}>
        <div className={styles.row}>
          <Icon name="star" fill="#df1b42" width={'16px'} />
          {`${additions} deleted fields`}
        </div>
      </Button>
    </div>
  );
};

export default ComparisonFilters;
