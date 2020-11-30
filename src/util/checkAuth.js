const jwt = require('jsonwebtoken');
const {AuthenticationError} = require('apollo-server')



module.exports = (context) => {
  const authHeader = context.req.headers.authorization;
  if(authHeader){
    const token = authHeader.split('Bearer ')[1];
    if(token){
      try {
        const user = jwt.verify(token, process.env.SECRET)
        return user;
      } catch (error) {
        throw new AuthenticationError('Invalid or expired token')
      }
    }
    throw new AuthenticationError('Authentication token must be \'Bearer [token]')
  }
  throw new AuthenticationError('Authorization header must be provided.')
}