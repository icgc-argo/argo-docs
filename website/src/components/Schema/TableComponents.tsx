/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';
import Button from '../../components/Button';
import get from 'lodash/get';
import { DiffText, DiffTextSegment, TextChange } from './DiffText';

const FieldDescription = ({ name, description }: { name: string; description: string }) => (
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
    {description}
  </div>
);

type TextDiff = { left: string; right: string };

const Script = ({
  script,
  name,
  diff,
  showScript,
}: {
  script: string[];
  name: string;
  diff: TextDiff;
  showScript: any;
}) => {
  return (
    <div>
      {diff ? (
        <Button
          variant="secondary"
          size="sm"
          onClick={() =>
            showScript({
              diff: { left: diff.left, right: diff.right },
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
