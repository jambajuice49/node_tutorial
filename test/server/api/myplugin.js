// 'use strict';

var Code = require('code');
var Cheerio = require('cheerio')
var Hapi = require('hapi');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var myplugin = require('../../../server/api/myplugin')
var visionPlugin = require('vision')
var Handlebars = require('handlebars');
var HandlebarsLayouts = require('handlebars-layouts');

var engine = Handlebars.create();
HandlebarsLayouts.register(engine);

var server;
var helloRequest = {
    method: 'GET',
    url: '/hello'
  }

var helpRequest = {
    method: 'GET',
    url: '/app/help'
}

var homeRequest = {
    method: 'GET',
    url: '/app/home'
}

var aboutRequest = {
    method: 'GET',
    url: '/app/about'
}
var missingPageRequest = {
    method: 'GET',
    url: '/app/jack'
}

lab.before(done => {
    server = new Hapi.Server()
    server.connection({
    port: 8123
    });
    var plugins = [myplugin, visionPlugin];
    server.register(plugins, done);
    server.views({
        engines: {
            html: engine
        },
        relativeTo: __dirname,
        path: '../../../server/static_pages',
        partialsPath: '../../../server/views'
    });
});

lab.experiment('my first experiment', () => {
    
    lab.test("I'm checking out hello GET", done => {
        server.inject(helloRequest, response => {
            console.log('what the hey');
            console.log(response.result);
            done();
        });
    });
    
    lab.test('Checking the title on help page', done => {
        server.inject(helpRequest, response => {
            var $ = Cheerio.load(response.payload)
            var title = $('title').text()
            console.log(title)
            Code.expect(title).contains('Rails')
            Code.expect(response.statusCode).to.equal(200);
            done();
        });
    });
    
    lab.test('Checking the title on about page', done => {
        server.inject(aboutRequest, response => {
            var $ = Cheerio.load(response.payload)
            var title = $('title').text()
            console.log(title)
            Code.expect(title).contains('About')
            Code.expect(response.statusCode).to.equal(200);
            done();
        });
    });
    
    lab.test('Checking the title on home page', done => {
        server.inject(homeRequest, response => {
            var $ = Cheerio.load(response.payload)
            var title = $('title').text()
            console.log(title)
            Code.expect(title).contains('Home')
            Code.expect(response.statusCode).to.equal(200);
            done();
        });
    });
    
    lab.test('Checking for 404 if just static path given', done => {
        server.inject(missingPageRequest, response => {
            console.log("I'm here joe");
            var $ = Cheerio.load(response.payload)
            console.log($.html());
            Code.expect(response.statusCode).to.equal(404);
            done();
        });
    });
} );