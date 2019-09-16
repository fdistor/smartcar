const { expect } = require('chai');
const sinon = require('sinon');
const router = require('../server/router.js');

describe('Vehicle Info endpoint', () => {
  let res;

  beforeEach(() => {
    res = {};

    res.status = sinon.stub().returns(res);
    res.send = sinon.stub().returns(res);
  });

  afterEach(() => {
    res.status.resetHistory();
    res.send.resetHistory();
  });

  it('Should reformat data on valid vehicle id', async () => {
    const req1234 = { params: { id: 1234 } };
    const req1235 = { params: { id: 1235 } };

    const res1234 = { ...res };
    const res1235 = { ...res };

    await router.getVehicleInfo(req1234, res1234);
    await router.getVehicleInfo(req1235, res1235);

    expect(res1234.status.calledWith(200)).to.be.true;
    expect(
      res1234.send.calledWith({
        vin: '123123412412',
        color: 'Metallic Silver',
        doorCount: 4,
        driveTrain: 'v8'
      })
    ).to.be.true;

    expect(res1235.status.calledWith(200)).to.be.true;
    expect(
      res1235.send.calledWith({
        vin: '1235AZ91XP',
        color: 'Forest Green',
        doorCount: 2,
        driveTrain: 'electric'
      })
    ).to.be.true;
  });

  it('Should return status 404 on invalid vehicle id', async () => {
    const req = { params: { id: 1236 } };

    res.reason = sinon.stub().returns(res);

    await router.getVehicleInfo(req, res);

    expect(res.status.calledWith(404));
    expect(
      res.reason.calledWith({
        reason: 'Vehicle id: 1236 not found.',
        status: 404
      })
    );
  });
});
