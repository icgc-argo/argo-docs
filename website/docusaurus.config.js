/*
 * Copyright (c) 2020 The Ontario Institute for Cancer Research. All rights reserved
 *
 * This program and the accompanying materials are made available under the terms of the GNU Affero General Public License v3.0.
 * You should have received a copy of the GNU Affero General Public License along with
 * this program. If not, see <http://www.gnu.org/licenses/>.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 *
 */

const path = require('path');

module.exports = {
  title: 'ICGC ARGO Docs',
  url: 'https://docs.icgc-argo.com',
  baseUrl: '/',
  organizationName: 'ICGC-ARGO',
  projectName: 'icgc-argo-documentation',

  favicon: 'favicon.ico',
  tagline: 'ICGC ARGO Docs',

  stylesheets: ['https://fonts.googleapis.com/css?family=Source+Code+Pro|Work+Sans&display=swap'],

  plugins: [path.resolve(__dirname, './svg-plugin'), path.resolve(__dirname, './dotenv-plugin')],

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        theme: {
          customCss: require.resolve('./src/css/custom.css'), // Don't use Array, put more CSS in 'stylesheets' above
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
        { to: 'docs/submission/submission-overview', label: 'Submission', position: 'right' },
        { to: 'docs/data-access/data-access', label: 'Data Access', position: 'right' },
        {
          to: 'docs/analysis-workflows/analysis-overview',
          label: 'Analysis Pipelines',
          position: 'right',
        },

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
