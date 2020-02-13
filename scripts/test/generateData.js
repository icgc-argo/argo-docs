const expect = require('chai').expect;
const { generateTreeData } = require('../generateData');
const sampleSchemaData = require('./data/schemaData');
const sampleTreeData = require('./data/tree');

describe('Tree Data', function() {
  it('should generate tree data', function() {
    const testTreeData = generateTreeData(sampleSchemaData);
    expect(sampleTreeData).to.eql(testTreeData);
  });
});
