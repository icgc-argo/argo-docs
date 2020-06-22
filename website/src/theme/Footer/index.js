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
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;

  const Slash = () => (
    <img src={useBaseUrl(`img/icons/slash.svg`)} alt="Divider" width="12" height="12" />
  );

  return (
    <footer className={styles['nav-footer']} id="footer">
      <div className={styles.footerWrapper}>
        <div className={styles.footerLogo}>
          <a href="https://platform.icgc-argo.org/">
            <img
              src={useBaseUrl(`img/logos/icgc_argo_full.svg`)}
              alt="ICGC Accelerating Research in Genomic Oncology"
              width="240px"
            />
          </a>
        </div>
        <div className={styles.footerContent}>
          <section className={styles.footerLinks}>
            <a href="https://platform.icgc-argo.org/contact" target="_blank">
              Contact
            </a>
            <Slash />
            <a href="https://www.icgc-argo.org/page/2/privacy" target="_blank">
              Privacy Policy
            </a>
            <Slash />
            <a href="https://www.icgc-argo.org/page/1/terms-and-conditions" target="_blank">
              Terms & Conditions
            </a>
            <Slash />
            <a href="https://www.icgc-argo.org/page/77/e3-publication-policy" target="_blank">
              Publication Policy
            </a>
          </section>
          <section className={styles['legal-text']}>
            {siteConfig.themeConfig.footer.copyright}
          </section>
          <section className={styles['legal-text']}>
            <a href="https://platform.icgc-argo.org/" target="_blank">
              ARGO Data Platform
            </a>{' '}
            {/*1.0.0 - API v1 - 8e37309*/}
          </section>
        </div>
        <div className={styles.footerLogo}>
          <a href="https://www.oicr.on.ca/">
            <img
              src={useBaseUrl(`img/logos/oicr_logo.svg`)}
              alt="Ontario Institute for Cancer Research"
              height="52px"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
