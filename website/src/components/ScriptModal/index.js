import React from 'react';
import Modal from '@icgc-argo/uikit/Modal';
import CodeBlock from '../CodeBlock';
import Typography from '@icgc-argo/uikit/Typography';

const ScriptModal = ({ field, script, onCloseClick, ...props }) => (
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
    {...props}
  >
    <Typography variant="paragraph">
      The following script can be used with the ARGO Data Platform API.
    </Typography>

    <CodeBlock code={script} />
  </Modal>
);

export default ScriptModal;
