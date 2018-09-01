const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const parser = require('body-parser');
const path = require('path');

const redirect = require('./routers/redirect.js');
const router = require('./routers/router.js');
const app = express();

app.use(helmet());
app.use(parser.urlencoded({ extended: false }));
app.use(morgan('[:date[clf]] :method :url :status :res[content-length] - :response-time ms'));
app.use('/', express.static(path.join(__dirname, '../client/login/dist')));
app.use('/stats/region=:region/username=:username', express.static(path.join(__dirname, '../client/stats/dist')));
app.use('/stats', redirect);
app.use('/api/stats', router);

module.exports = app;