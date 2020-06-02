import React from 'react';
import classnames from 'classnames';
import useAlgolia from '../../hooks/useAlgolia';
import { isSearchAvailable } from '../../utils';

const Search = (props) => {
  if (!isSearchAvailable) return null;

  const inputRef = React.useRef();
  useAlgolia(inputRef);

  return (
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
        ref={inputRef}
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
  );
};

export default Search;
