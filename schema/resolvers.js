const { uniqBy, union, flatten, uniq } = require("lodash");
const mongoose = require("mongoose");

const Library = require("../models/Library");

const resolvers = {
  Query: {
    library: (_, { id }) => Library.findById({ _id: id }),
    allLibraries: () => Library.find({}),
    allTags: async () => {
      const allLibraries = await Library.find({});
      const libraryTags = allLibraries.map(({ tags }) => tags);
      return union(uniq(flatten(libraryTags)));
    },
    librariesByTag: (_, { tag }) => {
      return Library.find({ tags: tag });
    },
    languages: async () => {
      const allLibraries = await Library.find({});
      return uniqBy(allLibraries, "language").map(({ language }) => {
        const libraries = Library.find({ language });
        return { name: language, libraries };
      });
    }
  }
};

module.exports = resolvers;
