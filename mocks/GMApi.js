const fs = require('fs');
const root = require('../root.js');

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
      resolve(this.invalidRequest(id));
    }
  }

  isValidPath(fileName, id) {
    const path = root + `/mocks/data/${fileName}${id}.json`;

    return fs.existsSync(root + `/mocks/data/${fileName}${id}.json`)
      ? path
      : false;
  }

  invalidRequest(id) {
    return JSON.stringify({
      reason: `Vehicle id: ${id} not found.`,
      status: '404'
    });
  }
};
