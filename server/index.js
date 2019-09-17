require('dotenv').config();

const app = require('./middlewares/errorHandlers.js');
const port = process.env.PORT || 8000;

app.listen(port, err => {
  if (err) console.error(err);
  console.log(`Listening on http://localhost:${port}`);
});
