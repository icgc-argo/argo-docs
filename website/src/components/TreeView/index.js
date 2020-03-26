import React, { useState, createRef, useEffect } from 'react';
import { useTheme } from '@icgc-argo/uikit/ThemeProvider';
import ZoomPanContainer from './ZoomPanContainer';
import Tree from './DictionaryTree';
import { Global, css } from '@emotion/core';
import Typography from '@icgc-argo/uikit/Typography';
import Button from '@icgc-argo/uikit/Button';

const createPubsub = () => {
  let listeners = [];
  const subscribe = callback => (listeners = listeners.concat(callback));
  const unsubscribe = callback =>
    (listeners = listeners.filter(l => {
      l !== callback;
    }));
  const publish = payload => {
    listeners.forEach(callback => {
      callback(payload);
    });
  };
  return {
    subscribe,
    unsubscribe,
    listeners,
    publish,
  };
};

const ExpandStateMessenger = React.createContext();
export const useExpandStateMessenger = () => React.useContext(ExpandStateMessenger);

const TreeView = ({ data, searchValue }) => {
  const theme = useTheme();
  const containerRef = React.createRef();

  const collapseAllMessenger = createPubsub();
  const onCollapseAllClick = resetTransform => {
    resetTransform();
    collapseAllMessenger.publish({ expanded: false });
  };
  const onExpandAllClick = () => {
    collapseAllMessenger.publish({ expanded: true });
  };
  const onNodeExpand = ({ fileName, expanded }) => {
    console.log(fileName, expanded);
  };

  return (
    <div style={{ display: 'flex', cursor: 'grab', position: 'relative' }} ref={containerRef}>
      <Global
        styles={css`
          .dict_src-pages-dictionary- {
            /* experimental css properties */
            width: -webkit-fill-available;
            width: -moz-available;
            width: stretch;
            height: -webkit-fill-available;
            height: -moz-available;
            height: stretch;
          }
        `}
      />
      <ZoomPanContainer
        menu={({ resetTransform }) => (
          <div
            style={{
              border: `solid 1px ${theme.colors.grey_2}`,
              position: 'absolute',
              cursor: 'default',
              background: theme.colors.white,
              padding: 8,
              right: 8,
              top: 8,
            }}
          >
            <Typography color="primary">Filter by Data Tier</Typography>
            <Button variant="secondary" onClick={() => onCollapseAllClick(resetTransform)}>
              Collapse All
            </Button>
            <Button variant="secondary" onClick={onExpandAllClick}>
              Expand All
            </Button>
          </div>
        )}
      >
        <div
          style={{
            height: 800,
            width: 2000,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <ExpandStateMessenger.Provider value={collapseAllMessenger}>
            <Tree searchString={searchValue} rootFile={data} onNodeExpand={onNodeExpand} />
          </ExpandStateMessenger.Provider>
        </div>
      </ZoomPanContainer>
    </div>
  );
};

export default TreeView;
