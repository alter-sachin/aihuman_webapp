const express      = require('express');
const path         = require('path');
const bodyParser   = require('body-parser');

require('dotenv').config();
require('./config/environment');
require('./database');

const routes          = require('./routes/index');
const configPassport  = require('./passport/passport-config');

const assetFolder  = path.resolve(__dirname, '../dist/');
const port         = process.env.PORT;
const app          = express();

app.use(express.static(assetFolder));
app.use(bodyParser.json());

configPassport(app, express);

app.use('/', routes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Server is listening on port ${port}`));
