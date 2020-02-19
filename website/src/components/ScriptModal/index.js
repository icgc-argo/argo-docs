import React from 'react';
import Modal from '@icgc-argo/uikit/Modal';
import CodeBlock from '../CodeBlock';
import Typography from '@icgc-argo/uikit/Typography';

const ScriptModal = ({ field, script, onCloseClick }) => (
  <Modal
    title={
      <Typography variant="subtitle">
        Field Script Restriction for: <span style={{ fontWeight: 600 }}>{field}</span>
      </Typography>
    }
    onCancelClick={onCloseClick}
    onCloseClick={onCloseClick}
    actionVisible={false}
    buttonSize="sm"
  >
    <CodeBlock code={script} />
  </Modal>
);

export default ScriptModal;
