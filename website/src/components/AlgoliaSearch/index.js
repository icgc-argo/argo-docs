/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useRef, useCallback } from 'react';
import classnames from 'classnames';

import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useHistory } from '@docusaurus/router';
import style from './styles.module.css';

let loaded = false;

const Search = props => {
  const initialized = useRef(false);
  const searchBarRef = useRef(null);
  const { siteConfig = {} } = useDocusaurusContext();
  const {
    themeConfig: { algolia },
  } = siteConfig;
  const history = useHistory();

  const initAlgolia = () => {
    if (!initialized.current) {
      window.docsearch({
        debug: true,
        appId: algolia.appId,
        apiKey: algolia.apiKey,
        indexName: algolia.indexName,
        inputSelector: '#algolia-homepage-search',
        algoliaOptions: algolia.algoliaOptions,
        // Override algolia's default selection event, allowing us to do client-side
        // navigation and avoiding a full page refresh.
        handleSelected: (_input, _event, suggestion) => {
          // Use an anchor tag to parse the absolute url into a relative url
          // Alternatively, we can use new URL(suggestion.url) but its not supported in IE
          const a = document.createElement('a');
          a.href = suggestion.url;

          // Algolia use closest parent element id #__docusaurus when a h1 page title does not have an id
          // So, we can safely remove it. See https://github.com/facebook/docusaurus/issues/1828 for more details.
          const routePath = `#__docusaurus` === a.hash ? `${a.pathname}` : `${a.pathname}${a.hash}`;
          history.push(routePath);
        },
      });
      initialized.current = true;
    }
  };

  const loadAlgolia = () => {
    if (!loaded) {
      Promise.all([import('docsearch.js'), import('./algolia.css')]).then(
        ([{ default: docsearch }]) => {
          console.log('search loaded');
          loaded = true;
          window.docsearch = docsearch;
          initAlgolia();
        },
      );
    } else {
      initAlgolia();
    }
  };

  React.useEffect(() => loadAlgolia(), []);

  return (
    <div className={style.searchEntryWrapper} key="search-box">
      <img
        className={style.searchEntryIcon}
        src={`img/icons/search.svg`}
        alt="Search"
        height="20"
        width="20"
      />

      <input
        style={{ height: '100%', width: '100%', paddingRight: '20px' }}
        id="algolia-homepage-search"
        type="search"
        placeholder="Search"
        aria-label="Search"
        onClick={loadAlgolia}
        onMouseOver={loadAlgolia}
        ref={searchBarRef}
        className={style.searchEntryInput}
      />
    </div>
  );
};

export default Search;
