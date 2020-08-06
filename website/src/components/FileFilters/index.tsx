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
import SelectComp from '../../components/Select';
import Typography from '@icgc-argo/uikit/Typography';
import debounce from 'lodash/debounce';
import startCase from 'lodash/startCase';
import { css } from '@emotion/core';
import { Filter } from './components';

export const NO_ACTIVE_FILTER: string = 'no_active_filter';
export const DEFAULT_FILTER: FilterSelect = { content: 'All', value: NO_ACTIVE_FILTER };

const FileFilters = ({
  dataTiers = [], // change to tiers
  dataAttributes = [], // change to attributes
  comparisons = [],
  searchParams = {},
  isDiffShowing,
  onFilter,
}: {
  dataTiers: Array<FilterSelect>;
  dataAttributes: Array<FilterSelect>;
  comparisons: Array<FilterSelect>;
  searchParams: { [key: string]: string };
  isDiffShowing: boolean;
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
        {isDiffShowing ? (
          <Filter
            label="Comparison"
            ariaLabel="Comparison Attribute Select"
            options={[DEFAULT_FILTER, ...comparisons]}
            value={searchParams.comparison}
            onChange={onSelect('comparison')}
          />
        ) : null}

        <Filter
          label="Data Tier"
          ariaLabel="Data Tier Select"
          options={[DEFAULT_FILTER, ...dataTiers]}
          value={searchParams.tier}
          onChange={onSelect('tier')}
        />

        <Filter
          label="Attribute"
          ariaLabel="Data Attribute Select"
          options={[DEFAULT_FILTER, ...dataAttributes]}
          value={searchParams.attribute}
          onChange={onSelect('attribute')}
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

const comparisonFilterDisplay = {
  updated: 'Updated fields',
  deleted: 'Deleted fields',
  created: 'Added fields',
};

export const generateComparisonFilter = (key: string) => ({
  content: comparisonFilterDisplay[key],
  value: key,
});

export const generateFilter = (item: string): FilterSelect => ({
  content: startCase(item),
  value: item,
});

export default FileFilters;
