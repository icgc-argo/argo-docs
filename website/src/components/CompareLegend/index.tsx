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
  css: newCss,
}: {
  comparison: {
    additions: number;
    updates: number;
    deletions: number;
  };
  css?: any;
}) => {
  const theme: Theme = useTheme();
  const diffColors = theme.diffColors;
  const { additions, deletions, updates } = comparison;
  return (
    <div
      css={[
        css`
          display: flex;
          align-items: center;
        `,
        newCss,
      ]}
    >
      <Star fill={diffColors.created} />
      {`${additions} new fields`}
      <Star fill={diffColors.updated} />
      {`${updates} updated fields`}
      <Star fill={diffColors.deleted} />
      {`${deletions} deleted fields`}
    </div>
  );
};

export default CompareLegend;
