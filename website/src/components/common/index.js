import React from 'react';
import Icon from '@icgc-argo/uikit/Icon';
import Tooltip from '@icgc-argo/uikit/Tooltip';

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

export const DownloadTooltip = ({ children, disabled }) => (
  <Tooltip
    disabled={disabled}
    html={<span>Please select latest schema version to download templates</span>}
  >
    {children}
  </Tooltip>
);

export const Display = ({ children, visible }) => (
  <div style={{ display: visible ? 'block' : 'none' }}>{children}</div>
);
