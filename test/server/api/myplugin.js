// 'use strict';

var Code = require('code');
var Cheerio = require('cheerio')
var Hapi = require('hapi');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var myplugin = require('../../../server/api/myplugin')
var visionPlugin = require('vision')

var server;
var helloRequest = {
    method: 'GET',
    url: '/hello'
  }

var helpRequest = {
    method: 'GET',
    url: '/static_p/help'
}

var homeRequest = {
    method: 'GET',
    url: '/static_p/home'
}

var aboutRequest = {
    method: 'GET',
    url: '/static_p/about'
}
var missingPageRequest = {
    method: 'GET',
    url: '/static_p/jack'
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
            html: require('handlebars')
        },
        relativeTo: __dirname,
        path: '../../../server/static_pages'
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
            Code.expect(response.statusCode).to.equal(407);
            done();
        });
    });
} );