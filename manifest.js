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
        port: process.env.PORT || 8081,
        labels: ['api']
    }
    ],
    plugins: []
}

 var basePlugins = [ 
    {
    'hapi-sequelize': {
                database: 'test1',
                user: 'postgres',
                pass: 'pass',
                dialect: 'postgres',
                port: 5432,
                models: './server/api/models/**/*.js',
                sequelize: {
                    define: {
                        underscoredAll: true
                    }
                }
            }
    },{
        'inert': {}
    },{
        'vision': {}
    }
];

var endpointsToLoad = glob.sync('server/api/*.js', {}).map(file => {
    let fileName = './' + file
    let endpointConfig = {};
    endpointConfig[fileName] = [{
        select: ['api']
        }];
    return endpointConfig;
    });

manifest.plugins = [].concat(basePlugins, endpointsToLoad)

module.exports = new Confidence.Store(manifest);