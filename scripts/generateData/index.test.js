const expect = require('chai').expect;
const generateTreeData = require('./index');
const sampleSchemaData = require('./testData/input_0');
const sampleTreeData = require('./testData/output_0');
const singleNodeSchema = require('./testData/singleNodeSchema');
const singleNodeTree = require('./testData/singleNodeTree');

describe('Tree Data', () => {
  it('should generate for a single node', () => {
    const testTreeData = generateTreeData(singleNodeSchema);
    expect(singleNodeTree).to.eql(testTreeData);
  });
  it('should generate tree data', () => {
    const testTreeData = generateTreeData(sampleSchemaData);
    expect(sampleTreeData).to.eql(testTreeData);
  });
});
