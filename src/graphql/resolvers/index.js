const userResolver = require('./users')
const postResolver = require('./posts')


module.exports = {
  Query: {
    ...postResolver.Query,
    ...userResolver.Query
  },
  Mutation: {
    ...userResolver.Mutation,
    ...postResolver.Mutation
  }
}