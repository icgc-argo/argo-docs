import React from 'react';
import classnames from 'classnames';
import DocSearch from '../../components/DocSearch';

const Search = props => (
  <DocSearch searchElId="#search_input_react">
    <div className="navbar__search" key="search-box">
      <span
        aria-label="expand searchbar"
        role="button"
        className={classnames('search-icon', {
          'search-icon-hidden': props.isSearchBarExpanded,
        })}
        tabIndex={0}
      />
      <input
        id="search_input_react"
        type="search"
        placeholder="Search"
        aria-label="Search"
        className={classnames(
          'navbar__search-input',
          { 'search-bar-expanded': props.isSearchBarExpanded },
          { 'search-bar': !props.isSearchBarExpanded },
        )}
      />
    </div>
  </DocSearch>
);

export default Search;
