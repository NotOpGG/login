const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

const router = require('./router.js');
const app = express();

app.use(helmet());
app.use(morgan('[:date[clf]] :method :url :status :res[content-length] - :response-time ms'));
app.use('/', express.static(path.join(__dirname, '../client/login/dist')));
app.use('/stats', express.static(path.join(__dirname, '../client/stats/dist')));
app.use('/stats/api', router);

module.exports = app;