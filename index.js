'use strict';

const Hapi = require('@hapi/hapi');

const mysql = require('mysql');
const express = require('express');
var app=express();
const bodyparser=require('body-parser');

app.use(bodyparser.json);

var mysqlConnection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'projet_notes'
});

app.listen(3000,()=>console.log('Express server is running at port number 3000'));
app.get('/add')

/*
const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'Hello World!';
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();*/