import React, { useState, createRef, useEffect } from 'react';
import { useTheme } from '@icgc-argo/uikit/ThemeProvider';
import ZoomPanContainer from './ZoomPanContainer';
import Tree from './DictionaryTree';
import data from './data';
import { Global, css } from '@emotion/core';

const TreeView = ({ dictionary }) => {
  const [val, setVal] = React.useState('');
  const [offset, setOffset] = React.useState(0);
  const containerRef = React.createRef();
  React.useEffect(() => {
    setOffset(containerRef.current.clientWidth / 2);
  }, []);
  console.log('dictionary: ', dictionary);
  console.log('data: ', data);

  return (
    <div id="yo" style={{ display: 'flex', cursor: 'grab' }} ref={containerRef}>
      <Global
        styles={css`
          .dict_src-pages-dictionary- {
            /* experimental css properties */
            width: -webkit-fill-available;
            width: -moz-available;
            width: fill-available;
          }
        `}
      />
      <ZoomPanContainer>
        <div style={{ height: '800px', marginLeft: `calc(-50% + ${offset}px)` }}>
          <Tree searchString={val} rootFile={data} />
        </div>
      </ZoomPanContainer>
    </div>
  );
};

export default TreeView;
