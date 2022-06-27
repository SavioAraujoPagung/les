const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
var printer = require("node-thermal-printer")
const routes = require('./routes');


const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(helmet());

app.use('/', routes);
let port = 9898
app.listen(port, () => console.log(` > API is online: ${port}`));

module.exports = app;
