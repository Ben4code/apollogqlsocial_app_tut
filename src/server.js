const { ApolloServer, PubSub } = require("apollo-server");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

dotenv.config();

const pubSub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubSub })
});

// mongoose
//   .connect(process.env.MONGODBURI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Database is running.");
//   });

// server.listen().then(({url}) => {
//   console.log(url)
//   console.log(`
//     Server is running!
//     Listening on port 5000
//   `);
// });


mongoose
  .connect(process.env.MONGODBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    return server.listen({port: 5000})
  })
  .then((res)=> {
    console.log(`
      Server is running on port ${res.url}
  `);
  })
