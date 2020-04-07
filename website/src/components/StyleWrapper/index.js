import React from 'react';
import { styled } from '@icgc-argo/uikit';

const Wrapper = styled('div')`
  * {
    box-sizing: content-box;
  }
`;

function StyleWrapper(props) {
  return <Wrapper>{props.children}</Wrapper>;
}

export default StyleWrapper;
