import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import defaultTheme from './theme/default';
import { Global, css } from '@emotion/core';

/**
 * Docusaurus with classic theme plugin has default styling, override if neccessary
 */
const globalStyles = css``;

const EmotionThemeProvider = ({
  theme = defaultTheme,
  children,
}: {
  theme?: any;
  children: React.ReactNode;
}) => (
  <ThemeProvider theme={theme}>
    <Global styles={globalStyles} />
    {children}
  </ThemeProvider>
);

export default EmotionThemeProvider;
