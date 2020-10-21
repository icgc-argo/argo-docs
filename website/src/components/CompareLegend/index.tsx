/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import Icon from '@icgc-argo/uikit/Icon';
import { css } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import { Theme } from '../../styles/theme/icgc-argo';
import { Schema, ChangeType } from '../../../types';
import cloneDeep from 'lodash/cloneDeep';

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

export interface CompareLegendProps {
  comparison: {
    updated: number;
    created: number;
    deleted: number;
  };
  styles?: any;
}

const CompareLegend = ({ comparison, styles }: CompareLegendProps) => {
  const theme: Theme = useTheme();
  const diffColors = theme.diffColors.star;
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
      {`${created} ${compareText.created} ${pluralise(created, 'field')}`}
      <Star fill={diffColors.updated} />
      {`${updated} ${compareText.updated} ${pluralise(updated, 'field')}`}
      <Star fill={diffColors.deleted} />
      {`${deleted} ${compareText.deleted} ${pluralise(deleted, 'field')}`}
    </div>
  );
};

export const compareText = {
  [ChangeType.UPDATED]: 'Updated',
  [ChangeType.DELETED]: 'Deleted',
  [ChangeType.CREATED]: 'New',
};

const defaultCount = { updated: 0, created: 0, deleted: 0 };
export const generateComparisonCounts = (schemas: Schema[]) =>
  schemas.reduce((dictionaryCount, schema) => {
    const schemaCount = schema.fields.reduce((fieldCount, field) => {
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
    }, cloneDeep(defaultCount));

    return {
      updated: dictionaryCount.updated + schemaCount.updated,
      deleted: dictionaryCount.deleted + schemaCount.deleted,
      created: dictionaryCount.created + schemaCount.created,
    };
  }, cloneDeep(defaultCount));

export default CompareLegend;
