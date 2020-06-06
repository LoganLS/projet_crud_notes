'use strict';

const Hapi = require('@hapi/hapi');

const mysql = require('mysql');

const postRoute = require("../routes/postRoute");

var express = require('express');

const app=express();
/*
var keycloak = require('keycloak-js');

let initOptions={
    url: 'http://localhost:8080/auth', realm: 'keycloak-notes', client: 'vue-test-app', onLoad: 'login-required'
};

let keycloak_options=Keycloak(initOptions);*/

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
        /*query:{
            parser: (query) => Qs.parse(query)
        }*/
    });

    var connection = mysql.createPool({
        database:'projet_notes',
        host:'localhost',
        user:'root',
        password:'',
        connectionLimit: 10
    });

    /*connection.connect((err)=>{
        if(!err){
            console.log('DB connection succeeded');
        }else{
            console.log('DB connection failed \nErreur : '+JSON.stringify(err,undefined,2));
        }
    });*/

    postRoute(server,connection);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();