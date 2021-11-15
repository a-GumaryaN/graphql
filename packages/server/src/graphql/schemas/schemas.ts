import { buildSchema } from "graphql";

export const schema = buildSchema(`

type Query{
    login(username:String! , password:String! ):String!
}


`);