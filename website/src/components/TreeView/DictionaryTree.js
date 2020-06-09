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

import React from 'react';
import { css } from 'emotion';
import { Tree, TreeNode } from './Tree';
import { useTheme } from '@icgc-argo/uikit/ThemeProvider';
import { styled } from '@icgc-argo/uikit';
import Typography from '@icgc-argo/uikit/Typography';
import Tag from '@icgc-argo/uikit/Tag';
import { useExpandStateMessenger } from './';

const SearchStringContext = React.createContext('');

const ExpandButton = ({ expanded = false, onClick }) => {
  const theme = useTheme();
  return (
    <button
      onClick={onClick}
      className={css`
        width: 12px;
        height: 12px;
        padding: 0px;
        line-height: 0px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        background-color: ${theme.colors.white};
        cursor: pointer;
        border: none;
      `}
    >
      {expanded ? '-' : '+'}
    </button>
  );
};

const FileDisplayBox = ({ fileName, required = false, fields, onExpandStateChange }) => {
  const theme = useTheme();
  const searchString = React.useContext(SearchStringContext);
  const [expanded, setExpanded] = React.useState(false);

  const requiredFields = React.useMemo(
    () =>
      fields
        .filter(field => field.required)
        .map(f => ({
          ...f,
          isMatch: f.name.includes(searchString),
        })),
    // .filter(field => field.name.includes(searchString)),
    [searchString],
  );
  const optionalFields = React.useMemo(
    () =>
      fields
        .filter(field => !field.required)
        .map(f => ({
          ...f,
          isMatch: f.name.includes(searchString),
        })),
    [searchString],
  );

  const fieldHasMatch = field => field.isMatch;

  const hasMatch = React.useMemo(() => {
    return requiredFields.some(fieldHasMatch) || optionalFields.some(fieldHasMatch);
  }, [searchString]);

  const firstUpdate = React.useRef(true);
  React.useEffect(() => {
    if (!firstUpdate.current) {
      if (hasMatch) {
        setExpanded(true);
      } else {
        setExpanded(false);
      }
    }
    firstUpdate.current = false;
  }, [searchString]);

  const ListItem = styled('li')`
    list-style-position: inside;
    word-wrap: break-word;
    list-style-type: disc;
  `;
  const List = styled('ul')`
    padding-left: 10px;
  `;

  const onExpandClick = e => {
    setExpanded(!expanded);
    onExpandStateChange(!expanded);
  };

  const collapseAllMessenger = useExpandStateMessenger();
  React.useEffect(() => {
    const onDispatch = ({ expanded }) => {
      setExpanded(expanded);
    };
    collapseAllMessenger.subscribe(onDispatch);
    return () => collapseAllMessenger.unsubscribe(onDispatch);
  }, []);

  return (
    <div
      className={css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        opacity: ${!hasMatch ? 0.25 : 1};
        margin: 10px 0px;
      `}
    >
      <div
        className={css`
          border-radius: 10px;
          border: solid 2px ${required ? theme.colors.error : theme.colors.secondary};
          background: ${theme.colors.white};
          width: 225px;
          padding: 2px;
        `}
      >
        <div
          className={css`
            display: flex;
            justify-content: space-between;
            align-items: center;
          `}
        >
          <Typography
            variant="data"
            color="secondary"
            bold
            className={css`
              margin-left: 5px;
            `}
          >
            {fileName}
          </Typography>
          <Tag
            className={css`
              background: ${theme.colors.primary_1};
              display: flex;
              cursor: pointer;
            `}
            onClick={onExpandClick}
          >
            <div>
              {!!(searchString && searchString.length)
                ? `${requiredFields.filter(fieldHasMatch).length +
                    optionalFields.filter(fieldHasMatch).length} / ${fields.length}`
                : requiredFields.length + optionalFields.length}{' '}
              fields
            </div>
            <div
              className={css`
                margin-left: 5px;
              `}
            >
              <ExpandButton expanded={expanded} />
            </div>
          </Tag>
        </div>
        {expanded && (
          <div
            className={css`
              text-align: left;
            `}
          >
            {!!requiredFields.length && (
              <Typography color="error" bold>
                Required ({requiredFields.length} fields)
              </Typography>
            )}
            <List>
              {requiredFields.map(f => (
                <ListItem key={f.name}>
                  <Typography variant="data" color={f.isMatch ? 'black' : 'grey_2'}>
                    {f.name}
                  </Typography>
                </ListItem>
              ))}
            </List>
            {!!optionalFields.length && (
              <Typography color="secondary_dark" bold>
                Optional ({optionalFields.length} fields)
              </Typography>
            )}
            <List>
              {optionalFields.map(f => (
                <ListItem key={f.name}>
                  <Typography variant="data" color={f.isMatch ? 'black' : 'grey_2'}>
                    {f.name}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </div>
        )}
      </div>
    </div>
  );
};

const FileNode = ({ fileDef, onExpandStateChange }) => {
  const Node = ({ fileName, required, children, fields }) => {
    return (
      <TreeNode
        label={
          <FileDisplayBox
            fileName={fileName}
            required={required}
            fields={fields}
            onExpandStateChange={onExpandStateChange}
          />
        }
      >
        {children}
      </TreeNode>
    );
  };
  return (
    <Node fileName={fileDef.name} fields={fileDef.fields} required={fileDef.required}>
      {fileDef.children.map(f => (
        <FileNode fileDef={f} key={f.name} onExpandStateChange={onExpandStateChange} />
      ))}
    </Node>
  );
};

const DictionaryTree = React.forwardRef(({ searchString, rootFile, onNodeExpand }, ref) => {
  const theme = useTheme();
  const onNodeExpandChange = fileName => expanded => {
    onNodeExpand({ fileName, expanded });
  };
  /**
   * not sure why but FirstNode cannot be inlined without subscription problem
   */
  const FirstNode = () => (
    <FileDisplayBox
      fileName={rootFile.name}
      fields={rootFile.fields}
      onExpandStateChange={onNodeExpandChange(rootFile.name)}
      required
    />
  );
  return (
    <SearchStringContext.Provider value={searchString}>
      <Tree
        ref={ref}
        label={<FirstNode />}
        lineHeight="40px"
        lineWidth="4px"
        lineBorderRadius="25px"
        lineColor={theme.colors.grey_1}
        nodePadding="2px"
      >
        {rootFile.children.map(fileDef => (
          <FileNode
            fileDef={fileDef}
            key={fileDef.name}
            onExpandStateChange={onNodeExpandChange(fileDef.name)}
          />
        ))}
      </Tree>
    </SearchStringContext.Provider>
  );
});

export default DictionaryTree;
