/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useRef } from 'react';

import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useHistory } from '@docusaurus/router';
import style from './styles.module.css';
import { styled } from '@icgc-argo/uikit';

/**
 * CSS Modules hard to use to style parent dynamic div
 * i.e when Algolia inits search input
 */
const SearchWrapper = styled(`div`)`
  width: 500px;
  height: 50px;
  border-radius: 10px;
  border: 1px solid #babcc2;
  background-color: white;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  .algolia-autocomplete {
    width: 100%;
    padding-right: 20px;

    .ds-dropdown-menu {
      top: calc(100% + 10px) !important;
    }
  }
`;

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
        // debug: true,
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

  return (
    <SearchWrapper key="search-box">
      <img
        className={style.searchEntryIcon}
        src={`img/icons/search.svg`}
        alt="Search"
        height="20"
        width="20"
      />

      <input
        id="algolia-homepage-search"
        type="search"
        placeholder="Search"
        aria-label="Search"
        onClick={initAlgolia}
        onMouseOver={initAlgolia}
        ref={searchBarRef}
        className={style.searchEntryInput}
      />
    </SearchWrapper>
  );
};

export default Search;
