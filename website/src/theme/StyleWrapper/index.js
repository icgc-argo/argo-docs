import React from 'react';
import styles from './styles.module.css';

function StyleWrapper(props) {
  return <div style={styles}>{props.children}</div>;
}

export default StyleWrapper;
