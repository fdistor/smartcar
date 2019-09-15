require('dotenv').config();

const app = require('express')();
const router = require('./router.js.js');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/vehicles/:id', router.getVehicleInfo);

app.listen(port, err => {
  if (err) console.error(err);
  console.log(`Listening on http://localhost:${port}`);
});
