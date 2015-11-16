var Confidence = require('confidence');
var glob = require("glob")

var manifest = {
    server: {
        debug: {
            request: ['error']
        }
    },
    connections: [{
        host: process.env.IP,
        port: 8081,
        labels: ['api']
    }
    ],
    plugins: []
}

var endpointsToLoad = glob.sync('server/api/*.js', {}).map(file => {
    let fileName = './' + file
    let endpointConfig = {};
    endpointConfig[fileName] = [{
        select: ['api']
        }];
    return endpointConfig;
    });

manifest.plugins = [].concat(endpointsToLoad)

module.exports = new Confidence.Store(manifest);