const app = require('./middleware.js');
const router = require('../router.js');

app.get('/vehicles/:id', router.getVehicleInfo);
app.get('/vehicles/:id/doors', router.getSecurity);
app.get('/vehicles/:id/fuel', router.getFuel);
app.get('/vehicles/:id/battery', router.getBattery);
app.post('/vehicles/:id/engine', router.postEngine);
app.get('/error', router.throwError);

module.exports = app;
