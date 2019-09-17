const GMApi = require('../mocks/GMApi.js');
const gm = new GMApi();

/**
 * Parses params of the `req` for vehicle id and mimics querying the GM API.
 *
 * @param {Object} req - request from client
 * @param {String} fileName - leading name of file, mimics endpoint of GM API
 * @returns {Object} - details of vehicle if valid id or invalid request
 */
const getStatusAndInfo = async (req, fileName) => {
  const { id } = req.params;
  const result = await gm.getInfo(fileName, id);
  return JSON.parse(result);
};

/**
 * Respond to client with 404 due to invalid vehicle id.
 *
 * @param {Object} res - response to the client
 * @param {String} reason - reason on 404 response from GM api
 */
const respondOn404 = (res, { reason }) => {
  res.status(404).send({ reason });
};

/**
 * Returns a function that invokes `req`, `res`, `next` in the parameter `func`.
 *
 * Since `func` returns a promise, if it errors, it will be caught and `next` will be invoked.
 *
 * This ensures Express error handlers are called if the asynchronous code fails, in this case
 * if the GM API fails to respond or errors.
 *
 * @param {Function} func - function that must return a promise
 */
const wrapAsync = func => (req, res, next) => func(req, res, next).catch(next);

module.exports = {
  getVehicleInfo: wrapAsync(async (req, res) => {
    const parsed = await getStatusAndInfo(req, 'vehicleInfo');
    const { status } = parsed;

    if (status === '200') {
      const { data } = parsed;
      const color = data.color.value;
      const driveTrain = data.driveTrain.value;
      const vin = data.vin.value;
      const doorCount = data.fourDoorSedan.value === 'True' ? 4 : 2;

      res.status(200).send({
        color,
        driveTrain,
        vin,
        doorCount
      });
    } else {
      respondOn404(res, parsed);
    }
  }),

  getSecurity: wrapAsync(async (req, res) => {
    const parsed = await getStatusAndInfo(req, 'security');
    const { status } = parsed;

    if (status === '200') {
      const { values } = parsed.data.doors;
      const result = [];

      values.forEach(door => {
        const location = door.location.value;
        const locked = door.locked.value === 'True' ? true : false;
        result.push({ location, locked });
      });

      res.status(200).send(result);
    } else {
      respondOn404(res, parsed);
    }
  }),

  getFuel: wrapAsync(async (req, res) => {
    const parsed = await getStatusAndInfo(req, 'energyLevel');
    const { status } = parsed;

    if (status === '200') {
      res.status(200);

      const { tankLevel } = parsed.data;
      const percent =
        tankLevel.type === 'Number' ? Number(tankLevel.value) : null;

      res.send({ percent });
    } else {
      respondOn404(res, parsed);
    }
  }),

  getBattery: wrapAsync(async (req, res) => {
    const parsed = await getStatusAndInfo(req, 'energyLevel');
    const { status } = parsed;

    if (status === '200') {
      res.status(200);

      const { batteryLevel } = parsed.data;
      const percent =
        batteryLevel.type === 'Number' ? Number(batteryLevel.value) : null;

      res.send({ percent });
    } else {
      respondOn404(res, parsed);
    }
  }),

  postEngine: wrapAsync(async (req, res) => {
    const { id } = req.params;

    if (req.body.action) {
      const { action } = req.body;
      let command;

      if (action === 'START') command = 'START_VEHICLE';
      else if (action === 'STOP') command = 'STOP_VEHICLE';
      else
        return res.status(400).send({ reason: 'Bad request, invalid action.' });

      const result = await gm.postEngine('engine', id, command);
      const parsed = JSON.parse(result);
      const { status } = parsed;

      if (status === '200') {
        const { status } = parsed.actionResult;
        const reformatted = status === 'EXECUTED' ? 'success' : 'error';

        res.status(200).send({ status: reformatted });
      } else {
        respondOn404(res, parsed);
      }
    } else {
      res.status(400).send({ reason: "Bad request, missing key 'action'." });
    }
  })
};
