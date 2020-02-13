import React from 'react';
import Icon from '@icgc-argo/uikit/Icon';

export const DownloadIcon = ({ disabled }) => (
  <Icon
    name="download"
    fill={disabled ? 'white' : 'accent2_dark'}
    height="12px"
    style={{
      marginRight: '5px',
    }}
  />
);

export const DownloadButtonContent = ({ children, disabled }) => (
  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
    <DownloadIcon disabled={disabled} />
    {children}
  </div>
);
