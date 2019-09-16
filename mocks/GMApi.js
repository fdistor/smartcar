const fs = require('fs');

module.exports = class GMApi {
  getInfo(fileName, id) {
    return new Promise((resolve, reject) => {
      const path = this.isValidPath(fileName, id);

      if (path) {
        fs.readFile(path, 'utf8', (err, data) => {
          if (err) reject(err);

          resolve(data);
        });
      } else {
        resolve(this.badRequest(id));
      }
    });
  }

  isValidPath(fileName, id) {
    const path = __dirname + `/./data/${fileName}${id}.json`;

    return fs.existsSync(__dirname + `/./data/${fileName}${id}.json`)
      ? path
      : false;
  }

  badRequest(id) {
    return JSON.stringify({
      status: '404',
      reason: `Vehicle id: ${id} not found.`
    });
  }
};
