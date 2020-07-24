import argo from '@icgc-argo/uikit/theme/defaultTheme';
import { ChangeType } from '../../../components/Schema';

const argoColors = argo.colors;

export type DiffColors = { [key: string]: string };
const diffColors: DiffColors = {
  accent1: argoColors.accent1_dimmed,
  accent2: argoColors.warning_dark,
  accent3: argoColors.error,
};

const schema: { row: { [key in ChangeType]: string } } = {
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
