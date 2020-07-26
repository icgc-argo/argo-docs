/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { FC } from 'react';
import SelectComp from '@icgc-argo/uikit/form/Select';
import { withTheme } from 'emotion-theming';

type Size = 'sm' | 'lg';

type Option = {
  value: any;
  content: any;
};

type Select = {
  'aria-label': string;
  onChange: (value: string) => void;
  value: string;
  options: Array<Option>;
  size: Size;
};

const Select: FC<Select> = withTheme((props) => <SelectComp {...props} />);

export default Select;
