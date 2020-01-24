import React, { useState, createRef, useEffect } from 'react';
import { useTheme } from '@icgc-argo/uikit/ThemeProvider';
import ZoomPanContainer from './ZoomPanContainer';

const TreeView = () => {
  return (
    <ZoomPanContainer>
      <img
        src="https://d17fnq9dkz9hgj.cloudfront.net/uploads/2012/11/101438745-cat-conjunctivitis-causes.jpg"
        alt="Italian Trulli"
      />
    </ZoomPanContainer>
  );
};

export default TreeView;
