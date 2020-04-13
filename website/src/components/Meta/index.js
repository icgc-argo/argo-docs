import React from 'react';
import Typography from '@icgc-argo/uikit/Typography';

const Meta = ({ files, fields }) => (
  <Typography variant="data" color="#151c3d">
    {`${files} files > ${fields} fields`}
  </Typography>
);

export default Meta;
