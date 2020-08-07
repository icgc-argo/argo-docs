import argo from '@icgc-argo/uikit/theme/defaultTheme';
import { ChangeType } from '../../../components/Schema';

const argoColors = argo.colors;

export type DiffColors = { [key in ChangeType]: string };

const diffColors: DiffColors = {
  created: argoColors.accent1_dimmed,
  updated: argoColors.warning_dark,
  deleted: argoColors.error,
};

const schema: { row: DiffColors } = {
  row: {
    updated: argoColors.warning_4,
    created: argoColors.accent1_4,
    deleted: argoColors.error_4,
  },
};

/**
 * This project very heavily depedendant on UIKIT right now, which is dependant on certain theme format
 * for now keep passing through all of uikit default theme
 */
const theme = {
  ...argo,
  diffColors,
  schema,
};

export default theme;

export type Theme = typeof theme;
