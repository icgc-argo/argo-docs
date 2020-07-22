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

export const NO_ACTIVE_FILTER = 'no_active_filter';
export const DEFAULT_FILTER = [{ content: 'All', value: NO_ACTIVE_FILTER }];

const StyledSelect = styled(Select)`
  min-width: 190px;
`;

const FileFilters = ({
  dataTiers = [],
  dataAttributes = [],
  searchParams = {},
  onSearch = e => console.log(e.target.val),
}) => {
  // update search params
  const onSelect = filterName => value => onSearch({ ...searchParams, ...{ [filterName]: value } });

  const [inputValue, setInputValue] = React.useState('');
  const applySearch = debounce(onSearch, 500);
  return (
    <Typography variant="data" color="#151c3d">
      <div className={styles.fileFilters}>
        <div className={styles.dataSelectors}>
          Data Tier:{' '}
          <StyledSelect
            options={dataTiers}
            value={searchParams.tier}
            onChange={onSelect('tier')}
            size="sm"
          />
          Attribute:{' '}
          <StyledSelect
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

export default FileFilters;
