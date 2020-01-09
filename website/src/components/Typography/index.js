import React from 'react';
import Typography from '@icgc-argo/uikit/Typography';

export const DataTypography = ({ children }) => (
  <Typography variant="data" component="div" color="#000">
    {children}
  </Typography>
);
export const SchemaTitle = ({ children }) => (
  <Typography variant="subtitle" color="#151c3d">
    {children}
  </Typography>
);
