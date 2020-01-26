import React from 'react';
import { css } from 'emotion';
import { Tree, TreeNode } from './Tree';
import { useTheme } from '@icgc-argo/uikit/ThemeProvider';
import { styled } from '@icgc-argo/uikit';
import Typography from '@icgc-argo/uikit/Typography';
import Tag from '@icgc-argo/uikit/Tag';
import Button from '@icgc-argo/uikit/Button';

const SearchStringContext = React.createContext('');

const NodeLabel = ({ fileName, required = false, fields }) => {
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
  `;
  const List = styled('ul')`
    padding-left: 10px;
  `;

  return (
    <div
      className={css`
        display: flex;
        justify-content: center;
        opacity: ${!hasMatch ? 0.25 : 1};
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
          `}
        >
          <Typography
            variant="data"
            className={css`
              margin-left: 5px;
            `}
          >
            {fileName}
          </Typography>
          <Tag
            className={css`
              background: ${theme.colors.primary_1};
            `}
          >
            {!!(searchString && searchString.length)
              ? `${requiredFields.filter(fieldHasMatch).length +
                  optionalFields.filter(fieldHasMatch).length} / ${fields.length}`
              : requiredFields.length + optionalFields.length}{' '}
            fields
          </Tag>
        </div>
        <Button variant="text" size="sm" onClick={e => setExpanded(!expanded)}>
          {!expanded ? 'expand' : 'collapse'}
        </Button>
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

const Node = ({ fileName, required, children, fields }) => {
  return (
    <TreeNode
      className={css`
        &::before,
        &::after {
          top: -4px !important;
        }
      `}
      label={<NodeLabel fileName={fileName} required={required} fields={fields} />}
    >
      {children}
    </TreeNode>
  );
};

const FileNode = ({ fileDef }) => (
  <Node fileName={fileDef.name} fields={fileDef.fields} required={fileDef.required}>
    {fileDef.children.map(f => (
      <FileNode fileDef={f} key={f.name} />
    ))}
  </Node>
);

const ExampleTree = ({ searchString, rootFile }) => {
  const theme = useTheme();

  return (
    <Tree
      label={null}
      lineHeight="40px"
      lineWidth="4px"
      lineBorderRadius="25px"
      lineColor={theme.colors.grey_1}
      nodePadding="2px"
    >
      <SearchStringContext.Provider value={searchString}>
        <FileNode fileDef={rootFile} />
      </SearchStringContext.Provider>
    </Tree>
  );
};

export default ExampleTree;
