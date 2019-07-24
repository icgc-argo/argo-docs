/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

function Help(props) {
  const { config: siteConfig, language = '' } = props;
  const { baseUrl, docsUrl } = siteConfig;
  const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
  const langPart = `${language ? `${language}/` : ''}`;
  const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

  return (
    <div className="docMainWrapper wrapper">
      <Container className="mainContainer documentContainer postContainer">
        <div
          className="post"
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <header className="postHeader">
            <h1>Data Dictionary</h1>
          </header>
          <p>Coming Soon...</p>
          <img src="img/undraw_under_construction.svg" alt="Under Construction" />
        </div>
      </Container>
    </div>
  );
}

module.exports = Help;
