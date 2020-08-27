import React from 'react';
import TableComp from '@icgc-argo/uikit/Table';
import { withTheme } from 'emotion-theming';
import { Global, css } from '@emotion/core';
import styled from '@emotion/styled';

/**
 * react-table wraps a custom header in a div
 * no way to style this div cleanly
 * so add a css class style that is applied through the prop headerClassName
 * cell can then be styled freely from a comp passed into Header in columns
 */
const StyledTable = styled(TableComp)`
  &.ReactTable .rt-thead.-header .rt-th.reset > div {
    width: 100%;
    height: 100%;
  }
`;

const Table = withTheme((props) => <StyledTable {...props} />);

export default Table;
