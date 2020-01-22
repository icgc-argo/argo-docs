import React from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import defaultTheme from 'prism-react-renderer/themes/palenight';

const exampleCode = `function validate() {\r\n  var result = { valid: true, message: \"only required if on post_therapy_tumour_staging_system is AJCC\" };
\r\n  return result;\r\n}\r\n\r\nvalidate()`;

const CodeBlock = ({ code }) => (
  <Highlight {...defaultProps} code={exampleCode} language="js" theme={defaultTheme}>
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <pre className={className} style={style}>
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
);
export default CodeBlock;
