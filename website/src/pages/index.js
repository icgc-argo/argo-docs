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

const React = require('react');

import Layout from '@theme/Layout';
import styles from './styles.module.css';
import AlgoliaSearch from '../components/AlgoliaSearch';

function HomeSplash() {
  const SplashContainer = props => (
    <div className={styles.homeContainer}>
      <div className={styles.homeSplashFade}>
        <div className={styles.homeWrapper}>{props.children}</div>
      </div>
    </div>
  );

  const SearchBanner = props => (
    <section className={styles.searchBanner}>
      <span className={styles.bannerText}>How can we help?</span>
      <AlgoliaSearch />
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
                  <a href="/docs/submission/submission-overview">Get started</a>: a quick guide to
                  data submission
                </li>
                <li>
                  How to <a href="/docs/submission/registering-samples">register samples</a>
                </li>
                <li>
                  How to{' '}
                  <a href="/docs/submission/submitting-clinical-data">submit clinical data</a>
                </li>
                <li>
                  How to{' '}
                  <a href="/docs/submission/submitting-molecular-data">submit molecular data</a>
                </li>
              </ul>
            </ContentBlock>
            <ContentBlock
              title="Data Access & Download"
              color="#f95d31"
              icon="img/icons/home/download.svg"
            >
              <ul>
                <li>
                  How to <a href="/docs/data-access/data-access">access controlled data</a>
                </li>
                <li>
                  How to <a href="/docs/data-access/data-download">download data</a>
                </li>
                <li>
                  How to use the <a href="/docs/data-access/data-download">Score Download Client</a>
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
              <span className={styles.contentDescription}>
                ICGC ARGO uniformly analyzes molecular data against the <b>GRCh38 Human Reference Genome</b>
              </span>
              <ul>
                <li>
                  <a href="/docs/analysis-workflows/analysis-overview">Analysis overview and accepted datatypes</a>
                </li>
                <li>
                  Details about the <a href="/docs/analysis-workflows/dna-pipeline">DNA-Seq analysis pipeline</a>
                </li>
              </ul>
            </ContentBlock>
            <ContentBlock
              title="Publication Guidelines"
              color="#E75471"
              icon="img/icons/home/publication-guidelines.svg"
            >
              <span className={styles.contentDescription}>
                How to cite the ARGO Data Platform and datasets within your publication.
              </span>
              <a className={styles.contentAction} href="/docs/data-access/publication-guidelines">
                Read the Guidelines
                <img src="img/icons/chevron-right.svg" height={8} width={8} />
              </a>
            </ContentBlock>
            <ContentBlock
              title="Release Notes"
              color="#0774d3"
              icon="img/icons/home/data-release.svg"
            >
              <span className={styles.contentDescription}>
                The ARGO Data Platform regularly releases updates to its data and software.
              </span>
              <ul>
                <li>
                  View <a href="/docs/release-notes/data-releases">data release details</a>
                </li>
                <li>
                  View <a href="/docs/release-notes/software-releases">software release details</a>
                </li>
                <li>
                  View{' '}
                  <a href="/docs/release-notes/dictionary-releases">dictionary release details</a>
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
