const expect = require('chai').expect;
const generateTreeData = require('./index');
const sampleSchemaData = require('./testData/singleChildNodeSchema');
const sampleTreeData = require('./testData/singleChildNodeTree');
const singleNodeSchema = require('./testData/singleNodeSchema');
const singleNodeTree = require('./testData/singleNodeTree');

describe('Tree Data', () => {
  it('should generate for a single node', () => {
    const testTreeData = generateTreeData(singleNodeSchema);
    expect(singleNodeTree).to.eql(testTreeData);
  });
  it('should generate tree data with a single child', () => {
    const testTreeData = generateTreeData(sampleSchemaData);
    expect(sampleTreeData).to.eql(testTreeData);
  });
  xit('should generate data with single nested children', () => {});
  xit('should generate data with multiple nested children', () => {});
});
