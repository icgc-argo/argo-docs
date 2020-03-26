import * as React from 'react';
import styled from '@emotion/styled';
import TreeNode from './TreeNode';

const RootContainer = styled('ul')`
  padding-inline-start: 0;
  margin: 0;
`;

const StyledRootContainer = styled(RootContainer)`
  --line-height: ${({ lineHeight }) => lineHeight};
  --line-width: ${({ lineWidth }) => lineWidth};
  --line-color: ${({ lineColor }) => lineColor};
  --line-border-radius: ${({ lineBorderRadius }) => lineBorderRadius};
  --node-padding: ${({ nodePadding }) => nodePadding};
  --tree-line-height: var(--line-height, 20px);
  --tree-line-width: var(--line-width, 1px);
  --tree-line-color: var(--line-color, black);
  --tree-line-border-radius: var(--line-border-radius, 5px);
  --tree-node-padding: var(--node-padding, 5px);
  --arrow-width: 9px;
`;

const Tree = React.forwardRef(({ children, label, ...props }, ref) => {
  return (
    <StyledRootContainer {...props} ref={ref}>
      <TreeNode label={label}>{children}</TreeNode>
    </StyledRootContainer>
  );
});

export default React.memo(Tree);
