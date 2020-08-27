/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';
import { ChangeType } from '../../../types';

const padding = css`
  padding: 0 2px;
`;

export const deletedStyle = css`
  background: #f6c5cf;
  text-decoration: line-through;
  ${padding}
`;

export const updatedStyle = css`
  background: #15846c;
  ${padding}
`;

export const createdStyle = css`
  background: #d3f7f0;
  ${padding}
`;

// don't use fragment, bug in emotion 10 https://github.com/emotion-js/emotion/issues/1303
export const DiffText = ({ oldText, newText }: { oldText: string; newText: string }) => (
  <div>
    {oldText ? <div css={deletedStyle}>{oldText}</div> : null}
    {newText ? (
      <div
        css={css`
          margin-top: 4px;
          ${createdStyle}
        `}
      >
        {newText}
      </div>
    ) : null}
  </div>
);

export const DiffTextSegment = ({
  children,
  type,
}: {
  children: React.ReactChild;
  type: ChangeType;
}) => (
  <div
    css={
      type === ChangeType.CREATED ? createdStyle : type === ChangeType.DELETED ? deletedStyle : null
    }
  >
    {children}
  </div>
);
