/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';
import Select from '@icgc-argo/uikit/form/Select';

/**
 * @param {function} onChange
 * @param {string[]} versions
 * @param {string} value
 */
const VersionSelect = ({ value, onChange, versions, style }) => {
  const options = versions.map((d) => ({ content: `Version ${d}`, value: d }));

  return (
    <form>
      <div
        css={css`
          width: 150px;
          ${style}
        `}
      >
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
