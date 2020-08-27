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
import { jsx, css } from '@emotion/core';
import HighlightedRegex from './HighlightedRegex';
import isEmpty from 'lodash/isEmpty';

export const RegexExamples = ({ regex, examples }) => {
  if (isEmpty(examples)) return null;
  return (
    <div>
      <br />
      <div>Examples:</div>
      <div>
        {examples.split(',').map((example, i) => {
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
};

const Regex = ({ regex, style }: { regex: string; style?: any }) => (
  <div
    css={css`
      margin-bottom: 5px;
      ${style}
    `}
  >
    <div>Values must meet the regular expression</div>
    <HighlightedRegex regex={regex} />
  </div>
);

export default Regex;
