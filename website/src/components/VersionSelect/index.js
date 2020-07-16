import React from 'react';
import Select from '@icgc-argo/uikit/form/Select';

/**
 * @param {function} onChange
 * @param {string[]} versions
 * @param {string} value
 */
const VersionSelect = ({ value, onChange, versions }) => {
  const options = versions.map((d) => ({ content: `Version ${d}`, value: d }));

  return (
    <form>
      <div style={{ width: '150px', marginRight: '10px' }}>
        <Select
          aria-label="version-select"
          onChange={(val) => onChange(val)}
          value={value}
          options={options}
        />
      </div>
    </form>
  );
};

export default VersionSelect;
