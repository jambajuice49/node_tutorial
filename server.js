require("use-strict")
var Glue = require('glue');
var manifest = require('./manifest');
var Handlebars = require('handlebars');
var HandlebarsLayouts = require('handlebars-layouts');

var engine = Handlebars.create();
HandlebarsLayouts.register(engine);

var options = {
    relativeTo: __dirname
};

console.log(__dirname)

Glue.compose(manifest.get('/', {env: 'test'}), options, function (err, server) {

    if (err) {
        throw err;
    }
    server.views({
        engines: {
            html: engine
        },
        relativeTo: __dirname,
        path: 'server/static_pages',
        partialsPath: 'server/views',
        helpersPath: 'server/views/helpers'
    });
    server.start(function () {
        var db = server.plugins['hapi-sequelize'].db;
        db.sequelize.sync().then(function() {
          console.log('models synced');
        });
        console.log(process.env.IP)
        console.log(process.env.PORT)
        console.log('Hapi days!');
        console.log(process.env.DATABASE_URI);
    });
});