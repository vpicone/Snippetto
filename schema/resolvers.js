const { uniqBy, union, flatten, uniq, sortBy } = require("lodash");
const mongoose = require("mongoose");

const Library = require("../models/Library");

const resolvers = {
  Query: {
    libraryById: (_, { id }) => Library.findById({ _id: id }),
    allLibraries: () => Library.find({}, { snippets: 0 }),
    allLanguages: async () => {
      const allLibraries = await Library.find({}, { languages: 1 });
      const allLanguagesWithDuplicates = allLibraries.map(
        ({ languages }) => languages
      );
      const allLanguages = union(uniq(flatten(allLanguagesWithDuplicates)));
      const languageObjects = allLanguages.map(language => {
        const libraries = allLibraries.filter(lib => {
          return lib.languages.includes(language);
        });
        return {
          name: language,
          libraries: sortBy(libraries, "name")
        };
      });
      return sortBy(languageObjects, ["name"]);
    },
    librariesByLanguage: async (_, { language }) => {
      const libraries = await Library.find({
        languages: language.toLowerCase()
      });
      return sortBy(libraries, "name");
    }
  },
  Library: {
    image({ image }) {
      return image.public_id;
    }
  }
};

module.exports = resolvers;
