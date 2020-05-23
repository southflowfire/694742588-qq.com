/*
 * @Author: renjianshu
 * @Date: 2020-03-29 19:46:59
 * @LastEditTime: 2020-05-22 19:09:32
 * @LastEditors: renjianshu
 * @Description:
 * @FilePath: /mock/src/index.js
 */
const express  = require("express");
const { ApolloServer,gql } = require("apollo-server-express")
const { resolvers}  = require("./scalars")
const mocks = require('./mocks');
const path = require('path')
const fs = require('fs')

const typeStr = fs.readFileSync(path.join(__dirname,'schema.public.graphql'))
const typeDefs = gql`${typeStr}`

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
	typeDefs,
	resolvers,
	mocks
});
const app = new express()
server.applyMiddleware({ app });
// The `listen` method launches a web server.
app.listen({ port: 4000 }, () =>
    console.log(`  Server ready at http://localhost:4000${server.graphqlPath}`)
);