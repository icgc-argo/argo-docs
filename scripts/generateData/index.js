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

const chalk = require('chalk');
const get = require('lodash/get');

/**
 * Generates tree structure for tree viz
 * Two pass to account for random order
 * Generates objects in first pass
 * Maps objects in second pass
 */
function generateTreeData(data) {
  const schemas = get(data, 'schemas', []);

  const mapping = schemas.reduce((mapp, schema) => {
    const { name, fields: schemaFields, required = false } = schema;
    const parentName = get(schema, 'meta.parent', '');
    const fields = schemaFields.map(field => ({
      name: field.name,
      required: get(field, 'restrictions.required', false),
    }));
    mapp[schema.name] = { name, fields, required, parentName, children: [] };
    return mapp;
  }, {});

  const tree = schemas.reduce((tree, schema) => {
    const mappedEl = mapping[schema.name];
    const parentName = mappedEl.parentName;

    if (parentName) {
      mapping[parentName]['children'].push(mappedEl);
    } else {
      return { ...tree, ...mappedEl };
    }
    return tree;
  }, {});

  return tree;
}

module.exports = generateTreeData;
