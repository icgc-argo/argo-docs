import React from 'react';
import Typography from '@icgc-argo/uikit/Typography';

export const DataTypography = ({ children, ...rest }) => (
  <Typography variant="data" component="div" color="#000" {...rest}>
    {children}
  </Typography>
);
export const SchemaTitle = ({ children, ...rest }) => (
  <Typography variant="subtitle" color="#151c3d" {...rest}>
    {children}
  </Typography>
);
