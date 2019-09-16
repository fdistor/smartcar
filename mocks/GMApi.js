const fs = require('fs');

module.exports = class GMApi {
  getVehicleInfo(id) {
    return new Promise((resolve, reject) => {
      fs.readFile(
        __dirname + '/./data/vehicleInfo.json',
        'utf8',
        (err, data) => {
          if (err) reject(err);

          const parsed = JSON.parse(data);
          resolve(data);
        }
      );
    });
  }

  getSecurity() {
    fs.readFile(__dirname + '/./data/security.json', 'utf8', (err, data) => {
      if (err) return new Error(err);

      return data;
    });
  }

  getFuel() {
    fs.readFile(__dirname + '/./data/fuel.json', 'utf8', (err, data) => {
      if (err) return new Error(err);

      return data;
    });
  }

  getEngine() {
    fs.readFile(__dirname + '/./data/engine.json', 'utf8', (err, data) => {
      if (err) return new Error(err);

      return data;
    });
  }
};
