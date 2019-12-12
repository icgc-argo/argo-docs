import React, { useState } from 'react';
import Icon from '@icgc-argo/uikit/Icon';
import styles from './styles.module.css';

const CodeList = ({ codeList }) => {
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => {
    setExpanded(expanded => !expanded);
  };

  return (
    <div>
      <div onClick={() => toggleExpanded()}>Toggle</div>
      {expanded ? codeList.map(n => <div key={n}>{n}</div>) : <div>Not expanded</div>}
    </div>
  );
};

export default CodeList;
