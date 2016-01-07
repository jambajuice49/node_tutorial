exports.register = function (server, options, next) {
    var routes = [];
    var static_pages = {about: "About", help: "Help", home: 'Home', test: "Test"}
    
    routes.push({
        method: 'GET',
        path: '/hello',
        handler: function(request, reply){
            console.log("The current working directory is " + process.cwd());
            reply('Hello, world');
        }
    });
    
    routes.push({
        method: 'POST',
        path: '/hello',
        handler: function(request, reply){
            console.log(request.payload);
            console.log(request.payload.name);
            var models = request.server.plugins['hapi-sequelize'].db.sequelize.models;
            console.log(models);
            models.Hello.create(request.payload).then(function(hello) {
                reply(hello, 201)
            });
        }
    });
    
    routes.push({
        method: 'GET',
        path: '/app/{name}',
        handler: function(request, reply){
            var title = static_pages[request.params.name];
            console.log("the title is " + title);
            if (title == null || title == undefined)
                reply().code(404);
            else
                reply.view(request.params.name);
        }
    })
    server.route(routes)
    next();
};

exports.register.attributes = {
    name: 'api/myplugin'
};