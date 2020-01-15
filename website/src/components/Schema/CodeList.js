import React from 'react';
import Icon from '@icgc-argo/uikit/Icon';
import styles from './styles.module.css';

const ToggleMore = ({ children, onToggle }) => (
  <div
    className={styles.toggleMore}
    onClick={() => {
      onToggle();
    }}
  >
    {children}
  </div>
);

const CodeList = ({ codeList = [], onToggle, isExpanded }) => {
  const maxEnumLength = 5;
  const fullOutput = codeList.map(item => (
    <p className={styles.fieldEnumValue}>
      <strong>{item}</strong>
    </p>
  ));

  return (
    <div className={styles.codeList}>
      {fullOutput.length < maxEnumLength ? (
        <div>{fullOutput}</div>
      ) : !isExpanded ? (
        <div>
          {[...fullOutput.slice(0, maxEnumLength)]}
          <ToggleMore onToggle={onToggle}>
            {fullOutput.length - maxEnumLength} more
            <Icon name="chevron_down" height="8" width="8" fill="#7f55cc" />
          </ToggleMore>
        </div>
      ) : (
        <div>
          {fullOutput}
          <ToggleMore onToggle={onToggle}>
            Show less
            <Icon name="chevron_down" height="8" width="8" fill="#7f55cc" />
          </ToggleMore>
        </div>
      )}
    </div>
  );
};

export default CodeList;
