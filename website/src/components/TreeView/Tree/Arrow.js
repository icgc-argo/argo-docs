import React from 'react';
import styled from '@emotion/styled';
const size = '8px';

const ArrowBox = styled('div')`
  position: relative;
  width: 0;
  height: 0;

  border-bottom: ${size} solid transparent;
  border-left: ${size} solid var(--tree-line-color);
  border-top: ${size} solid transparent;
`;

export default ArrowBox;
