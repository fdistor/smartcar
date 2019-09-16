const { expect } = require('chai');
const sinon = require('sinon');
const router = require('../server/router');

describe('Engine endpoint', () => {
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
    const actionStart = { body: { action: 'START' } };
    const actionStop = { body: { action: 'STOP' } };

    const id = { params: { id: 1234 } };

    const reqStart = { ...actionStart, ...id };
    const reqStop = { ...actionStop, ...id };

    await router.postEngine(reqStart, res);

    expect(res.status.getCall(0).args[0]).to.equal(200);
    expect(res.send.getCall(0).args[0]).to.deep.equal({
      status: 'error'
    });

    await router.postEngine(reqStop, res);

    expect(res.status.getCall(1).args[0]).to.equal(200);
    expect(res.send.getCall(1).args[0]).to.deep.equal({
      status: 'success'
    });
  });

  it('Should return status 404 on invalid vehicle id', async () => {
    const req = { body: { action: 'START' }, params: { id: 1236 } };

    await router.postEngine(req, res);

    expect(res.status.getCall(0).args[0]).to.equal(404);
    expect(res.send.getCall(0).args[0]).to.deep.equal({
      reason: 'Vehicle id: 1236 not found.'
    });
  });

  it('Should return status 400 on invalid action', async () => {
    const req = { body: { action: 'WAIT' }, params: { id: 1234 } };

    await router.postEngine(req, res);

    expect(res.status.getCall(0).args[0]).to.equal(400);
    expect(res.send.getCall(0).args[0]).to.deep.equal({
      reason: 'Bad request, invalid action.'
    });
  });

  it("Should return status 400 on missing key 'action'", async () => {
    const req = { body: { start: 'START' }, params: { id: 1234 } };

    await router.postEngine(req, res);

    expect(res.status.getCall(0).args[0]).to.equal(400);
    expect(res.send.getCall(0).args[0]).to.deep.equal({
      reason: "Bad request, missing key 'action'."
    });
  });
});
