const postService = require('../services/postService');

const initPostRoute=function(server,connection) {

    server.route({
        method:'GET',
        path:'/notes',
        options:{
            cors:true,
            handler:(request,h) => {
                return postService.get(connection);
            }
        }
    });

    server.route({
        method:'POST',
        path:'/note',
        options:{
          cors:true,
          handler:(request,h) => {
            return postService.insert(connection,request.payload);
          }
        },
    });

    server.route({
        method:'PUT',
        path:'/note/{idNote}',
        options:{
            cors:true,
            handler:(request,h) => {
                return postService.update(connection, request.params.idNote,request.payload);
            }
        }
    });

    server.route({
        method:'DELETE',
        path:'/note/{idNote}',
        options:{
            cors:true,
            handler:(request,h) => {
                return postService.delete(connection, request.params.idNote);
            }
        }
    });
}

module.exports = initPostRoute;