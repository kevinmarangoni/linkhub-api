const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');
const httpStatus = require('http-status');
const mongoSanitize = require('express-mongo-sanitize');
const routes = require('./src/routes/routes.js');
const dotenv = require("dotenv");


const app = express();
dotenv.config()
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(mongoSanitize())
app.use(cors())
app.options('*', cors())

app.use('/api/v1', routes);

module.exports = app;