const app = require('express')();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/vehicles/:id', (req, res) => {});

app.listen(port, err => {
  if (err) console.error(err);
  console.log(`Listening on http://localhost:${port}`);
});
