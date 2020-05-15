const postService = require('../services/postService');

const initPostRoute=function(server,connection) {

    server.route({
        method:'GET',
        path:'/notes',
        handler:(request,h) => {
            return postService.get(connection);
        }
    });

    server.route({
        method:'POST',
        path:'/note',
        handler:(request,h) => {
            return postService.insert(connection,request.payload);
        }
    });

    server.route({
        method:'PUT',
        path:'/note/{idNote}',
        handler:(request,h) => {
            return postService.update(connection, request.params.idNote,request.payload);
        }
    });

    server.route({
        method:'DELETE',
        path:'/note/{idNote}',
        handler:(request,h) => {
            return postService.delete(connection, request.params.idNote);
        }
    });
}

module.exports = initPostRoute;