const Post = require("../../models/Post");
const { AuthenticationError } = require("apollo-server");

const checkAuth = require("../../util/checkAuth");

module.exports = {
  Query: {
    async getPost(_, { postId }) {
      try {
        const post = await Post.findOne({ _id: postId });
        if (!post) {
          throw new Error("Post not found.");
        }
        return post;
      } catch (error) {
        throw new Error(error);
      }
    },
    async getPosts() {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    async createPost(_, { title, body }, context) {
      try {
        const user = checkAuth(context);

        if(body.trim() === ''){
          throw new Error('Post body field must not be empty.');
        }

        const newPost = new Post({
          title,
          body,
          user: user._id,
          author: user.username,
          createdAt: new Date().toISOString(),
        });

        const post = await newPost.save();
        
        // Trigger Subscription
        context.pubSub.publish('NEW_POST', {
          newPost: post
        })
        return post;

      } catch (error) {
        throw new Error(error);
      }
    },
    async deletePost(_, { postId }, context) {
      const user = checkAuth(context);
      try {
        const post = await Post.findOne({ _id: postId });
        if (user.username === post.author) {
          await post.delete();
          return `Post: (${post.title}) was deleted successfully`;
        } else {
          throw new AuthenticationError("Action not allowed.");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Subscription: {
    newPost:{
      subscribe: (_, __, {pubSub}) => pubSub.asyncIterator('NEW_POST')
    }
  }
};
