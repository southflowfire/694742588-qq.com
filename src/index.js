/*
 * @Author: renjianshu
 * @Date: 2020-03-29 19:46:59
 * @LastEditTime: 2020-03-31 17:25:46
 * @LastEditors: renjianshu
 * @Description:
 * @FilePath: \mock\src\index.js
 */

const { ApolloServer,gql } = require("apollo-server")
const { resolvers}  = require("./scalars")
const mocks = require('./mocks');
const path = require('path')
const fs = require('fs')

const typeStr = fs.readFileSync(path.join(__dirname,'schema.graphql'))
const typeDefs = gql`${typeStr}`

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
	typeDefs,
	resolvers,
	mocks
});

// The `listen` method launches a web server.
server.listen().then(({  }) => {
	console.log(`🚀  Server ready at localhost:4000`);
});
