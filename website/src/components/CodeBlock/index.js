import React, { useState, useRef, useEffect } from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import defaultTheme from 'prism-react-renderer/themes/palenight';
import Clipboard from 'clipboard';
import Button from '@icgc-argo/uikit/Button';
import styles from './styles.module.css';

const exampleCode = `function validate() {\r\n  var result = { valid: true, message: \"only required if on post_therapy_tumour_staging_system is AJCC\" };
\r\n  return result;\r\n}\r\n\r\nvalidate()`;

/**
 * Based off @theme/Codeblock
 */

const CodeBlock = ({ code }) => {
  const [showCopied, setShowCopied] = useState(false);
  const copyTarget = useRef(null);
  const copyButton = useRef(null);

  useEffect(() => {
    let clipboard;

    if (copyButton.current) {
      clipboard = new Clipboard(copyButton.current, {
        target: () => copyTarget.current,
      });
    }

    return () => {
      if (clipboard) {
        clipboard.destroy();
      }
    };
  }, [copyButton.current, copyTarget.current]);

  const handleCopyCode = () => {
    window.getSelection().empty();
    setShowCopied(true);
    setTimeout(() => {
      copyButton.current.blur();
      setShowCopied(false);
    }, 2000);
  };

  return (
    <div>
      <div className={styles.copyButton}>
        <Button size="sm" variant="secondary" onClick={() => handleCopyCode()} ref={copyButton}>
          {showCopied ? 'Copied' : 'Copy'}
        </Button>
      </div>
      <Highlight {...defaultProps} code={code} language="js" theme={defaultTheme}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={`${className} ${styles.code}`} style={style} ref={copyTarget}>
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
};

export default CodeBlock;
