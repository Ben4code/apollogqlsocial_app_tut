const { UserInputError } = require('apollo-server');

const Post = require('../../models/Post')
const checkAuth = require('../../util/checkAuth');


module.exports = {
  Mutation: {
    async createComment(_, {postId, body}, context){
      const user = checkAuth(context);
      if(body.trim() === ''){
        throw new UserInputError('Empty Comment', {
          errors:{
            body: "Comment field cannot be empty."
          } 
        });
      }

      const post = await Post.findOne({_id: postId});
      if(post){
        post.comments.unshift({
          body,
          username: user.username,
          createdAt: new Date().toISOString()
        });
        await post.save();
        return post;
      } else {
        throw new UserInputError("Post was not found.")
      }
     }
  }
}