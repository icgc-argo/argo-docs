/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';
import Button from '../../components/Button';

const Script = ({
  script,
  name,
  diff,
  showScript,
}: {
  script: string[];
  name: string;
  diff: { left: string; right: string };
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

export { Script };
