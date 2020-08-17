/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import Icon from '@icgc-argo/uikit/Icon';
import { css } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import { Theme } from '../../styles/theme/icgc-argo';
import { Schema, ChangeType } from '../../../types';

const Star = ({ fill }: { fill: string }) => (
  <Icon
    name="star"
    fill={fill}
    width="14px"
    css={css`
      margin-right: 4px;
      margin-left: 8px;
    `}
  />
);

const pluralise = (count: number, noun: string) => (count > 1 ? noun + 's' : noun);

const CompareLegend = ({
  comparison,
  styles,
}: {
  comparison: {
    updated: number;
    created: number;
    deleted: number;
  };
  styles?: any;
}) => {
  const theme: Theme = useTheme();
  const diffColors = theme.diffColors;
  const { updated, deleted, created } = comparison;
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        font-size: 12px;
        font-weight: bold;
        ${styles}
      `}
    >
      <Star fill={diffColors.created} />
      {`${created} new ${pluralise(created, 'field')}`}
      <Star fill={diffColors.updated} />
      {`${updated} updated ${pluralise(updated, 'field')}`}
      <Star fill={diffColors.deleted} />
      {`${deleted} deleted ${pluralise(deleted, 'field')}`}
    </div>
  );
};

const defaultCount = { updated: 0, created: 0, deleted: 0 };
export const generateComparisonCounts = (schemas: Schema[]) =>
  schemas.reduce(
    (dictionaryCount, schema) => {
      const schemaCount = schema.fields.reduce(
        (fieldCount, field) => {
          switch (field.changeType) {
            case ChangeType.CREATED:
              fieldCount.created++;
              break;
            case ChangeType.DELETED:
              fieldCount.deleted++;
              break;
            case ChangeType.UPDATED:
              fieldCount.updated++;
          }
          return fieldCount;
        },
        { ...defaultCount },
      );
      console.log('schema count', schemaCount);
      return {
        updated: dictionaryCount.updated + schemaCount.updated,
        deleted: dictionaryCount.deleted + schemaCount.deleted,
        created: dictionaryCount.created + schemaCount.created,
      };
    },
    { ...defaultCount },
  );

export default CompareLegend;
