const dbUrl:string='http://127.0.0.1:27017/graphql';

import * as express from "express";
const app = express();

import * as http from "http";
const server =new http.Server(app);

import * as bodyParser from "body-parser";
app.use(bodyParser.json());

import * as mongoose from "mongoose";

mongoose.connect(dbUrl , ()=>{
    console.log(`connected to the database successfully...`)
});




const port:number = 3000;


server.listen(3000 , ()=>{
    console.log(`server is running on port ${port}`)
});