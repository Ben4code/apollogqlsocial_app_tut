const {gql} = require('apollo-server')

module.exports = gql`
  type Post {
    id: ID!
    title: String!
    body: String!
    author: String!
    # comments: String!
    # likes: String!
  }

  type Query{
    getPosts: [Post]
  }



`