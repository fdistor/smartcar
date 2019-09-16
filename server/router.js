const GMApi = require('../mocks/GMApi.js');
const gm = new GMApi();

const getStatusAndInfo = async (req, fileName) => {
  const { id } = req.params;
  const result = await gm.getInfo(fileName, id);
  return JSON.parse(result);
};

module.exports = {
  getVehicleInfo: async (req, res) => {
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
      res.send(parsed);
    }
  },

  getSecurity: async (req, res) => {
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
      res.status(404).send(parsed);
    }
  },

  getFuel: async (req, res) => {},

  getBattery: async (req, res) => {},

  startEngine: async (req, res) => {}
};
