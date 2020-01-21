/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
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
            {/* <a href="https://platform.icgc-argo.org/contact">Contact</a>
            <Slash /> */}
            <a href="https://platform.icgc-argo.org/privacy">Privacy Policy</a>
            <Slash />
            <a href="https://platform.icgc-argo.org/terms">Terms & Conditions</a>
            <Slash />
            <a href="https://platform.icgc-argo.org/publicationpolicy">Publication Policy</a>
          </section>
          <section className={styles['legal-text']}>
            {siteConfig.themeConfig.footer.copyright}
          </section>
          <section className={styles['legal-text']}>
            <a href="https://platform.icgc-argo.org/">ARGO Data Platform</a> 1.0.0 - API v1 -
            8e37309
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
