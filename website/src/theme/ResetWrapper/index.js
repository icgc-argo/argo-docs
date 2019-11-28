import React from 'react';
import styles from './styles.module.css';

function ResetWrapper(props) {
  return <div style={styles}>{props.children}</div>;
}

export default ResetWrapper;
