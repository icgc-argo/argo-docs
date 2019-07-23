/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

class Footer extends React.Component {
  docUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    const docsUrl = this.props.config.docsUrl;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    return `${baseUrl}${docsPart}${langPart}${doc}`;
  }

  pageUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    return baseUrl + (language ? `${language}/` : '') + doc;
  }

  render() {
    const Slash = props => (
      <img src={`${this.props.config.baseUrl}img/slash.svg`} alt="Divider" width="12" height="12" />
    );
    return (
      <footer className="nav-footer" id="footer">
        <div className="footerWrapper">
          <div className="footerLogo">
            <img
              src={`${this.props.config.baseUrl}img/icgc_argo_full.svg`}
              alt="ICGC ARGO"
              height="70px"
            />
          </div>
          <div className="footerContent">
            <section className="footerLinks">
              <a href="#">The Platform</a>
              <Slash />
              <a href="#">Contact</a>
              <Slash />
              <a href="#">Privacy Policy</a>
              <Slash />
              <a href="#">Terms & Conditions</a>
              <Slash />
              <a href="#">Publication Policy</a>
            </section>
            <section className="legal-text">{this.props.config.copyright}</section>
            <section className="legal-text">
              <a href="#">ICGC ARGO Platform</a> 1.0.0 - API v1 - 8e37309
            </section>
          </div>
          <div className="footerLogo flexEnd">
            <img
              src={`${this.props.config.baseUrl}img/oicr_logo.svg`}
              alt="ICGC ARGO"
              height="52px"
            />
          </div>
        </div>
      </footer>
    );
  }
}

module.exports = Footer;
