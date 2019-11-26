/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

// const siteConfig = {
//   title: 'ICGC ARGO Docs', // Title for your website.
//   disableTitleTagline: true,
//   disableHeaderTitle: true,
//   url: 'https://docs.icgc-argo.com', // Your website URL
//   baseUrl: '/', // Base URL for your project */
//   // For github.io type URLs, you would set the url and baseUrl like:
//   //   url: 'https://facebook.github.io',
//   //   baseUrl: '/test-site/',

//   // Used for publishing and more
//   projectName: 'icgc-argo-documentation',
//   organizationName: 'ICGC-ARGO',
//   // For top-level user or org sites, the organization is still the same.
//   // e.g., for the https://JoelMarcey.github.io site, it would be set like...
//   //   organizationName: 'JoelMarcey'

//   twitterUsername: 'icgcargo',

//   // For no header links in the top nav bar -> headerLinks: [],
//   headerLinks: [
//     { page: 'dictionary', label: 'Data Dictionary' },
//     { doc: 'submission-getting-started', label: 'Submission' },
//     { doc: 'data-access', label: 'Data Access' },
//     { href: 'https://platform-ui.argo.cancercollaboratory.org/contact', label: 'Contact' },
//   ],
//   docsSideNavCollapsible: true,

//   /* path to images for header/footer */
//   headerIcon: 'img/logos/icgc_argo_name.svg',
//   footerIcon: null,
//   favicon: 'favicon.ico',

//   /* Custom stylesheet and fonts */
//   stylesheets: ['https://fonts.googleapis.com/css?family=Work+Sans:200,300,400,600&display=swap'],

//   /* Colors for website */
//   colors: {
//     primaryColor: '#ffffff',
//     secondaryColor: '#f8f8fb',
//   },

//   /* Custom fonts for website */
//   fonts: {
//     primaryFont: ['Work Sans'],
//     // myOtherFont: [
//     //   "-apple-system",
//     //   "system-ui"
//     // ]
//   },

//   // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
//   copyright: `© ${new Date().getFullYear()} ICGC ARGO. All Rights reserved.`,

//   highlight: {
//     // Highlight.js theme to use for syntax highlighting in code blocks.
//     theme: 'hybrid',
//   },

//   // Add custom scripts here that would be placed in <script> tags.
//   scripts: [],

//   // On page navigation for the current documentation page.
//   onPageNav: 'separate',
//   // No .html extensions for paths.
//   cleanUrl: true,

//   // Open Graph and Twitter card images.
//   // ogImage: 'img/undraw_online.svg',
//   // twitterImage: 'img/undraw_tweetstorm.svg',

//   // For sites with a sizable amount of content, set collapsible to true.
//   // Expand/collapse the links and subcategories under categories.
//   // docsSideNavCollapsible: true,

//   // Show documentation's last contributor's name.
//   // enableUpdateBy: true,

//   // Show documentation's last update time.
//   // enableUpdateTime: true,

//   // You may provide arbitrary config keys to be used as needed by your
//   // template. For example, if you need your repo's URL...
//   //   repoUrl: 'https://github.com/facebook/test-site',
// };

module.exports = {
  title: 'ICGC ARGO Docs',
  url: 'https://docs.icgc-argo.com',
  baseUrl: '/',
  organizationName: 'ICGC-ARGO',
  projectName: 'icgc-argo-documentation',

  favicon: 'favicon.ico',
  tagline: 'ICGC ARGO Docs',

  scripts: [],
  stylesheets: ['https://fonts.googleapis.com/css?family=Work+Sans:200,300,400,600&display=swap'],

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
};
