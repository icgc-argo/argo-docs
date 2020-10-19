import React from 'react';
import EmotionThemeProvider from '../src/styles/EmotionThemeProvider';
import argoTheme from '../src/styles/theme/icgc-argo';

export const decorators = [
  (Story) => (
    <EmotionThemeProvider theme={argoTheme}>
      <Story />
    </EmotionThemeProvider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};
