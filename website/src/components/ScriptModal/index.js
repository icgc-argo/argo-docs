import React from 'react';
import Modal from '@icgc-argo/uikit/Modal';
import Button from '@icgc-argo/uikit/Button';
import CodeBlock from '../CodeBlock';

const ScriptModal = ({ field, script, onCloseClick, ...props }) => (
  <Modal
    title={
      <span>
        Field Script Restriction for: <span style={{ fontWeight: 600 }}>{'aaa'}</span>
      </span>
    }
    onCancelClick={onCloseClick}
    onCloseClick={onCloseClick}
    actionVisible={false}
    {...props}
  >
    <div>The following script can be used with the ARGO Data Platform API.</div>
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button size="sm" variant="secondary">
        COPY
      </Button>
    </div>
    <CodeBlock>{script}</CodeBlock>
  </Modal>
);

export default ScriptModal;
