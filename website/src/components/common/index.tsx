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
import React from 'react';
import Icon from '@icgc-argo/uikit/Icon';
import Tooltip from '@icgc-argo/uikit/Tooltip';
import { css } from '@emotion/core';

export const DownloadIcon = ({ disabled }) => (
  <Icon
    name="download"
    fill={disabled ? 'white' : 'accent2_dark'}
    height="12px"
    style={{
      marginRight: '5px',
    }}
  />
);

export const DownloadButtonContent = ({
  children,
  disabled,
}: {
  children: React.ReactNode;
  disabled?: boolean;
}) => (
  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
    <DownloadIcon disabled={disabled} />
    {children}
  </div>
);

export const DownloadTooltip = ({ children, disabled }) => (
  <Tooltip
    disabled={disabled}
    html={<span>Please select latest schema version to download templates</span>}
  >
    {children}
  </Tooltip>
);

export const Display = ({
  children,
  visible,
  visibleStyle = css`
    display: block;
  `,
}: {
  children: React.ReactNode;
  visible: boolean;
  visibleStyle?: any;
}) => (
  <div
    css={css`
      display: none;
      ${visible ? visibleStyle : null}
    `}
  >
    {children}
  </div>
);
