import React from 'react';
import Icon from '@icgc-argo/uikit/Icon';

const ComparisonFilters = ({ additions = 4, updates = 88, deletions = 33 }) => {
  return (
    <div>
      <Icon name="star" fill={'#00c79d'} width={'16px'} />
      {`${additions} new fields`}
      <Icon name="star" fill="#ec8f17" width={'16px'} />
      {`${updates} updated fields`}
      <Icon name="star" fill="#df1b42" width={'16px'} />
      {`${deletions} deleted fields`}
    </div>
  );
};

export default ComparisonFilters;
