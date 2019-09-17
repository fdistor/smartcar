const fs = require('fs');
const root = require('../root.js');

module.exports = class GMApi {
  /**
   * @property {Boolean} - determines if `this.postEngine` reads the success or fail file
   */
  constructor() {
    this.isEngineOn = true;
  }

  /**
   * Check if valid vehicle id and read contents of file.
   *
   * @param {String} fileName - leading name of file
   * @param {Number} id - vehicle id
   * @returns {Object} - contents of file or invalid request
   */
  getInfo(fileName, id) {
    return new Promise((resolve, reject) => {
      const path = this.isValidPath(fileName, id);

      this.readFileAndCompletePromise(path, id, resolve, reject);
    });
  }

  /**
   * Read success file if valid action and client requests to start engine when isEngineOn false or if client
   * requests to stop engine when isEngineOn true.
   *
   * Otherwise, will read the fail file (i.e. engine is on and client requests to start engine).
   *
   * @param {String} fileName - leading name of file
   * @param {Number} id - vehicle id
   * @param {String} action - action sent to the vehicle
   * @returns {Object} - contents of file or invalid request
   */
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

        // Engine is set to the opposite state
        this.isEngineOn = !this.isEngineOn;
      }

      const path = this.isValidPath(target, id);

      this.readFileAndCompletePromise(path, id, resolve, reject);
    });
  }

  /**
   * Reads contents of path and resolve a promise with contents if file is valid
   *
   * Otherwise, it will resolve with an invalid request.
   *
   * @param {String} path - full path to file
   * @param {Number} id -
   * @param {Function} resolve
   * @param {Function} reject
   */
  readFileAndCompletePromise(path, id, resolve, reject) {
    if (path) {
      fs.readFile(path, 'utf8', (err, data) => {
        if (err) reject(err);

        resolve(data);
      });
    } else {
      // this assumes the id is invalid
      resolve(this.invalidRequest(id));
    }
  }

  /**
   * Check if vehicle id is valid.
   *
   * @param {String} fileName - leading name of file
   * @param {Number} id - vehicle id
   * @returns {String|Boolean} - return full path name if file exists, else return false
   */
  isValidPath(fileName, id) {
    // use the project root path which makes this method useable in the tests folder
    const path = root + `/mocks/data/${fileName}${id}.json`;

    // check if provided path exists
    return fs.existsSync(path) ? path : false;
  }

  /**
   * Used for invalid vehicle id.
   *
   * @param {Number} id - vehicle id
   * @returns {Object} - return status 404 and that the vehicle id cannot be found
   */
  invalidRequest(id) {
    return JSON.stringify({
      reason: `Vehicle id: ${id} not found.`,
      status: '404'
    });
  }
};
