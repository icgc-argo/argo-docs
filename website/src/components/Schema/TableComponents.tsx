/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';
import Button from '../../components/Button';
import styled from '@emotion/styled';
import get from 'lodash/get';

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

type TextDiff = { left: string; right: string };

const Script = ({
  script,
  notes,
  name,
  diff,
  showScript,
}: {
  script: string[];
  notes: string;
  name: string;
  diff: TextDiff;
  showScript: any;
}) => {
  const notesDiff = get(diff, 'meta.notes', null);
  const scriptDiff = get(diff, 'restrictions.script', null);
  console.log('script diff', scriptDiff);
  return (
    <div>
      {notesDiff ? (
        <CompareText oldText={notesDiff.left} newText={notesDiff.right} />
      ) : notes ? (
        <div>{notes}</div>
      ) : null}

      {scriptDiff ? (
        <Button
          variant="secondary"
          size="sm"
          onClick={() =>
            showScript({
              diff: { left: scriptDiff.left, right: scriptDiff.right },
              fieldName: name,
            })
          }
          css={css`
            color: white;
            border: 1px solid #ec8f17;
            background-color: #ec8f17;

            &:hover,
            &:active,
            &:focus {
              color: black;
            }
          `}
        >
          View Script Updates
        </Button>
      ) : script ? (
        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            showScript({
              fieldName: name,
              content: script,
            });
          }}
        >
          View Script
        </Button>
      ) : null}
    </div>
  );
};

export { FieldDescription, Script };
