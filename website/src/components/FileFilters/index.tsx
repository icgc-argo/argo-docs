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
import Select from '@icgc-argo/uikit/form/Select';
import Input from '@icgc-argo/uikit/form/Input';
import styles from './styles.module.css';
import Typography from '@icgc-argo/uikit/Typography';
import { styled } from '@icgc-argo/uikit';
import debounce from 'lodash/debounce';
import startCase from 'lodash/startCase';

export const NO_ACTIVE_FILTER: string = 'no_active_filter';
export const DEFAULT_FILTER: Array<FilterSelect> = [{ content: 'All', value: NO_ACTIVE_FILTER }];

const StyledSelect = styled(Select)`
  min-width: 190px;
`;

type FilterSelect = { content: string; value: string };

/* 
.fileFilters .dataSelectors > div {
  margin: 0 7px 0 5px;
}

.fileFilters [role='button'],
.search > div {
  min-height: 28px;
  height: 28px;
}

.fileFilters .search svg {
  height: 16px;
  width: 16px;
}

.fileFilters > div {
  display: flex;
  align-items: center;
}
 */

const FileFilters = ({
  dataTiers = [],
  dataAttributes = [],
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

  const tiers = DEFAULT_FILTER.concat(dataTiers);
  const attributes = DEFAULT_FILTER.concat(dataAttributes);

  //const [inputValue, setInputValue] = React.useState('');
  //const applySearch = debounce(onSearch, 500);
  return (
    <Typography variant="data" color="#151c3d">
      <div className={styles.fileFilters}>
        <div className={styles.dataSelectors}>
          Data Tier:{' '}
          <StyledSelect
            aria-label="Data Tier Select"
            options={dataTiers}
            value={searchParams.tier}
            onChange={onSelect('tier')}
            size="sm"
          />
          Attribute:{' '}
          <StyledSelect
            aria-label="Data Attribute Select"
            options={dataAttributes}
            value={searchParams.attribute}
            onChange={onSelect('attribute')}
            size="sm"
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
      </div>
    </Typography>
  );
};

export const generateFilter = (item: string): FilterSelect => ({
  content: startCase(item),
  value: item,
});

export default FileFilters;
