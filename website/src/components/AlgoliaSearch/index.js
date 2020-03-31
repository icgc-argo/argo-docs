import React from 'react';
import style from './styles.module.css';
import { styled } from '@icgc-argo/uikit';
import useAlgolia from '../../hooks/useAlgolia';

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
  const inputRef = React.useRef();
  useAlgolia(inputRef);

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
        ref={inputRef}
        id="algolia-homepage-search"
        type="search"
        placeholder="Search"
        aria-label="Search"
        className={style.searchEntryInput}
      />
    </SearchWrapper>
  );
};
export default Search;
