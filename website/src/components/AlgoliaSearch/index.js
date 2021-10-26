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
import style from './styles.module.css';
import { styled } from '@icgc-argo/uikit';
import useAlgolia from '../../hooks/useAlgolia';
import { isSearchAvailable } from '../../utils';
import SearchIcon from '@site/static/img/icons/search.svg';

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
    top: 1px;

    .ds-dropdown-menu {
      top: calc(100% + 10px) !important;
    }
  }
`;

const Search = (props) => {
  if (!isSearchAvailable) return null;

  const inputRef = React.useRef();
  useAlgolia(inputRef);

  return (
    <SearchWrapper key="search-box">
      <SearchIcon alt="Search" className={style.searchEntryIcon} />
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
