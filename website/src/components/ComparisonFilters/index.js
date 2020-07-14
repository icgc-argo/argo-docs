import React from 'react';
import Icon from '@icgc-argo/uikit/Icon';
import styles from './styles.module.css';

export const compareFilterTypes = Object.freeze({
  ADDITIONS: 'additionIsActive',
  UPDATES: 'updateIsActive',
  DELETIONS: 'deletionIsActive',
});

const ComparisonFilters = ({ additions = 4, updates = 88, deletions = 33, filters, onChange }) => {
  const { additionIsActive, updateIsActive, deletionIsActive } = filters;
  return (
    <div className={styles.comparisonFilters}>
      Comparison:
      <button
        className={`${styles.btn} ${styles.additions} ${
          !additionIsActive ? styles.inactive : null
        }`}
        onClick={() => onChange(compareFilterTypes.ADDITIONS)}
      >
        <div className={styles.row}>
          <Icon name="star" fill={'#00c79d'} width={'16px'} />
          {`${additions} new fields`}
        </div>
      </button>
      <button
        size="sm"
        className={`${styles.btn} ${styles.updates} ${!updateIsActive ? styles.inactive : null}`}
        onClick={() => onChange(compareFilterTypes.UPDATES)}
      >
        <div className={styles.row}>
          <Icon name="star" fill="#ec8f17" width={'16px'} />
          {`${updates} updated fields`}
        </div>
      </button>
      <button
        size="sm"
        className={`${styles.btn} ${styles.deletions} ${
          !deletionIsActive ? styles.inactive : null
        }`}
        onClick={() => onChange(compareFilterTypes.DELETIONS)}
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
