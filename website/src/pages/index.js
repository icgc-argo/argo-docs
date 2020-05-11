/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

import Layout from '@theme/Layout';
import styles from './styles.module.css';
import AlgoliaSearch from '../components/AlgoliaSearch';

function HomeSplash() {
  const SplashContainer = (props) => (
    <div className={styles.homeContainer}>
      <div className={styles.homeSplashFade}>
        <div className={styles.homeWrapper}>{props.children}</div>
      </div>
    </div>
  );

  const SearchBanner = (props) => (
    <section className={styles.searchBanner}>
      <span className={styles.bannerText}>How can we help?</span>
    </section>
  );

  return (
    <SplashContainer>
      <SearchBanner />
    </SplashContainer>
  );
}

class ContentBlock extends React.Component {
  render() {
    const { color, title, icon } = this.props;
    return (
      <div className={styles.contentBlock} style={{ borderColor: color }}>
        <div className={styles.contentBlockHeader}>
          <span className={styles.contentBlockTitle}>{title}</span>
          <img src={icon} height={50} />
        </div>
        <div className={styles.contentBlockInner}>{this.props.children}</div>
      </div>
    );
  }
}

function Index() {
  return (
    <Layout permalink="/" title="ICGC ARGO Docs">
      <div>
        <HomeSplash />
        <div className={styles.mainContainer}>
          <div className={styles.row}>
            <ContentBlock
              title="Data Dictionary"
              color="#4bcee5"
              icon="img/icons/home/data-dictionary.svg"
            >
              <span className={styles.contentDescription}>
                The dictionary describes the schema that data submitters must conform to and track
                changes when formatting clinical data files.
              </span>
              <a className={styles.contentAction} href="/dictionary">
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
                  <a href="/docs/submission-overview">Get started</a>: a quick guide to data
                  submission
                </li>
                <li>
                  How to <a href="/docs/registering-samples">register samples</a>
                </li>
                <li>
                  How to <a href="/docs/submitting-clinical-data">submit clinical data</a>
                </li>
                <li>
                  How to <a href="/docs/submitting-molecular-data">submit molecular data</a>
                </li>
              </ul>
            </ContentBlock>
            <ContentBlock
              title="Data Access & Download "
              color="#f95d31"
              icon="img/icons/home/download.svg"
            >
              <ul>
                <li>
                  How to <a href="/docs/data-access">access controlled data</a>
                </li>
                <li>
                  How to <a href="/docs/data-download">download data</a>
                </li>
                <li>
                  How to use the <a href="/docs/data-download">Score Download Client</a>
                </li>
              </ul>
            </ContentBlock>
          </div>
          <div className={styles.row}>
            <ContentBlock
              title="Data Analysis Workflows"
              color="#7f55cc"
              icon="img/icons/home/analysis-workflows.svg"
            >
              Coming Soon
              {/* <ul>
                <li>
                  <a href="/docs/submission-getting-started">Get started</a>: a quick guide to data
                  submission
                </li>
                <li>
                  How to <a href="/docs/submitting-clinical-data">submit clinical data</a>
                </li>
                <li>
                  How to <a href="/docs/submitting-molecular-data">submit molecular data</a>
                </li>
                <li>
                  How to <a href="/docs/managing-program-access">manage program users</a>
                </li>
              </ul> */}
            </ContentBlock>
            <ContentBlock
              title="Publication Guidelines"
              color="#E75471"
              icon="img/icons/home/publication-guidelines.svg"
            >
              <span className={styles.contentDescription}>
                How to cite the ARGO Data Platform and datasets within your publication.
              </span>
              <a className={styles.contentAction} href="/docs/publication-guidelines">
                Read the Guidelines
                <img src="img/icons/chevron-right.svg" height={8} width={8} />
              </a>
            </ContentBlock>
            <ContentBlock
              title="Release Notes"
              color="#0774d3"
              icon="img/icons/home/data-release.svg"
            >
              <ul>
                <li>
                  View <a href="/docs/data-releases">data release details</a>
                </li>
                <li>
                  View <a href="/docs/software-releases">software release details</a>
                </li>
                <li>
                  View <a href="/docs/dictionary-releases">dictionary release details</a>
                </li>
              </ul>
            </ContentBlock>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Index;
