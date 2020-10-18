import React from 'react';
import CompareLegend, { CompareLegendProps } from '.';
import { Story } from '@storybook/react/types-6-0';

export default {
  title: 'Compare Legend',
  component: CompareLegend,
};

const Template: Story<CompareLegendProps> = (args) => <CompareLegend {...args} />;

export const FirstStory: Story<CompareLegendProps> = Template.bind({});
FirstStory.args = {
  comparison: {
    updated: 1,
    created: 1,
    deleted: 2,
  },
};
