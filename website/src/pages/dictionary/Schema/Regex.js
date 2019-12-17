import React from 'react';
import RegexColorize from 'regex-colorize';
import 'regex-colorize/themes/nobg.css'; // If you import a css file in your library
import styles from './styles.module.css';

const Regex = ({ regex }) => {
  const rgx = new RegexColorize();
  rgx.colorizeAll();

  return (
    <div className={styles.regexRestriction}>
      <div>Values must meet the regular expression</div>
      <div className={`${styles.regex} regex`}>{regex}</div>
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
