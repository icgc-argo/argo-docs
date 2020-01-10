import React from 'react';
import Typography from '@icgc-argo/uikit/Typography';
import startCase from 'lodash/startCase';

const FileMenu = ({ files }) => (
  <div>
    <Typography variant="sectionHeader">Clinical Files</Typography>
    {files.map(file => (
      <div
        onClick={() => {
          window.scrollTo(0, file.ref.current.offsetTop - 62);
        }}
      >
        {startCase(file.name)}
      </div>
    ))}
  </div>
);

export default FileMenu;
