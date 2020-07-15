import React from 'react';
import { styled } from '@icgc-argo/uikit';

const StyledRow = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 15px;
  background: var(--argo-grey-4);
  border: solid 1px var(--argo-grey-2);
  margin-top: 8px;
  margin-bottom: 30px;
`;

export default ({ children }) => <StyledRow>{children}</StyledRow>;
