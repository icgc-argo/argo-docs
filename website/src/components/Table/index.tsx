import React from 'react';
import TableComp from '@icgc-argo/uikit/Table';
import { withTheme } from 'emotion-theming';
import styled from '@emotion/styled';

const StyleTableComp = styled(TableComp)`
  &.ReactTable {
    background: red;
    border: 2px solid green;
  }
  /* overrides hover highlight rows style */
  &.ReactTable.-highlight .rt-tbody .rt-tr:not(.-padRow):hover {
    background: pink;
  }
`;

const Table = withTheme((props) => <StyleTableComp highlight {...props} />);

export default Table;
