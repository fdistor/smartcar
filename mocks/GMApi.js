const fs = require('fs');

module.exports = class GMApi {
  constructor() {
    this.isEngineOn = true;
  }

  getInfo(fileName, id) {
    return new Promise((resolve, reject) => {
      const path = this.isValidPath(fileName, id);

      this.readFileAndCompletePromise(path, id, resolve, reject);
    });
  }

  postEngine(fileName, id, action) {
    return new Promise((resolve, reject) => {
      let target;

      if (
        (this.isEngineOn && action === 'START_VEHICLE') ||
        (!this.isEngineOn && action === 'STOP_VEHICLE')
      ) {
        target = fileName + 'Fail';
      } else {
        target = fileName + 'Success';
      }

      const path = this.isValidPath(target, id);

      this.readFileAndCompletePromise(path, id, resolve, reject);
    });
  }

  readFileAndCompletePromise(path, id, resolve, reject) {
    if (path) {
      fs.readFile(path, 'utf8', (err, data) => {
        if (err) reject(err);

        resolve(data);
      });
    } else {
      resolve(this.badRequest(id));
    }
  }

  isValidPath(fileName, id) {
    const path = __dirname + `/./data/${fileName}${id}.json`;

    return fs.existsSync(__dirname + `/./data/${fileName}${id}.json`)
      ? path
      : false;
  }

  badRequest(id) {
    return JSON.stringify({
      reason: `Vehicle id: ${id} not found.`,
      status: '404'
    });
  }
};
