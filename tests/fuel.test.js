const { expect } = require('chai');
const sinon = require('sinon');
const router = require('../server/router');

describe('Fuel endpoint', () => {
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

    await router.getFuel(req1234, res);

    expect(res.status.getCall(0).args[0]).to.equal(200);
    expect(res.send.getCall(0).args[0]).to.deep.equal({
      percent: 84.15
    });

    await router.getFuel(req1235, res);

    expect(res.status.getCall(1).args[0]).to.equal(200);
    expect(res.send.getCall(1).args[0]).to.deep.equal({
      percent: null
    });
  });

  it('Should return status 404 on invalid vehicle id', async () => {
    const req = { params: { id: 1236 } };

    await router.getFuel(req, res);

    expect(res.status.getCall(0).args[0]).to.equal(404);
    expect(res.send.getCall(0).args[0]).to.deep.equal({
      reason: 'Vehicle id: 1236 not found.'
    });
  });
});
