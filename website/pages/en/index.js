/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;

class HomeSplash extends React.Component {
  render() {
    const { siteConfig, language = '' } = this.props;
    const { baseUrl, docsUrl } = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

    const SplashContainer = props => (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">{props.children}</div>
        </div>
      </div>
    );

    const SearchEntry = props => (
      <div class="searchEntryWrapper">
        <img
          class="searchEntryIcon"
          src={`img/icons/search.svg`}
          alt="Search"
          height="20"
          width="20"
        />
        <input class="searchEntryInput" id="searchBannerInput" placeholder="Search..." />
      </div>
    );

    const SearchBanner = props => (
      <section className="searchBanner">
        <span className="bannerText">How can we help?</span>
        <SearchEntry />
      </section>
    );

    // const ContentBlock = ({ color, title, icon, ...props }) => {
    //   <div class="contentBlock" style={{ borderColor: color }}>
    //     <div class="contentBlockHeader">
    //       <span class="contentBlockTitle">{title}</span>
    //       <img src={icon} alt={title} />
    //     </div>
    //     <div class="contentBlockInner">{props.children}</div>
    //   </div>;
    // };

    return (
      <SplashContainer>
        <SearchBanner />
      </SplashContainer>
    );
  }
}

class ContentBlock extends React.Component {
  render() {
    const { color, title, icon } = this.props;
    return (
      <div class="contentBlock" style={{ borderColor: color }}>
        <div class="contentBlockHeader">
          <span class="contentBlockTitle">{title}</span>
          <img src={icon} height={50} />
        </div>
        <div class="contentBlockInner">{this.props.children}</div>
      </div>
    );
  }
}

class Index extends React.Component {
  render() {
    const { config: siteConfig, language = '' } = this.props;

    return (
      <div>
        <HomeSplash siteConfig={siteConfig} language={language} />
        <div className="mainContainer">
          <Container>
            <div class="row">
              <ContentBlock
                title="Data Dictionary"
                color="#4bcee5"
                icon="img/icons/home/data-dictionary.svg"
              >
                <span class="contentDescription">
                  The viewer describes the schema that data submitters must conform to and track
                  changes when formatiting clinical data files.
                </span>
                <a class="contentAction" href="#">
                  Data Dictionary Viewer
                  <img src="img/icons/chevron-right.svg" height={8} width={8} />
                </a>
              </ContentBlock>
              <ContentBlock
                title="Data Submission"
                color="#24dbb4"
                icon="img/icons/home/testtube.svg"
              >
                <ul>
                  <li>
                    <a href="#">Get started</a>: a quick guide to data submission
                  </li>
                  <li>
                    How to <a href="#">submit clinical data</a>
                  </li>
                  <li>
                    How to <a href="#">submit molecular data</a>
                  </li>
                  <li>
                    How to <a href="#">manage program users</a>
                  </li>
                </ul>
              </ContentBlock>
              <ContentBlock
                title="Data Download"
                color="#f95d31"
                icon="img/icons/home/download.svg"
              >
                <ul>
                  <li>
                    How to <a href="#">download data</a>
                  </li>
                  <li>
                    How to use the <a href="#">Score Download Client</a>
                  </li>
                  <li>
                    How to use the <a href="#">ICGC-ARGO token</a>
                  </li>
                </ul>
              </ContentBlock>
            </div>
            <div class="row">
              <ContentBlock
                title="Access to Controlled Data"
                color="#7f55cc"
                icon="img/icons/home/controlled-data.svg"
              >
                <ul>
                  <li>
                    <a href="#">Get started</a>: a quick guide to data submission
                  </li>
                  <li>
                    How to <a href="#">submit clinical data</a>
                  </li>
                  <li>
                    How to <a href="#">submit molecular data</a>
                  </li>
                  <li>
                    How to <a href="#">manage program users</a>
                  </li>
                </ul>
              </ContentBlock>
              <ContentBlock title="FAQs" color="#fea430" icon="img/icons/home/faq.svg">
                <ul>
                  <li>
                    <a href="#">Can I submit molecular data before registering IDs?</a>
                  </li>
                  <li>
                    <a href="#">What does "clinical completeness" mean?</a>
                  </li>
                  <li>
                    <a href="#">How do I track data processing stage?</a>
                  </li>
                </ul>
              </ContentBlock>
              <ContentBlock
                title="Release Notes"
                color="#0774d3"
                icon="img/icons/home/data-release.svg"
              >
                <ul>
                  <li>
                    <a href="#">Data Dictionary Releases</a>
                  </li>
                  <li>
                    <a href="#">Data Releases</a>
                  </li>
                  <li>
                    <a href="#">Platform Software Releases</a>
                  </li>
                </ul>
              </ContentBlock>
            </div>
          </Container>
        </div>
      </div>
    );
  }
}

module.exports = Index;
