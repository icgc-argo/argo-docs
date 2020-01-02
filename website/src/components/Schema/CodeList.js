import React from 'react';
import Icon from '@icgc-argo/uikit/Icon';
import styles from './styles.module.css';

const CodeList = ({ codeList = [], onToggle, isExpanded }) => {
  const maxEnumLength = 5;
  const fullOutput = codeList.map(item => (
    <p className={styles.fieldEnumValue}>
      <strong>{item}</strong>
    </p>
  ));

  return (
    <div className={styles.codeList}>
      {fullOutput.length > maxEnumLength && !isExpanded ? (
        <div>
          {[...fullOutput.slice(0, maxEnumLength)]}
          <div
            className={styles.viewMore}
            onClick={() => {
              onToggle();
            }}
          >
            {fullOutput.length - maxEnumLength} more
            <Icon name="chevron_down" height="8" width="8" fill="#7f55cc" />
          </div>
        </div>
      ) : (
        fullOutput
      )}
    </div>
  );
};

export default CodeList;
