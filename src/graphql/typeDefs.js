const { gql } = require('apollo-server')


module.exports = gql`
  type Comment{
    id: ID!
    body: String!
    username: String!
    createdAt: String!
  }

  type Like{
    id: ID!
    username: String!
    createdAt: String!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    author: String!
    comments: [Comment]!
    commentCount: Int!
    likes: [Like]!
    likeCount: Int!
    createdAt: String!
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
    getPost(postId: ID!): Post
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
    # User
    register(registerInput: RegisterInput): User!
    login(loginInput: LoginInput): User!
    
    # Post
    createPost(title: String!, body: String!): Post!
    deletePost(postId: ID!): String
    
    # Comment
    createComment(postId: ID!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!

    # Like 
    likePost(postId: ID!): Post!
  }

  type Subscription{
    newPost: Post!
  }
`;