import React, { useState } from 'react';
import Icon from '@icgc-argo/uikit/Icon';
import styles from './styles.module.css';
import RegexColorize from 'regex-colorize';

const CodeList = ({ codeList }) => {
  var rgx = new RegexColorize();
  rgx.colorizeAll();

  const { isExpanded, setExpanded, values } = codeList;
  const toggleExpanded = () => {
    setExpanded(!isExpanded);
  };

  const maxEnumLength = 5;
  const fullOutput = values.map(item => (
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
              toggleExpanded();
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
