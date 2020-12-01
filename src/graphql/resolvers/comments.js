const { UserInputError, AuthenticationError } = require("apollo-server");

const Post = require("../../models/Post");
const checkAuth = require("../../util/checkAuth");
const posts = require("./posts");

module.exports = {
  Mutation: {
    async createComment(_, { postId, body }, context) {
      const user = checkAuth(context);
      if (body.trim() === "") {
        throw new UserInputError("Empty Comment", {
          errors: {
            body: "Comment field cannot be empty.",
          },
        });
      }

      const post = await Post.findOne({ _id: postId });
      if (post) {
        post.comments.unshift({
          body,
          username: user.username,
          createdAt: new Date().toISOString(),
        });
        await post.save();
        return post;
      } else {
        throw new UserInputError("Post was not found.");
      }
    },
    
    
    async deleteComment(_, { postId, commentId }, context) {
      const user = checkAuth(context);

      const post = await Post.findOne({ _id: postId });
      if (post) {
        const commentIndex = post.comments.findIndex((c) => c.id === commentId);
        if (post.comments[commentIndex].username === user.username) {
          post.comments.splice(commentIndex, 1);
          await post.save();
          return post;
        } else {
          throw new AuthenticationError("Action not allowed.");
        }
      } else {
        throw new UserInputError("Post not found.");
      }
    },
  },
};
