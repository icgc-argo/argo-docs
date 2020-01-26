import React, { useState, createRef, useEffect } from 'react';
import { useTheme } from '@icgc-argo/uikit/ThemeProvider';
import ZoomPanContainer from './ZoomPanContainer';
import Tree from './DictionaryTree';
import data from './data';
import { Global, css } from '@emotion/core';

const TreeView = ({ dictionary }) => {
  const [val, setVal] = React.useState('');
  console.log('dictionary: ', dictionary);
  console.log('data: ', data);

  return (
    <div id="yo" style={{ display: 'flex' }}>
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
        <div style={{ height: '500px' }}>
          <Tree searchString={val} rootFile={data} />
        </div>
      </ZoomPanContainer>
    </div>
  );
};

export default TreeView;
