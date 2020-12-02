const { ApolloServer, PubSub } = require("apollo-server");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

dotenv.config();

const pubSub = new PubSub();

const server = new ApolloServer({
  cors:  {
    origin: "*",
  },
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubSub })
});

mongoose
  .connect(process.env.MONGODBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database is running.");
  });

server.listen().then(() => {
  console.log(`
    Server is running!
    Listening on port 5000
  `);
});
