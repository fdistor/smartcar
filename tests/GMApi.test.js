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

describe('GMApi functionality', () => {
  let gm;

  beforeEach(() => {
    gm = new GMApi();
  });

  it('Should return complete file path if valid file', () => {
    const path = gm.isValidPath('vehicleInfo', 1234);

    expect(path).to.be.a('string');
  });

  it('Should return false if invalid file', () => {
    const path = gm.isValidPath('vehicleInfo', 1236);

    expect(path).to.be.false;
  });

  it('Should return a JSON object', () => {
    const json = gm.invalidRequest(1236);

    expect(json).to.deep.equal(
      JSON.stringify({ reason: 'Vehicle id: 1236 not found.', status: '404' })
    );
  });
  it('Should', () => {});
  it('Should', () => {});
});
