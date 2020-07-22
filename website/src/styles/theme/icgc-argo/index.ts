import argo from '@icgc-argo/uikit/theme/defaultTheme';

const argoColors = argo.colors;

export type DiffColors = { [key: string]: string };
const diffColors: DiffColors = {
  accent1: argoColors.accent1_dimmed,
  accent2: argoColors.warning_dark,
  accent3: argoColors.error,
};

/**
 * This project very heavily depedendant on UIKIT right now, which is dependant on certain theme format
 * for now keep passing through all of uikit default theme
 */
const theme = {
  ...argo,
  diffColors,
};

export default theme;

export type Theme = typeof theme;
