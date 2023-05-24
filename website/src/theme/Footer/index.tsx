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

import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

function Footer() {
  const { siteConfig } = useDocusaurusContext();
  // @ts-ignore
  const copyright: string = siteConfig.themeConfig.footer.copyright;

  const Slash = () => (
    <img src={useBaseUrl(`img/icons/slash.svg`)} alt="Divider" width="12" height="12" />
  );

  return (
    <footer className={styles['nav-footer']} id="footer">
      <div className={styles.footerWrapper}>
        <div className={styles.footerLogo}>
          <a href="https://www.cancermodels.org/">
            <img
              src={useBaseUrl(`img/logos/icgc_argo_full.svg`)}
              alt="CancerModels.org"
              width="240px"
            />
          </a>
        </div>
        <div className={styles.footerContent}>
          <section className={styles.footerLinks}>
            <a href="https://www.cancermodels.org/contact" target="_blank">
              Contact
            </a>
            <Slash />
            <a href="https://www.cancermodels.org/privacy-policy" target="_blank">
              Privacy Policy
            </a>
            <Slash />
            <a href="https://www.cancermodels.org/terms-of-use" target="_blank">
              Terms of use
            </a>
            <Slash />
            <a href="https://www.cancermodels.org/about" target="_blank">
              About
            </a>
          </section>
          <section className={styles['legal-text']}>{copyright} </section>
          <section className={styles['legal-text']}>
            <a href="" target="_blank">
              CancerModels.org
            </a>{' '}
            {/*1.0.0 - API v1 - 8e37309*/}
          </section>
        </div>
        <div className={styles.footerLogo}>
          <a href="">
            <img
              src={useBaseUrl(`img/logos/embl-ebi-rgb-full-colour.png`)}
              alt="EMBL EBI"
              height="52px"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
