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
