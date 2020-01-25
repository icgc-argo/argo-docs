import React, { useState, createRef, useEffect } from 'react';
import { useTheme } from '@icgc-argo/uikit/ThemeProvider';
import ZoomPanContainer from './ZoomPanContainer';

const TreeView = () => {
  const [shown, setShown] = React.useState(false);
  const onClick = () => {
    setShown(!shown);
  };
  return (
    <ZoomPanContainer>
      <div>
        <img
          src="https://d17fnq9dkz9hgj.cloudfront.net/uploads/2012/11/101438745-cat-conjunctivitis-causes.jpg"
          alt="Italian Trulli"
        />
        {shown && (
          <img
            src="https://d17fnq9dkz9hgj.cloudfront.net/uploads/2012/11/101438745-cat-conjunctivitis-causes.jpg"
            alt="Italian Trulli"
          />
        )}
        <button style={{ position: 'absolute' }} onClick={onClick}>
          YO!!!
        </button>
      </div>
    </ZoomPanContainer>
  );
};

export default TreeView;
