'use strict';

const Hapi = require('@hapi/hapi');
//const Joi = require('@hapi/joi');
//const Qs=require('qs');

const mysql = require('mysql');

const postRoute = require("../routes/postRoute");

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
        /*query:{
            parser: (query) => Qs.parse(query)
        }*/
    });

    var connection = mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'projet_notes'
    });

    connection.connect((err)=>{
        if(!err){
            console.log('DB connection succeeded');
        }else{
            console.log('DB connection failed \nErreur : '+JSON.stringify(err,undefined,2));
        }
    });

    postRoute(server,connection);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();