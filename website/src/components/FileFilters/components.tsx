/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import SelectComp from '../../components/Select';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

export const Select = styled(SelectComp)`
  min-width: 190px;

  & div[role='button'] {
    min-height: 28px;
    height: 28px;
  }

  & ol li {
    height: 18px;
  }
`;

const Label = styled('div')`
  margin-right: 5px;
`;

export const Filter = ({
  label,
  ariaLabel,
  options,
  value,
  onChange,
  styles,
}: {
  label: string;
  ariaLabel: string;
  options: Array<any>;
  value: any;
  onChange: any;
  styles?: any;
}) => (
  <div
    css={css`
      display: flex;
      align-items: center;
      margin-right: 16px;
      ${styles}
    `}
  >
    <Label>{label}:</Label>
    <Select aria-label={ariaLabel} options={options} value={value} onChange={onChange} size="sm" />
  </div>
);
