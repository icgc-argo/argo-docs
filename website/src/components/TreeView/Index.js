import React, { useState, createRef, useEffect } from 'react';
import { useTheme } from '@icgc-argo/uikit/ThemeProvider';
import ZoomPanContainer from './ZoomPanContainer';
import Tree from './DictionaryTree';
import data from './data';
import { Global, css } from '@emotion/core';
import Typography from '@icgc-argo/uikit/Typography';
import Button from '@icgc-argo/uikit/Button';

const createPubsub = () => {
  let listeners = [];
  const subscribe = listener => (listeners = listeners.concat(listener));
  const unsubscribe = listener =>
    (listeners = listeners.filter(l => {
      l !== listener;
    }));
  const dispatch = payload =>
    listeners.forEach(listener => {
      listener(payload);
    });
  return {
    subscribe,
    unsubscribe,
    listeners,
    dispatch,
  };
};

const CollapseAllMessengerContext = React.createContext();
export const useCollapseAllMessenger = () => React.useContext(CollapseAllMessengerContext);
const ExpandAllMessengerContext = React.createContext();
export const useExpandAllMessenger = () => React.useContext(ExpandAllMessengerContext);

const TreeView = ({ dictionary, searchValue }) => {
  const theme = useTheme();
  const containerRef = React.createRef();

  const collapseAllMessenger = createPubsub();
  const onCollapseAllClick = () => {
    collapseAllMessenger.dispatch();
  };
  const expandAllMessenger = createPubsub();
  const onExpandAllClick = () => {
    expandAllMessenger.dispatch();
  };
  const onNodeExpand = ({ fileName, expanded }) => {
    console.log(fileName, expanded);
  };

  return (
    <div
      id="yo"
      style={{ display: 'flex', cursor: 'grab', position: 'relative' }}
      ref={containerRef}
    >
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
        <div
          style={{
            height: 800,
            width: 2000,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <ExpandAllMessengerContext.Provider value={expandAllMessenger}>
            <CollapseAllMessengerContext.Provider value={collapseAllMessenger}>
              <Tree searchString={searchValue} rootFile={data} onNodeExpand={onNodeExpand} />
            </CollapseAllMessengerContext.Provider>
          </ExpandAllMessengerContext.Provider>
        </div>
      </ZoomPanContainer>
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
        <Button variant="secondary" onClick={onCollapseAllClick}>
          Collapse All
        </Button>
        <Button variant="secondary" onClick={onExpandAllClick}>
          Expand All
        </Button>
      </div>
    </div>
  );
};

export default TreeView;
