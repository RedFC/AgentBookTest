'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const session = require('express-session');
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const swaggerUi = require('swagger-ui-express');
const logger = require("morgan");
const cors = require("cors");
const fs = require("fs");
const swagger_json_1 = __importDefault(require("./app/swagger/swagger.json"));
const globalAny = global;
globalAny.ROOTPATH = __dirname;
var app = express();
app.use(cors());
app.set("view engine", "ejs");
app.use(express.static(__dirname + "views"));
// Express TCP requests parsing
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
// create a write stream (in append mode) for system logger
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(logger('common', { stream: accessLogStream }));
// Static rendering
app.use(express.static(path.join(__dirname, "views")));
app.set("view engine", "ejs");
// Route definitions
app.use('/cache', require('./app/cache'));
app.use("/console", require('./routes/console'));
app.use("/api", require("./routes/api"));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swagger_json_1.default));
require("./routes/web")(app);
module.exports = app;
//# sourceMappingURL=app.js.map