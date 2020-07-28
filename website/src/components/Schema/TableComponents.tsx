/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';

/* const diffPartial = ({ diff }) => css`
${diff.type === 'updated' ?  'orange' : diff.type ===}`; */

//const colorDiff = (diffType: string) => css`${}`;
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
const CompareText = ({ oldText, newText }) => (
  <div>
    <div css={deletedStyle}>{oldText}</div>
    <div css={createdStyle}>{newText}</div>
  </div>
);

const FieldDescription = ({
  name,
  description,
  diff,
}: {
  name: string;
  description: string;
  diff: { left: string; right: string };
}) => (
  <div
    css={css`
      font-size: 12px;
    `}
  >
    <div
      css={css`
        font-weight: bold;
        margin-bottom: 5px;
      `}
    >
      {name}
    </div>
    {/* Change this to a css toggle */}
    {diff ? <CompareText oldText={diff.left} newText={diff.right} /> : <div>{description}</div>}
  </div>
);

export { FieldDescription };
