const GMApi = require('../mocks/GMApi.js');
const gm = new GMApi();

const getStatusAndInfo = async (req, fileName) => {
  const { id } = req.params;
  const result = await gm.getInfo(fileName, id);
  return JSON.parse(result);
};

const respondOn404 = (res, { reason }) => {
  res.status(404).send({ reason });
};

const wrapAsync = func => (req, res, next) =>
  func(req, res, next).catch(() =>
    next(new Error('Error in fetching from the GM API'))
  );

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
