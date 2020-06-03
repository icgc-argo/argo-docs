/*
 * Copyright (c) 2020 The Ontario Institute for Cancer Research. All rights reserved
 *
 * This program and the accompanying materials are made available under the terms of the GNU Affero General Public License v3.0.
 * You should have received a copy of the GNU Affero General Public License along with
 * this program. If not, see <http://www.gnu.org/licenses/>.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY                           
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES                          
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT                           
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,                                
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED                          
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;                               
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER                              
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN                         
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *  
 *
 */

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
        <div>
          <ExpandStateMessenger.Provider value={collapseAllMessenger}>
            <Tree searchString={searchValue} rootFile={data} onNodeExpand={onNodeExpand} />
          </ExpandStateMessenger.Provider>
        </div>
      </ZoomPanContainer>
    </div>
  );
};

export default TreeView;
