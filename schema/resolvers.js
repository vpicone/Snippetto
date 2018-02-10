const { uniqBy, union, flatten, uniq } = require("lodash");
const mongoose = require("mongoose");

const Library = require("../models/Library");

const resolvers = {
  Query: {
    libraryById: (_, { id }) => Library.findById({ _id: id }),
    allLibraries: () => Library.find({}),
    allLanguages: async () => {
      const allLibraries = await Library.find({});
      const allLanguages = allLibraries.map(({ languages }) => languages);
      return union(uniq(flatten(allLanguages)));
    },
    librariesByLanguage: (_, { language }) => {
      return Library.find({ languages: language });
    }
  },
  Library: {
    image({image}) {return image.public_id},
  }
};

module.exports = resolvers;
