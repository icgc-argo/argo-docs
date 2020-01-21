import React from 'react';
import Modal from '@icgc-argo/uikit/Modal';
import Button from '@icgc-argo/uikit/Button';

const ScriptModal = ({ field, script, onCloseClick, ...props }) => (
  <Modal
    title={
      <span>
        Field Script Restriction for:<span style={{ fontWeight: 600 }}>{'aaa'}</span>
      </span>
    }
    onCancelClick={onCloseClick}
    onCloseClick={onCloseClick}
    {...props}
  >
    <div>
      <div>The following script can be used with the ARGO Data Platform API.</div>
      <Button size="sm">COPY</Button>
      <div>CODEBLOCK</div>
    </div>
  </Modal>
);

export default ScriptModal;
