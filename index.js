var express = require('express');
var app = express();
// Home page endpoint
app.get('/', function (req, res) {
    res.send('{ "response": "Welcome to shenko telehealth" }');
});

app.get('/next', function (req, res) {
    res.send('{ "response": "yes this is the next page,please register your account"}');
});
app.get('/ok', function (req, res) {
    res.send('{ "response": " Nice Job!, cool job and welldone!" }');
});
app.listen(process.env.PORT || 7000);
module.exports = app;
