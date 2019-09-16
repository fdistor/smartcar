const GMApi = require('../mocks/GMApi.js');
const gm = new GMApi();

module.exports = {
  getVehicleInfo: async (req, res) => {
    const { id } = req.params;
    const result = await gm.getInfo('vehicleInfo', id);
    const parsed = JSON.parse(result);
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

  getSecurity: async (req, res) => {},

  getFuel: async (req, res) => {},

  getBattery: async (req, res) => {},

  startEngine: async (req, res) => {}
};
