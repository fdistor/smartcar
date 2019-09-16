const { expect } = require('chai');
const GMApi = require('../mocks/GMApi.js');
const root = require('../root.js');

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

    expect(path).to.equal(`${root}/mocks/data/vehicleInfo1234.json`);
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

  it('Should return the contents of a file if valid path', async () => {
    const path = gm.isValidPath('vehicleInfo', 1234);
    const promise = await new Promise((resolve, reject) => {
      gm.readFileAndCompletePromise(path, null, resolve, reject);
    });
    const actual = JSON.parse(promise);
    const expected = {
      service: 'getVehicleInfo',
      status: '200',
      data: {
        vin: {
          type: 'String',
          value: '123123412412'
        },
        color: {
          type: 'String',
          value: 'Metallic Silver'
        },
        fourDoorSedan: {
          type: 'Boolean',
          value: 'True'
        },
        twoDoorCoupe: {
          type: 'Boolean',
          value: 'False'
        },
        driveTrain: {
          type: 'String',
          value: 'v8'
        }
      }
    };

    expect(actual).to.deep.equal(expected);
  });

  it('Should return an invalid request object if invalid path', async () => {
    const path = gm.isValidPath('I am invalid and so is my life');
    const promise = await new Promise((resolve, reject) => {
      gm.readFileAndCompletePromise(path, 1234, resolve, reject);
    });
    const actual = JSON.parse(promise);
    const expected = {
      reason: 'Vehicle id: 1234 not found.',
      status: '404'
    };

    expect(actual).to.deep.equal(expected);
  });

  it('Should get info from a path or return invalid object', async () => {
    const fileName = 'energyLevel';
    const valId = 1234;
    const invalId = 1236;

    const rawValid = await gm.getInfo(fileName, valId);
    const rawInvalid = await gm.getInfo(fileName, invalId);

    const actualValid = JSON.parse(rawValid);
    const actualInvalid = JSON.parse(rawInvalid);

    const expectedValid = {
      service: 'getEnergy',
      status: '200',
      data: {
        tankLevel: {
          type: 'Number',
          value: '84.15'
        },
        batteryLevel: {
          type: 'Null',
          value: 'null'
        }
      }
    };
    const expectedInvalid = {
      reason: `Vehicle id: 1236 not found.`,
      status: '404'
    };

    expect(actualValid).to.deep.equal(expectedValid);
    expect(actualInvalid).to.deep.equal(expectedInvalid);
  });

  it('Should turn the engine on or off or return invalid object', async () => {
    const fileName = 'engine';
    const valId = 1234;
    const invalId = 2136;
    const start = 'START_VEHICLE';
    const stop = 'STOP_VEHICLE';

    gm.isEngineOn = true;

    const rawStartFail = await gm.postEngine(fileName, valId, start);
    const actualStartFail = JSON.parse(rawStartFail);
    const expectedStartFail = {
      service: 'actionEngine',
      status: '200',
      actionResult: {
        status: 'FAILED'
      }
    };

    expect(actualStartFail).to.deep.equal(expectedStartFail);

    const rawStopSuccess = await gm.postEngine(fileName, valId, stop);
    const actualStopSuccess = JSON.parse(rawStopSuccess);
    const expectedStopSuccess = {
      service: 'actionEngine',
      status: '200',
      actionResult: {
        status: 'EXECUTED'
      }
    };

    expect(actualStopSuccess).to.deep.equal(expectedStopSuccess);

    const rawInvalid = await gm.postEngine(fileName, invalId, start);
    const actualInvalid = JSON.parse(rawInvalid);
    const expectedInvalid = {
      reason: `Vehicle id: 2136 not found.`,
      status: '404'
    };

    expect(actualInvalid).to.deep.equal(expectedInvalid);
  });
});
