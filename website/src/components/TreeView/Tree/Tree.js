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

import * as React from 'react';
import styled from '@emotion/styled';
import TreeNode from './TreeNode';

const RootContainer = styled('ul')`
  padding-inline-start: 0;
  margin: 0;
`;

const StyledRootContainer = styled(RootContainer)`
  --line-height: ${({ lineHeight }) => lineHeight};
  --line-width: ${({ lineWidth }) => lineWidth};
  --line-color: ${({ lineColor }) => lineColor};
  --line-border-radius: ${({ lineBorderRadius }) => lineBorderRadius};
  --node-padding: ${({ nodePadding }) => nodePadding};
  --tree-line-height: var(--line-height, 20px);
  --tree-line-width: var(--line-width, 1px);
  --tree-line-color: var(--line-color, black);
  --tree-line-border-radius: var(--line-border-radius, 5px);
  --tree-node-padding: var(--node-padding, 5px);
  --arrow-width: 9px;
`;

const Tree = React.forwardRef(({ children, label, ...props }, ref) => {
  return (
    <StyledRootContainer {...props} ref={ref}>
      <TreeNode label={label}>{children}</TreeNode>
    </StyledRootContainer>
  );
});

export default React.memo(Tree);
