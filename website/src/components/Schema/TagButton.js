import React from 'react';
import Tag from '@icgc-argo/uikit/Tag';
import styles from './styles.module.css';

export const TAG_TYPES = Object.freeze({
  required: 'required',
  dependency: 'dependency',
  core: 'core',
  id: 'id',
  extended: 'extended',
});

const TagButton = ({ type }) => {
  switch (type) {
    case TAG_TYPES.required:
      return <Tag className={`${styles.tag} ${styles.required}`}>Required</Tag>;
    case TAG_TYPES.dependency:
      return <Tag className={`${styles.tag} ${styles.dependency}`}>Dependency</Tag>;
    case TAG_TYPES.core:
      return <Tag className={`${styles.tag} ${styles.core}`}>Core</Tag>;
    case TAG_TYPES.id:
      return <Tag className={`${styles.tag} ${styles.id}`}>ID</Tag>;
    case TAG_TYPES.extended:
      return <Tag className={`${styles.tag} ${styles.extended}`}>Extended</Tag>;
    default:
      return null;
  }
};

export default TagButton;
