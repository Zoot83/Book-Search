const { AuthenticationError } = require('apollo-server-express');
const { Book, User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return User.find(params).populate('books');
    },
  },
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const newUser = await User.create({ username, email, password });
      const token = signToken(newUser);

      return { token, newUser };
    },
    login: async (parent, { email, password }) => {
      const user = User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('No user with that email');
      }
      const correctPassword = await user.isCorrectPassword(password);

      if (!correctPassword) {
        throw new AuthenticationError('Wrong Password');
      }
      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (
      parent,
      { author, description, title, bookId, image, link },
      context
    ) => {
      if (context.user) {
        const bookAdded = await User.findByIdAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: {
              savedBooks: {
                author,
                description,
                title,
                bookId,
                image,
                link,
              },
            },
          }
        );
        return bookAdded;
      }
      throw new AuthenticationError(
        'You are not logged in! Please login to save a book'
      );
    },
    // removeBook: Accepts a book's bookId as a parameter; returns a User type.
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        return User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: bookId } },
          { new: true }
        );
      }
      throw new AuthenticationError(
        'You are not logged in! Please login to save a book'
      );
    },
  },
};

module.exports = resolvers;
