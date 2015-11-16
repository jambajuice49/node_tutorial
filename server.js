require("use-strict")
var Glue = require('glue');
var manifest = require('./manifest');


var options = {
    relativeTo: __dirname
};

console.log(__dirname)

Glue.compose(manifest.get('/'), options, function (err, server) {

    if (err) {
        throw err;
    }
    server.start(function () {
        console.log(process.env.IP)
        console.log('Hapi days!');
    });
});