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

/** @jsx jsx */
import { jsx } from '@emotion/core';

import React from 'react';
//import Select from '@icgc-argo/uikit/form/Select';
import Select from '../../components/Select';
import Input from '@icgc-argo/uikit/form/Input';
import styles from './styles.module.css';
import Typography from '@icgc-argo/uikit/Typography';
import { styled } from '@icgc-argo/uikit';
import debounce from 'lodash/debounce';
import startCase from 'lodash/startCase';
import { css } from '@emotion/core';

export const NO_ACTIVE_FILTER: string = 'no_active_filter';
export const DEFAULT_FILTER: Array<FilterSelect> = [{ content: 'All', value: NO_ACTIVE_FILTER }];

type FilterSelect = { content: string; value: string };

/* 
.fileFilters .dataSelectors > div {
  margin: 0 7px 0 5px;
}
 */

/**
 *
 * @param param0
 *
 *
 * searchParams should really  be FILTER_PARAMS
 * tiers + attrbiutes + search = FILTERED
 */

const FileFilters = ({
  dataTiers = [], // change to tiers
  dataAttributes = [], // change to attributes
  searchParams = {},
  onFilter,
}: {
  dataTiers: Array<FilterSelect>;
  dataAttributes: Array<FilterSelect>;
  searchParams: { [key: string]: string };
  onFilter: (any) => void;
}) => {
  // update search params
  const onSelect = (filterName) => (value) =>
    onFilter({ ...searchParams, ...{ [filterName]: value } });

  //const [inputValue, setInputValue] = React.useState('');
  //const applySearch = debounce(onSearch, 500);
  return (
    <Typography variant="data" color="#151c3d">
      <div
        css={css`
          display: flex;
          align-items: center;
        `}
      >
        Data Tier:{' '}
        <Select
          aria-label="Data Tier Select"
          options={DEFAULT_FILTER.concat(dataTiers)}
          value={searchParams.tier}
          onChange={onSelect('tier')}
          size="sm"
          css={css`
            min-width: 190px;
          `}
        />
        Attribute:{' '}
        <Select
          aria-label="Data Attribute Select"
          options={DEFAULT_FILTER.concat(dataAttributes)}
          value={searchParams.attribute}
          onChange={onSelect('attribute')}
          size="sm"
          css={css`
            min-width: 190px;
          `}
        />
        {/*<Input
            onChange={e => {
              setInputValue(e.target.value);
              applySearch(e.target.value);
            }}
            value={inputValue}
            placeholder="Search Dictionary..."
            preset="search"
            className={styles.search}
          />*/}
      </div>
    </Typography>
  );
};

export const generateFilter = (item: string): FilterSelect => ({
  content: startCase(item),
  value: item,
});

export default FileFilters;
