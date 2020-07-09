import React from 'react';
import Icon from '@icgc-argo/uikit/Icon';
import Button from '@icgc-argo/uikit/Button';

export const ResetIcon = ({ disabled }) => (
  <Icon
    name="download"
    fill={disabled ? 'white' : 'accent2_dark'}
    height="12px"
    style={{
      marginRight: '5px',
    }}
  />
);

export const ResetButton = ({ children, onClick, disabled }) => (
  <Button variant="secondary" size="sm" onClick={onClick} disabled={disabled}>
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <ResetIcon disabled={disabled} />
      {children}
    </div>
  </Button>
);
