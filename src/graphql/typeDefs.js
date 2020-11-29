const { gql } = require('apollo-server')


module.exports = gql`
  type Post {
    id: ID!
    title: String!
    body: String!
    author: String
    comments: String
    likes: String
  }
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }
  
  type Query{
    getPosts: [Post]
    getUsers: [User]
  }

  input RegisterInput {
    username: String!
    email: String!
    password: String!
    confirmPassword: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }
  
  type Mutation{
    register(registerInput: RegisterInput): User!
    login(loginInput: LoginInput): User!
  }
`;