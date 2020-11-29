const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {UserInputError} = require('apollo-server')

const User = require("../../models/User");
const { validateRegisterInput, validateLoginInput } = require('../../util/validators');


function generateToken(user){
  return jwt.sign({
    id: user.id,
    email: user.email,
    username: user.username
  }, 
    process.env.SECRET,
    {
      expiresIn: '1hr'
    }
  )
}

module.exports = {
  Query: {
    async getUsers() {
      try {
        const users = await User.find();
        return users;
      } catch (error) {
        throw new Error(err)
      }
    }
  },
  Mutation: {
    async register(_, {registerInput: {username, email, password, confirmPassword}}){
      // Validate input
      const {errors, valid} = validateRegisterInput(username, email, password, confirmPassword)
      if(!valid){
        throw new UserInputError('Errors', {errors})
      }

      // Check for existing user
      const userName = await User.findOne({username});
      if(userName){
        throw new UserInputError('Username is already taken.', {
          errors: {
            username: 'This username is already taken.'
          }
        })
      }

      // Check for existing email
      const userEmail = await User.findOne({email});
      if(userEmail){
        throw new UserInputError('Email is already taken.', {
          errors: {
            email: 'This email is already taken.'
          }
        })
      }
      
      // Hash password
      password = await bcryptjs.hash(password, 12);
      const newUser = new User({
        username, email, password, createdAt: new Date().toISOString()
      });
      
      // Store user
      const res = await newUser.save();
      
      // Create user token
      const token = generateToken(res)
      
      return {
        ...res._doc,
        id: res._id,
        token
      }
    },


    async login(_, {loginInput: {email, password}}) {
      // Validate input
      const {errors, valid} = validateLoginInput(email, password)
      if(!valid){
        throw new UserInputError('Errors', {errors})
      }

      // Find existing user
      const user = await User.findOne({email});
      if(!user){
        errors.general = 'User not found.'
        throw new UserInputError('User not found', {errors});
      }
      
      const isEmailMatch = await bcryptjs.compare(password, user.password)
      if(!isEmailMatch){
        errors.general = 'Wrong Credentials.'
        throw new UserInputError('Wrong Credentials', {errors});
      }

      const token = generateToken(user);
      return {
        ...user._doc,
        id: user._id,
        token
      }
    }
  }
}