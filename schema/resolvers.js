const { uniqBy } = require("lodash");
const mongoose = require("mongoose");

const User = require("../models/User");
const Library = require("../models/Library");
const Game = require("../models/Game");

const resolvers = {
  Query: {
    user: (_, { id }) => User.findById({ _id: id }),
    allUsers: () => User.find({}),
    library: (_, { id }) => Library.findById({ _id: id }),
    allLibraries: () => Library.find({}),
    languages: async () => {
      const allLibraries = await Library.find({});
      return uniqBy(allLibraries, "language").map(({ language }) => {
        const libraries = Library.find({ language });
        return { name: language, libraries };
      });
    },
    game: (_, { id }) => Game.findById({ _id: id })
  },
  Game: {
    library: game => Library.findById({ _id: game.library }),
    user: game => User.findById({ _id: game.user })
  },
  Mutation: {
    createUser: (_, { username }) => User.create({ username }),
    expireSnippet: async (_, { snippet, game }) => {
      //  Find the current game.
      const updatedGame = await Game.findById({ _id: game }).populate(
        "snippets"
      );

      //  Find the particular snippet
      const updatedSnippet = updatedGame.snippets.find(
        gameSnippet => gameSnippet.id === snippet
      );

      //  Set the snippet's completed status to true without adding points
      updatedSnippet.completed = true;

      //  return the updated game after saving
      return updatedGame.save();
    },
    submitAnswer: async (_, { answer, snippet, game, remainingTime }) => {
      // Find the game of interest
      const updatedGame = await Game.findById({ _id: game }).populate(
        "snippets"
      );

      // Find the snippet of interest
      const updatedSnippet = updatedGame.snippets.find(
        gameSnippet => gameSnippet.id === snippet
      );

      //  If for some reason the snippet is already completed,
      //  or it isnt found return without update/save
      if (updatedSnippet.completed || !updatedSnippet) {
        return updatedGame;
      }

      //  if correct add to score
      if (updatedSnippet.prefix === answer) {
        updatedGame.currentScore += 5 - remainingTime;
        updatedSnippet.completeTime = remainingTime;
        updatedSnippet.correctlyAnswered = true;
      }

      // regardless of correctness, complete snippet
      updatedSnippet.completed = true;

      //if no more snippets, game is finished.
      updatedGame.completed = updatedGame.remainingSnippets === 0;
      return updatedGame.save();
    },
    createGame: async (_, { user, library }) => {
      const { snippets } = await Library.findById({
        _id: library
      }).populate("snippets");

      return Game.create({
        library,
        user,
        snippets
      });
    }
  }
};

module.exports = resolvers;
