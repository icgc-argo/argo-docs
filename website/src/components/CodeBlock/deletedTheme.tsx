import defaultTheme from './default';

export default {
  ...defaultTheme,
  plain: {
    ...defaultTheme.plain,
    textDecoration: 'line-through',
  },
};
