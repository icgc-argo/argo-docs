import React from 'react';
import Icon from '@icgc-argo/uikit/Icon';
import styles from './styles.module.css';

export const compareFilterTypes = Object.freeze({
  ADDITION: 'ADDITION',
  UPDATE: 'UPDATE',
  DELETION: 'DELETION',
});

const ComparisonFilters = ({ additions = 4, updates = 88, deletions = 33, filters, onChange }) => {
  const { ADDITION, UPDATE, DELETION } = filters;
  return (
    <div className={styles.comparisonFilters}>
      Comparison:
      <button
        className={`${styles.btn} ${styles.additions} ${!ADDITION ? styles.inactive : null}`}
        onClick={() => onChange(compareFilterTypes.ADDITION)}
      >
        <div className={styles.row}>
          <Icon name="star" fill={'#00c79d'} width={'16px'} />
          {`${additions} new fields`}
        </div>
      </button>
      <button
        size="sm"
        className={`${styles.btn} ${styles.updates} ${!UPDATE ? styles.inactive : null}`}
        onClick={() => onChange(compareFilterTypes.UPDATE)}
      >
        <div className={styles.row}>
          <Icon name="star" fill="#ec8f17" width={'16px'} />
          {`${updates} updated fields`}
        </div>
      </button>
      <button
        size="sm"
        className={`${styles.btn} ${styles.deletions} ${!DELETION ? styles.inactive : null}`}
        onClick={() => onChange(compareFilterTypes.DELETION)}
      >
        <div className={styles.row}>
          <Icon name="star" fill="#df1b42" width={'16px'} />
          {`${deletions} deleted fields`}
        </div>
      </button>
    </div>
  );
};

export default ComparisonFilters;
