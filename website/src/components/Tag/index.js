import React from 'react';
import TagComponent from '@icgc-argo/uikit/Tag';
import styles from './styles.module.css';

export const TAG_TYPES = Object.freeze({
  required: 'required',
  dependency: 'dependency',
  core: 'core',
  id: 'id',
  extended: 'extended',
});

const Tag = ({ type }) => {
  switch (type) {
    case TAG_TYPES.required:
      return <TagComponent className={`${styles.tag} ${styles.required}`}>Required</TagComponent>;
    case TAG_TYPES.dependency:
      return (
        <TagComponent className={`${styles.tag} ${styles.dependency}`}>Dependency</TagComponent>
      );
    case TAG_TYPES.core:
      return <TagComponent className={`${styles.tag} ${styles.core}`}>Core</TagComponent>;
    case TAG_TYPES.id:
      return <TagComponent className={`${styles.tag} ${styles.id}`}>ID</TagComponent>;
    case TAG_TYPES.extended:
      return <TagComponent className={`${styles.tag} ${styles.extended}`}>Extended</TagComponent>;
    default:
      return null;
  }
};

export default Tag;
