const expect = require('chai').expect;
const generateTreeData = require('./index');
const singleChildSchema = require('./testData/singleChildNodeSchema');
const singleChildTree = require('./testData/singleChildNodeTree');
const singleNodeSchema = require('./testData/singleNodeSchema');
const singleNodeTree = require('./testData/singleNodeTree');
const nestedChildSchema = require('./testData/nestedChildSchema');
const nestedChildTree = require('./testData/nestedChildTree');

describe('Tree Data', () => {
  it('should generate for a single node', () => {
    const testTreeData = generateTreeData(singleNodeSchema);
    expect(singleNodeTree).to.eql(testTreeData);
  });
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
  xit('should generate data with multiple nested children', () => {});
});
