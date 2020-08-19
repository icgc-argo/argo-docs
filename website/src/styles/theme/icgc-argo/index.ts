import argo from '@icgc-argo/uikit/theme/defaultTheme';
import { ChangeType } from '../../../../types';
import { TagVariant } from '../../../components/Tag';

export type DiffColors = { [key in Exclude<ChangeType, ChangeType.NONE>]: string };

const diffColors: { star: DiffColors; schemaField: DiffColors; fieldProperty: DiffColors } = {
  star: {
    created: '#00C79D',
    updated: '#ec8f17',
    deleted: '#df1b42',
  },
  schemaField: {
    updated: '#fef6ea',
    created: '#e9fbf7',
    deleted: '#fbe8ec',
  },
  fieldProperty: {
    deleted: '#f6c5cf',
    updated: '#15846c',
    created: '#d3f7f0',
  },
};

const tag: { [k in TagVariant]: string } = {
  required: '#e75471',
  conditional: '#ec8f17',
  id: '#00b3d3',
  core: '#00c79d',
  extended: '#a1a4b1',
};

/**
 * This project very heavily depedendant on UIKIT right now, which is dependant on certain theme format
 * for now keep passing through all of uikit default theme
 */
const theme = {
  ...argo,
  diffColors,
  tag,
};

export default theme;

export type Theme = typeof theme;
