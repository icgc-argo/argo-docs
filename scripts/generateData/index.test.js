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

const expect = require('chai').expect;
const fse = require('fs-extra');
const generateTreeData = require('./index');
const singleChildSchema = require('./testData/singleChildNodeSchema');
const singleChildTree = require('./testData/singleChildNodeTree');
const singleNodeSchema = require('./testData/singleNodeSchema');
const singleNodeTree = require('./testData/singleNodeTree');
const nestedChildSchema = require('./testData/nestedChildSchema');
const nestedChildUnorderSchema = require('./testData/nestedChildUnorderSchema');
const nestedChildTree = require('./testData/nestedChildTree');
const nestedSiblingSchema = require('./testData/nestedSiblingSchema');
const nestedSiblingTree = require('./testData/nestedSiblingTree');

const writeFile = async (name = 'temp', data) =>
  await fse.writeJson(`./generateData/temp/${name}.json`, data);

describe('Tree Data', () => {
  /**
   * Example:
   *
   * - root
   */
  it('should generate for a single node', () => {
    const testTreeData = generateTreeData(singleNodeSchema);
    expect(singleNodeTree).to.eql(testTreeData);
  });
  /**
   * Example:
   *
   * - root
   * -- child
   */
  it('should generate tree data with a single child', () => {
    const testTreeData = generateTreeData(singleChildSchema);
    expect(singleChildTree).to.eql(testTreeData);
  });
  /**
   * Example:
   *
   * - root
   * -- child
   * --- child
   * ---- child
   */
  it('should generate data with single nested children', () => {
    const testTreeData1 = generateTreeData(nestedChildSchema);
    const testTreeData2 = generateTreeData(nestedChildUnorderSchema);
    expect(nestedChildTree).to.eql(testTreeData1) && expect(nestedChildTree).to.eql(testTreeData2);
  });
  /**
   * Example:
   *
   * - root
   * -- child
   * --- child
   * -- child
   * --- child
   */
  it('should generate data with multiple nested siblings', () => {
    const testTreeData = generateTreeData(nestedSiblingSchema);
    expect(nestedSiblingTree).to.eql(testTreeData);
  });
});
