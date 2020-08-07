/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';

const deletedStyle = css`
  background: #f6c5cf;
  text-decoration: line-through;
`;
const updatedStyle = css`
  background: #15846c;
`;
const createdStyle = css`
  background: #d3f7f0;
`;

// don't use fragment, bug in emotion 10 https://github.com/emotion-js/emotion/issues/1303
export const DiffText = ({ oldText, newText }: { oldText: string; newText: string }) => (
  <div>
    <div css={deletedStyle}>{oldText}</div>
    <div css={createdStyle}>{newText}</div>
  </div>
);

export const DiffTextSegment = ({ children, type }: { children: string; type: TextChange }) => (
  <div
    css={
      type === TextChange.CREATED ? createdStyle : type === TextChange.DELETED ? deletedStyle : null
    }
  >
    {children}
  </div>
);

export enum TextChange {
  CREATED = 'created',
  DELETED = 'deleted',
}
