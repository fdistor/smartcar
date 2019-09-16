const { expect } = require('chai');
const GMApi = require('../mocks/GMApi.js');

describe('GMApi class', () => {
  let gm;

  beforeEach(() => {
    gm = new GMApi();
  });

  it('Should exist', () => {
    expect(gm).to.exist;
  });

  it('Should initialize properties', () => {
    expect(gm.isEngineOn).to.be.true;
  });

  it('Should have methods', () => {
    expect(gm.getInfo).to.be.a('function');
    expect(gm.postEngine).to.be.a('function');
    expect(gm.readFileAndCompletePromise).to.be.a('function');
    expect(gm.isValidPath).to.be.a('function');
    expect(gm.invalidRequest).to.be.a('function');
  });
});
