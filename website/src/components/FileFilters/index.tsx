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
import get from 'lodash/get';
import flattenDeep from 'lodash/flattenDeep';
import uniq from 'lodash/uniq';
import { TagVariant } from '../../components/Tag';
import { Schema, ChangeType, Field } from '../../../types';

export const NO_ACTIVE_FILTER: string = 'no_active_filter';
export const DEFAULT_FILTER: FilterSelect = { content: 'All', value: NO_ACTIVE_FILTER };

const FileFilters = ({
  tiers = [],
  attributes = [],
  comparisons = [],
  searchParams = {},
  isDiffShowing,
  onFilter,
}: {
  tiers: Array<FilterSelect>;
  attributes: Array<FilterSelect>;
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
          options={[DEFAULT_FILTER, ...tiers]}
          value={searchParams.tier}
          onChange={onSelect('tier')}
        />

        <Filter
          label="Attribute"
          ariaLabel="Data Attribute Select"
          options={[DEFAULT_FILTER, ...attributes]}
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

export const createFilters = (schemas: Schema[]) => {
  const fields = schemas.map((schema) => schema.fields);

  const filters = flattenDeep(fields).reduce(
    (filters, field) => {
      const primaryId = get(field, 'meta.primaryId');
      const core = get(field, 'meta.core');
      const dependsOn = get(field, 'meta.dependsOn');
      const restrictions = get(field, 'restrictions', false);
      const changeType = field.changeType;

      if (primaryId) {
        filters.tiers.push(TagVariant.ID);
      }

      if (!!restrictions) {
        filters.attributes.push(TagVariant.REQUIRED);
      }

      if (dependsOn) {
        filters.attributes.push(TagVariant.CONDITIONAL);
      }

      if (core) {
        filters.tiers.push(TagVariant.CORE);
      }

      if (!core && !primaryId) {
        filters.tiers.push(TagVariant.EXTENDED);
      }

      filters.comparison.push(changeType);

      return filters;
    },
    { tiers: [], attributes: [], comparison: [] },
  );
  return {
    tiers: uniq(filters.tiers),
    attributes: uniq(filters.attributes),
    // comparison type NONE already accounted for in default filter
    comparison: uniq(filters.comparison)
      .filter((f) => f !== ChangeType.NONE)
      // filter out undefined comparison value
      .filter(Boolean),
  };
};

export const comparisonFilter = (comparison: ChangeType) => (field: Field) => {
  if (comparison === NO_ACTIVE_FILTER) return true;

  return field.changeType === comparison;
};

export const attributeFilter = (attribute) => (field: Field) => {
  if (attribute === NO_ACTIVE_FILTER) return true;
  const required = get(field, 'restrictions.required', false);
  const dependsOn = get(field, 'meta.dependsOn', false);

  return (
    (attribute === TagVariant.CONDITIONAL && Boolean(dependsOn)) ||
    (attribute === TagVariant.REQUIRED && required) ||
    false
  );
};

export const tierFilter = (tier) => (field: Field) => {
  if (tier === NO_ACTIVE_FILTER) return true;

  const primaryId = get(field, 'meta.primaryId', false);
  const core = get(field, 'meta.core', false);

  return (
    (tier === TagVariant.ID && primaryId) ||
    (tier === TagVariant.CORE && core) ||
    (tier === TagVariant.EXTENDED && !core && !primaryId) ||
    false
  );
};

export const defaultSearchParams = {
  tier: DEFAULT_FILTER.value,
  attribute: DEFAULT_FILTER.value,
  comparison: DEFAULT_FILTER.value,
};

export default FileFilters;
