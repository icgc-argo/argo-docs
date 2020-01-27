import * as React from 'react';
import styled from '@emotion/styled';

const NodeContainer = styled('li')`
  flex: auto;
  text-align: center;
  list-style-type: none;
  position: relative;
  /* padding-top: var(--tree-line-height);
  padding-right: var(--tree-node-padding);
  padding-bottom: 0;
  padding-left: var(--tree-node-padding); */
  /* ::before,
  ::after {
    content: '';
    position: absolute;
    top: 0;
    right: 50%;
    width: 50%;
    border-top: var(--tree-line-width) solid var(--tree-line-color);
    height: var(--tree-line-height);
  }
  ::after {
    left: 50%;
    border-left: var(--tree-line-width) solid var(--tree-line-color);
  }
  :only-child {
    padding: 0;
    ::after,
    :before {
      display: none;
    }
  }
  :first-of-type {
    ::before {
      border: 0 none;
    }
    ::after {
      border-radius: var(--tree-line-border-radius) 0 0 0;
    }
  }
  :last-of-type {
    ::before {
      border-right: var(--tree-line-width) solid var(--tree-line-color);
      border-radius: 0 var(--tree-line-border-radius) 0 0;
    }
    ::after {
      border: 0 none;
    }
  } */

  display: flex;
  flex-direction: row;
  padding-top: var(--tree-node-padding);
  padding-right: var(--tree-line-height);
  padding-bottom: 0;
  padding-left: var(--tree-line-height);
  margin-top: 0px;
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
  ::after {
    top: 50%;
    border-top: var(--tree-line-width) solid var(--tree-line-color);
  }
  :only-child {
    padding: 0;
    ::after,
    :before {
      display: none;
    }
  }
  :first-of-type {
    ::before {
      border: 0 none;
    }
    ::after {
      border-radius: var(--tree-line-border-radius) 0 0 0;
    }
  }
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
`;

const ChildrenContainer = styled('ul')`
  display: flex;
  padding-inline-start: 0;
  padding-top: var(--tree-line-height);
  position: relative;
  /* ::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    width: 0;
    border-left: var(--tree-line-width) solid var(--tree-line-color);
    height: var(--tree-line-height);
  } */

  /* border: solid 2px green; */
  flex-direction: column;
  padding-left: var(--tree-line-height);
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

function TreeNode({ children, label, className }) {
  return (
    <NodeContainer className={`NodeContainer ${className}`}>
      {label}
      {React.Children.count(children) > 0 && (
        <ChildrenContainer className="ChildrenContainer">{children}</ChildrenContainer>
      )}
    </NodeContainer>
  );
}

export default TreeNode;
