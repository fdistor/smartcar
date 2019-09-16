const fs = require('fs');

module.exports = class GMApi {
  getVehicleInfo(id) {
    return new Promise((resolve, reject) => {
      const path = this.isValidPath('vehicleInfo', id);

      if (path) {
        fs.readFile(path, 'utf8', (err, data) => {
          if (err) reject(err);

          resolve(data);
        });
      } else {
        const status = '404';
        const reason = `Vehicle id: ${id} not found.`;

        resolve(JSON.stringify({ status, reason }));
      }
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

  isValidPath(fileName, id) {
    const path = __dirname + `/./data/${fileName}${id}.json`;

    return fs.existsSync(__dirname + `/./data/${fileName}${id}.json`)
      ? path
      : false;
  }
};
