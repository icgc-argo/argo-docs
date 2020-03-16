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
    prism: {
      /**
       * if you change the theme, you will need to change the highlighted theme for the code block
       * default theme is Palenight*/
      // theme: require('prism-react-renderer/themes/dracula'),
    },

    disableDarkMode: true,
    navbar: {
      title: '',
      logo: {
        alt: 'ICGC-ARGO',
        src: 'img/logos/icgc_argo_name.svg',
      },
      links: [
        { to: 'dictionary', label: 'Data Dictionary', position: 'right' },
        { to: 'docs/submission-overview', label: 'Submission', position: 'right' },
        { to: 'docs/data-access', label: 'Data Access', position: 'right' },
        { to: 'docs/dna-pipeline', label: 'Data Harmonization', position: 'right' },

        // {
        //   href: 'https://platform.icgc-argo.org/contact',
        //   label: 'Contact',
        //   position: 'right',
        // },
      ],
    },
    footer: {
      logo: null,
      copyright: `© ${new Date().getFullYear()} ICGC ARGO. All Rights reserved.`,
    },
  },
  customFields: {
    PLATFORM_UI_ROOT: 'https://platform.icgc-argo.org/',
    GATEWAY_API_ROOT: 'https://api.platform.icgc-argo.org/',
  },
};
