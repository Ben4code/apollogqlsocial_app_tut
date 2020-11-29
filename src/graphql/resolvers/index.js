const userResolver = require('./users')
const postResolver = require('./users')


module.exports = {
  Query: {
    ...postResolver,
    ...userResolver
  }
}