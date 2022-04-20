const express      = require('express');
const path         = require('path');
const bodyParser   = require('body-parser');
const morgan       = require('morgan');

require('dotenv').config();
require('./config/environment');
require('./database');

const configPassport  = require('./passport/passport-config');

const assetFolder  = path.resolve(__dirname, '../dist/');
const port         = process.env.PORT;
const app          = express();

app.use(express.static(assetFolder));
app.use(bodyParser.json());
app.use(morgan('dev'));
const routes = require('./routes/index');

configPassport(app, express);

app.use('/', routes);

app.listen(port, () => console.log(`Server is listening on port ${port}`));
