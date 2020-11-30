const userResolver = require('./users')
const postResolver = require('./posts')
const commentResolver = require('./comments')
const likeResolver = require('./likes')


module.exports = {
  Query: {
    ...postResolver.Query,
    ...userResolver.Query
  },
  Mutation: {
    ...userResolver.Mutation,
    ...postResolver.Mutation,
    ...commentResolver.Mutation,
    ...likeResolver.Mutation
  }
}