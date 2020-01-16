import React from 'react';
import Icon from '@icgc-argo/uikit/Icon';
import Button from '@icgc-argo/uikit/Button';

export const DownloadIcon = props => (
  <Icon
    name="download"
    fill="accent2_dark"
    height="12px"
    style={{
      marginRight: '5px',
    }}
  />
);

export const DownloadButton = ({ children, onClick }) => (
  <Button variant="secondary" size="sm" onClick={e => onClick(e.target.value)}>
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <DownloadIcon />
      {children}
    </div>
  </Button>
);
