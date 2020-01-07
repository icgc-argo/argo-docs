const path = require('path');

module.exports = {
  title: 'ICGC ARGO Docs',
  url: 'https://docs.icgc-argo.com',
  baseUrl: '/',
  organizationName: 'ICGC-ARGO',
  projectName: 'icgc-argo-documentation',

  favicon: 'favicon.ico',
  tagline: 'ICGC ARGO Docs',

  scripts: [],
  stylesheets: ['https://fonts.googleapis.com/css?family=Source+Code+Pro|Work+Sans&display=swap'],

  plugins: [path.resolve(__dirname, './svg-plugin')],

  plugins: [path.resolve(__dirname, './svg-plugin')],

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        docs: {
          // docs folder path relative to website dir.
          path: '../docs',
          // sidebars file relative to website dir.
          sidebarPath: require.resolve('./sidebars.js'),
        },
      },
    ],
  ],

  themeConfig: {
    disableDarkMode: true,
    navbar: {
      title: '',
      logo: {
        alt: 'ICGC-ARGO',
        src: 'img/logos/icgc_argo_name.svg',
      },
      links: [
        { to: 'dictionary', label: 'Data Dictionary', position: 'right' },
        { to: 'docs/submission-getting-started', label: 'Submission', position: 'right' },
        { to: 'docs/data-access', label: 'Data Access', position: 'right' },
        {
          href: 'https://platform-ui.qa.argo.cancercollaboratory.org/contact',
          label: 'Contact',
          position: 'right',
        },
      ],
    },
    footer: {
      logo: null,
      copyright: `© ${new Date().getFullYear()} ICGC ARGO. All Rights reserved.`,
    },
  },
  customFields: {
    platformUrl: 'https://platform-ui.qa.argo.cancercollaboratory.org/',
  },
};
