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
      {examples.map((example, i) => {
        const uriRegex = encodeURIComponent(regex);
        const uriInput = encodeURIComponent(example);
        return (
          <a
            href={`http://www.regexplanet.com/advanced/xregexp/index.html?regex=${uriRegex}&input=${uriInput}`}
            target="_blank"
            key={i}
          >
            {`${example}${i < examples.length - 1 ? ', ' : ''}`}
          </a>
        );
      })}
    </div>
  </div>
);

export default Regex;
