const dbUrl: string ='mongodb://127.0.0.1:27017/graphql';

import * as express from "express";
import { Schema } from "mongoose";
const app = express();


import * as mongoose from "mongoose";

mongoose.connect(dbUrl , ()=>{
    console.log(`connected to the database successfully...`)
});



import { root } from "./modules/resolvers"

import { graphqlHTTP } from 'express-graphql';

import { schema } from "./graphql/schemas/schemas";


app.use('/' , graphqlHTTP({
    schema:schema,
    rootValue: root,
    graphiql:true
}));

const port: number = 3000;

app.listen(port , ()=>{
    console.log(`server is running on port ${port} `)
})





