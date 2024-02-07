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
  const options = versions.map((v) => ({
    content: `Version ${v.version} (${v.date.substring(0, 10)})`,
    value: v.version,
  }));

  return (
    <form>
      <div
        css={css`
          width: 230px;
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
