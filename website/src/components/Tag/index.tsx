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

import React from 'react';
import TagComponent from '@icgc-argo/uikit/Tag';
import styles from './styles.module.css';

export enum Tag {
  required: 'required',
  conditional: 'conditional',
  core: 'core',
  id: 'id',
  extended: 'extended',
};

const Tag = ({ type }) => {
  switch (type) {
    case TAG_TYPES.required:
      return <TagComponent className={`${styles.tag} ${styles.required}`}>Required</TagComponent>;
    case TAG_TYPES.conditional:
      return (
        <TagComponent className={`${styles.tag} ${styles.conditional}`}>Conditional</TagComponent>
      );
    case TAG_TYPES.core:
      return <TagComponent className={`${styles.tag} ${styles.core}`}>Core</TagComponent>;
    case TAG_TYPES.id:
      return <TagComponent className={`${styles.tag} ${styles.id}`}>ID</TagComponent>;
    case TAG_TYPES.extended:
      return <TagComponent className={`${styles.tag} ${styles.extended}`}>Extended</TagComponent>;
    default:
      return null;
  }
};

const displayName = {
  
}

const Tag = ({ type }) => <TagComponent type={type}>{displayName[type]}</TagComponent>;

export default Tag;
