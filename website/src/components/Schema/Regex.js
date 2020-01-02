import React from 'react';
import styles from './styles.module.css';
import HighlightedRegex from './HighlightedRegex';

const Regex = ({ regex }) => {
  return (
    <div className={styles.regexRestriction}>
      <div>Values must meet the regular expression</div>
      <HighlightedRegex regex={regex} />
      <br />
      <div>Examples:</div>
      <div>
        {[{ name: 'PACA-AU', link: '' }].map(({ name, link }, i) => (
          <a href={link}>{name}</a>
        ))}
      </div>
    </div>
  );
};

export default Regex;
