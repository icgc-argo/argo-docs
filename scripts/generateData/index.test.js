const expect = require('chai').expect;
const generateTreeData = require('./index');
const sampleSchemaData = require('./testData/input_0');
const sampleTreeData = require('./testData/output_0');

describe('Tree Data', function() {
  it('should generate tree data', function() {
    const testTreeData = generateTreeData(sampleSchemaData);
    expect(sampleTreeData).to.eql(testTreeData);
  });
});
