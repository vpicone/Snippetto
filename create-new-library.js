const _ = require("lodash");
const mongoose = require("mongoose");
const prompt = require("prompt");
const fs = require("fs");
const path = require("path");
const xml2js = require("xml2js");
const util = require("util");
const cloudinary = require('cloudinary');

const Library = require("./models/Library");
const uploadImage = require('./upload_image').upload;





mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/snipetto", {
  useMongoClient: true
});



const getFilePath = fileName => {
  return path.join(__dirname, `extensions/${fileName}`);
};

function getSnippets(fileName, package) {
  const snippetsPath = `${getFilePath(fileName)}/extension/snippets`;
  const snippetFiles = package.contributes.snippets.map(
    ({ language, path }) => {
      return {
        language,
        path: `/${path.split("/").slice(-1)}`
      };
    }
  );

  // Get the various snippetLanguages for which snippets exist
  const snippetLanguages = _.uniq(snippetFiles.map(file => file.language));

  // Handles the new case where language is emitted for global snippets
  if (!snippetLanguages.length) {
    snippetLanguages.push("global");
  }

  // Get all of the snippet files and require their package.json
  const filePaths = _.uniq(snippetFiles.map(({ path }) => snippetsPath + path));
  const snippetObjects = filePaths.map(path => {
    return require(path);
  });

  // Combine the snippets into one mega object
  const mergedSnippetObject = {};
  snippetObjects.forEach(obj => {
    _.assign(mergedSnippetObject, obj);
  });

  return {
    snippetLanguages,
    mergedSnippetObject
  };
}

function uploadIcon(fileName){

}

const createLibrary = async ({ fileName }) => {

  const packageJSON = require(path.join(
    __dirname,
    `extensions/${fileName}/extension/package.json`
  ));


  const { mergedSnippetObject, snippetLanguages } = getSnippets(
    fileName,
    packageJSON
  );

  const snippetNames = _.keys(mergedSnippetObject);
  const snippets = snippetNames.map(name => {
    const prefix = mergedSnippetObject[name].prefix;
    const body = mergedSnippetObject[name].body;
    const description = mergedSnippetObject[name].description || "";
    return {
      name,
      prefix,
      description,
      body
    };
  });

  const {
    displayName: libraryName,
    repository,
    version,
    description,
    publisher,
    homepage
  } = packageJSON;

  const links = [];
  if (repository) {
    links.push({ name: "repository", url: repository.url });
  }
  if (homepage) {
    links.push({ name: "homepage", url: homepage });
  }

  let image = {};

  if(packageJSON.icon) {
    image = await uploadImage({path: `${getFilePath(fileName)}/extension/${packageJSON.icon}`, name: libraryName})
  } else {
    image = await uploadImage({path: "http://via.placeholder.com/128x128", name: libraryName})
  }


  const library = new Library({
    name: libraryName,
    links,
    description,
    version,
    publisher,
    snippets,
    image,
    languages: snippetLanguages
  });

  await library.save();
};

fs.readdir(`${__dirname}/extensions/`, (err, list) => {
  // Filter out hidden items
  list = list.filter(item => !/(^|\/)\.[^\/\.]/g.test(item));
  list.forEach(lib => {
    createLibrary({ fileName: lib });
  });
});
