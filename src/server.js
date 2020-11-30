const { ApolloServer } = require('apollo-server');
const dotenv = require('dotenv')
const mongoose = require('mongoose')

const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')



dotenv.config()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({req}) => ({req})
})

mongoose.connect(process.env.MONGODBURI, {
  useNewUrlParser: true, 
  useUnifiedTopology: true
}).then(()=> {
  console.log("Database is running.")
})

server.listen('5000').then(()=> {
  console.log(`
    Server is running!
    Listening on port 5000
  `)
});