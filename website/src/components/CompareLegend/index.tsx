/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import Icon from '@icgc-argo/uikit/Icon';
import { css } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import { Theme } from '../../styles/theme/icgc-argo';

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
      {`${created} new fields`}
      <Star fill={diffColors.updated} />
      {`${updated} updated fields`}
      <Star fill={diffColors.deleted} />
      {`${deleted} deleted fields`}
    </div>
  );
};

export default CompareLegend;
