require('newrelic');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

const port = process.env.PORT || 3000;
require("./api/app.js")(app);

app.listen(port);