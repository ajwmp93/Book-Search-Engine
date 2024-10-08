// server/graphql/resolvers.js
const User = require('../models/User'); // Assuming you're using a User model
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('./auth'); // Assuming you have a function to sign tokens

const resolvers = {
  Query: {
    me: async (_, __, context) => {
      // Check if user is authenticated
      if (!context.user) throw new AuthenticationError('You need to be logged in!');

      return await User.findById(context.user._id);
    },
    // Add other query resolvers as needed
  },
  Mutation: {
    loginUser: async (_, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user || !(await user.isCorrectPassword(password))) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },
    addUser: async (_, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (_, { input }, context) => {
      if (!context.user) throw new AuthenticationError('You need to be logged in!');

      // Logic to save a book
      const updatedUser = await User.findByIdAndUpdate(
        context.user._id,
        { $addToSet: { savedBooks: input } },
        { new: true }
      );
      return updatedUser;
    },
    removeBook: async (_, { bookId }, context) => {
      if (!context.user) throw new AuthenticationError('You need to be logged in!');

      const updatedUser = await User.findByIdAndUpdate(
        context.user._id,
        { $pull: { savedBooks: { bookId } } },
        { new: true }
      );
      return updatedUser;
    },
  },
};

module.exports = resolvers;
