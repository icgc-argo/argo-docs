import React from 'react';
import styles from './styles.module.css';
import HighlightedRegex from './HighlightedRegex';

const Regex = ({ regex, examples = [] }) => (
  <div className={styles.regexRestriction}>
    <div>Values must meet the regular expression</div>
    <HighlightedRegex regex={regex} />
    <br />
    <div>Examples:</div>
    <div>
      {/* need a max width */}
      {examples.map((example, i) => (
        <a href={''} key={i}>
          {`${example}${i < examples.length - 1 ? ', ' : null}`}
        </a>
      ))}
    </div>
  </div>
);

export default Regex;
