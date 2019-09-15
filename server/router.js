module.exports = {
  getVehicleInfo: async (req, res) => {
    const { id } = req.params;
    const GMVehicleResult = await fs.readFile('../mocks/vehicleInfo.json');

    res.status(200).send(GMVehicleResult);
  }
};
