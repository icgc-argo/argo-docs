/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';
import Button from '../../components/Button';
import styled from '@emotion/styled';
import get from 'lodash/get';
import { DiffText, DiffTextSegment, TextChange } from './DiffText';
import { ChangeType } from '.';

const FieldDescription = ({
  name,
  description,
  diff,
}: {
  name: string;
  description: string;
  diff: any;
}) => {
  // a name can only be created or destroyed, a new name is a new field
  const diffType = get(diff, 'changeType', null);
  const diffDescription = get(diff, 'description', null);
  return (
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
        {diffType === ChangeType.DELETED ? (
          <DiffTextSegment type={TextChange.DELETED}>{name}</DiffTextSegment>
        ) : (
          name
        )}
      </div>

      {diffDescription ? (
        <DiffText oldText={diffDescription.left} newText={diffDescription.right} />
      ) : (
        <div>{description}</div>
      )}
    </div>
  );
};

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

  return (
    <div>
      {notesDiff ? (
        <DiffText oldText={notesDiff.left} newText={notesDiff.right} />
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
