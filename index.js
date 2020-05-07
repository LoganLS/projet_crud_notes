'use strict';

const Hapi = require('@hapi/hapi');
const Joi = require('@hapi/joi');
const Qs=require('qs');

const mysql = require('mysql');

var mysqlConnection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'projet_notes'
});

mysqlConnection.connect((err)=>{
    if(!err){
        console.log('DB connection succeeded');
    }else{
        console.log('DB connection failed \nErreur : '+JSON.stringify(err,undefined,2));
    }
});

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
        query:{
            parser: (query) => Qs.parse(query)
        }
    });

    server.route({
        method: 'GET',
        path: '/notes',
        handler: (request, reply) => {
            mysqlConnection.query('SELECT * FROM note',(err,rows,fields)=>{
                if(!err){
                    console.log(rows);
                }else{
                    console.log(err);
                }
            });

            return request.query;
        }
    });

    server.route({
        method: 'GET',
        path: '/note/{idNote}',
        handler: (request, reply) => {
            const idNote=request.params.idNote;

            mysqlConnection.query('SELECT * FROM note WHERE id='+idNote,(err,rows,fields)=>{
                if(!err){
                    console.log(rows);
                }else{
                    console.log(err);
                }
            });

            return `Note : ${request.query}`;
        }
    });


    server.route({
        method: 'POST',
        path: '/add',
        handler: (request, reply) => {
            const idUser=request.payload.idUser;
            const idCategory=request.payload.idCategory;
            const description=request.payload.description;

            mysqlConnection.query('INSERT INTO note(idUser,idCategory,description) VALUES('+idUser+','+idCategory+',"'+description+'")',function(error,results,fields){
                if(error){
                    throw error;
                }
                console.log(results);
                //reply(results);

                /*const response = reply.response('ajouter');
                response.type('text/plain');
                return response;*/
            });

            return 'Ajouter';
        },
        config:{
            validate:{
                payload: Joi.object({
                    idUser: Joi.number().integer(),
                    idCategory: Joi.number().integer(),
                    description: [Joi.string(),Joi.number()]
                })
            }
        }
    });

    server.route({
        method: 'DELETE',
        path: '/delete/{idNote}',
        handler: (request, reply) => {
            const idNote=request.params.idNote;

            mysqlConnection.query('DELETE FROM note WHERE id='+idNote,function(error,result,fields){
                if(error){
                    throw error;
                }

                var response='';

                if(result.affectedRows){
                    //reply(true);
                    response = reply.response('succes');
                    return response;
                }else{
                    //reply(false);
                    response = reply.response('erreur');
                }
                /*response.type('text/plain');
                return response;*/
            });

            return 'DELETE';
        }
    });

    server.route({
        method: 'PUT',
        path: '/update/{idNote}',
        handler: (request, reply) => {
            const idNote=request.params.idNote;

            const idUser=request.payload.idUser;
            const idCategory=request.payload.idCategory;
            const description=request.payload.description;

            mysqlConnection.query('UPDATE note SET idUser='+idUser+', idCategory='+idCategory+', description="'+description+'" WHERE id='+idNote,function(error,results,fields){
                if(error){
                    throw error;
                }
                console.log(results);
                //reply(results);

                /*const response = reply.response('modifier');
                response.type('text/plain');
                return response;*/
            });

            return 'UPDATE';
        },
        config:{
            validate:{
                payload: Joi.object({
                    idNote: Joi.number().integer(),
                    idUser: Joi.number().integer(),
                    idCategory: Joi.number().integer(),
                    description: [Joi.string(),Joi.number()]
                })
            }
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();