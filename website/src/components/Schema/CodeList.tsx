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
import Icon from '@icgc-argo/uikit/Icon';
import styles from './styles.module.css';
import { DiffTextSegment } from './DiffText';
import { ChangeType } from '../../../types';

const ToggleMore = ({ children, onToggle }) => (
  <div
    className={styles.toggleMore}
    onClick={() => {
      onToggle();
    }}
  >
    {children}
  </div>
);

export const Code = ({ code, format }: { code: string; format: ChangeType | null }) => (
  <div
    key={code}
    css={css`
      font-size: 12px;
    `}
  >
    <strong>{format ? <DiffTextSegment type={format}>{code}</DiffTextSegment> : code}</strong>
  </div>
);

const CodeList = ({
  codeList = [],
  onToggle,
  isExpanded,
}: {
  codeList: string[];
  onToggle: any;
  isExpanded: boolean;
}) => {
  const maxEnumLength = 5;

  const fullOutput = codeList.map((code) => <Code key={code} code={code} format={null} />);

  return (
    <div className={styles.codeList}>
      {fullOutput.length <= maxEnumLength ? (
        <div>{fullOutput}</div>
      ) : !isExpanded ? (
        <div>
          {[...fullOutput.slice(0, maxEnumLength)]}
          <ToggleMore onToggle={onToggle}>
            {fullOutput.length - maxEnumLength} more
            <Icon name="chevron_down" height="8" width="8" fill="#7f55cc" />
          </ToggleMore>
        </div>
      ) : (
        <div>
          {fullOutput}
          <ToggleMore onToggle={onToggle}>
            Show less
            <Icon name="chevron_up" height="8" width="8" fill="#7f55cc" />
          </ToggleMore>
        </div>
      )}
    </div>
  );
};

export default CodeList;
