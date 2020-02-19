const expect = require('chai').expect;
const fse = require('fs-extra');
const generateTreeData = require('./index');
const singleChildSchema = require('./testData/singleChildNodeSchema');
const singleChildTree = require('./testData/singleChildNodeTree');
const singleNodeSchema = require('./testData/singleNodeSchema');
const singleNodeTree = require('./testData/singleNodeTree');
const nestedChildSchema = require('./testData/nestedChildSchema');
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
  it('should generate tree data with a single child', async () => {
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
    const testTreeData = generateTreeData(nestedChildSchema);
    expect(nestedChildTree).to.eql(testTreeData);
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
