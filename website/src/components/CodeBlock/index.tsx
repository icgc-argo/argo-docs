/*
 * Copyright (c) 2020 The Ontario Institute for Cancer Research. All rights reserved
 *
 * This program and the accompanying materials are made available under the terms of the GNU Affero General Public License v3.0.
 * You should have received a copy of the GNU Affero General Public License along with
 * this program. If not, see <http://www.gnu.org/licenses/>.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 *
 */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import Highlight, { defaultProps } from 'prism-react-renderer';
import defaultTheme from './default';
import styles from './styles.module.css';
import { css } from '@emotion/core';
import codeDeleted from './deletedTheme';

const exampleCode = `function validate() {\r\n  var result = { valid: true, message: \"only required if on post_therapy_tumour_staging_system is AJCC\" };
\r\n  return result;\r\n}\r\n\r\nvalidate()`;

/**
 * Based off @theme/Codeblock
 */

const CodeBlock = ({
  codes,
  className,
  prismTheme = null,
}: {
  codes: string[];
  className?: any;
  prismTheme?: any;
}) => {
  return (
    <div className={className}>
      {codes.map((code) => (
        <div
          css={css`
            margin-bottom: 10px;
          `}
        >
          <Highlight
            {...defaultProps}
            code={code}
            language="javascript"
            theme={prismTheme || defaultTheme}
          >
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre className={`${className} ${styles.code}`} style={style}>
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
      ))}
    </div>
  );
};

export const CompareCodeBlock = ({
  left,
  right,
}: {
  left: string[] | null;
  right: string[] | null;
}) => (
  <div
    css={css`
      display: flex;
      flex-direction: row;
      align-items: center;
    `}
  >
    {left && (
      <CodeBlock
        codes={left}
        css={css`
          margin-right: 8px;
        `}
        prismTheme={codeDeleted}
      />
    )}
    {right && <CodeBlock codes={right} prismTheme={defaultTheme} />}
  </div>
);

export default CodeBlock;
