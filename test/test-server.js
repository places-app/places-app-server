const chai = require('chai');
const expect = chai.expect;
chai.should();
const test = require('../test.js');

describe('Test', () => {
  it('should return a number', () => {
    const num = 1;
    const number = test.test(num);
    number.should.be.a('number');
    expect(number).to.equal(num);
  });
});
