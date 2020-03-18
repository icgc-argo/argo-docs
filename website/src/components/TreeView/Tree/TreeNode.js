import * as React from 'react';
import styled from '@emotion/styled';

const NodeContainer = styled('li')`
  flex: auto;
  text-align: center;
  list-style-type: none;
  position: relative;

  display: flex;
  flex-direction: row;
  padding-top: var(--tree-node-padding);
  padding-right: var(--tree-line-height);
  padding-bottom: 0;
  padding-left: calc(var(--tree-line-height) + var(--arrow-width));
  margin-top: 0px;

  /* before arrow */
  ::before,
  ::after {
    content: '';
    position: absolute;
    left: 0;
    width: 50%;
    border-left: var(--tree-line-width) solid var(--tree-line-color);
    width: var(--tree-line-height);
    height: 50%;
  }
  /* */
  ::after {
    top: 50%;
    border-top: var(--tree-line-width) solid var(--tree-line-color);
  }
  /* single child node - no line */
  :only-child {
    padding: 0;
    padding-left: var(--arrow-width);
    ::after,
    :before {
      display: none;
    }
  }
  /* top curve */
  :first-of-type {
    ::before {
      border: 0 none;
    }
    ::after {
      border-radius: var(--tree-line-border-radius) 0 0 0;
    }
  }
  /* bottom curve */
  :last-of-type {
    ::before {
      border-bottom: var(--tree-line-width) solid var(--tree-line-color);
      border-radius: 0 0 0 var(--tree-line-border-radius);
      bottom: 50%;
    }
    ::after {
      border: 0 none;
    }
  }

  /* arrow */
  /* first node*/
  .arrow {
    display: none;
  }
  .ChildrenContainer .arrow {
    content: '';
    display: block;
    width: 20px;
    border: 1px solid red;
    position: absolute;
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    top: 50%;
    border-style: solid;
    border-width: 7px 0 7px 9px;
    border-color: transparent transparent transparent var(--tree-line-color);
    transform: translate(-9px, -50%);
    z-index: 2;
  }
`;

const ChildrenContainer = styled('ul')`
  display: flex;
  padding-inline-start: 0;
  padding-top: var(--tree-line-height);
  position: relative;

  flex-direction: column;
  padding-left: calc(var(--tree-line-height));
  padding-top: 0px;
  margin: 0px;
  ::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    width: 0;
    border-top: var(--tree-line-width) solid var(--tree-line-color);
    width: var(--tree-line-height);
  }
`;

function TreeNode({ children, label, className = '' }) {
  return (
    <NodeContainer className={`NodeContainer ${className}`}>
      <div className="arrow" />
      {label}
      {React.Children.count(children) > 0 && (
        <ChildrenContainer className="ChildrenContainer">{children}</ChildrenContainer>
      )}
    </NodeContainer>
  );
}

export default TreeNode;
