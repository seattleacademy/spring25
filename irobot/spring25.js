var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.text());

var counter = 1;

var irobot = require('./index');
var robot = new irobot.Robot('/dev/ttyUSB0');

var port = (process.argv[2] ? Number(process.argv[2]) : 2025);

robot.on('ready', function() {
    console.log("Robot ready!.");
});

app.all('/drive', function(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    console.log(JSON.parse(req.body));
    robot.drive(JSON.parse(req.body));
    counter++;
    res.send(counter.toString());
});

app.listen(port, function() {
    console.log('Example app listening on port ' + port);
});