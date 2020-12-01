const { UserInputError, AuthenticationError } = require("apollo-server");

const Post = require("../../models/Post");
const checkAuth = require("../../util/checkAuth");
const posts = require("./posts");


module.exports = {
  Mutation: {
    async likePost(_, { postId }, context) {
      const {username} = checkAuth(context);
      
      const post = await Post.findOne({ _id: postId });
      if (post) {
        if(post.likes.find(like => like.username === username)){
          //Post already liked
          post.likes = post.likes.filter(like => like.username !== username)
        }else{
          // Post unliked
          post.likes.push({
            username,
            createdAt: new Date().toISOString()
          })
        }
        
        await post.save();
        return post;
      } else {
        throw new UserInputError("Post was not found.");
      }
    }
  }
}