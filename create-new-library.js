const _ = require("lodash");
const mongoose = require("mongoose");
const prompt = require("prompt");
const fs = require("fs");
const path = require("path");
const xml2js = require("xml2js");
const util = require("util");

const Library = require("./models/Library");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/snipetto", {
  useMongoClient: true
});

const getFilePath = fileName => {
  return path.join(__dirname, `extensions/${fileName}`);
};

async function getLibraryDetails(fileName) {
  const filePath = getFilePath(fileName);
  const library = {};
  var parser = new xml2js.Parser({
    mergeAttrs: true,
    explicitArray: false,
    explicitCharkey: true,
    normalizeTags: true
  });

  const data = fs.readFileSync(filePath + "/extension.vsixmanifest");
  await parser.parseString(data, function(err, result) {
    const metadata = result.packagemanifest.metadata;
    // console.log(`${metadata.tags._.split(",").join("\n")}`);
    const forbiddenTags = ["snippet", "vscode"];
    const tags = _.uniq(
      metadata.tags._.toLowerCase()
        .split(",")
        .filter(tag => {
          return tag.match(RegExp(/^[^_\.]*$/)) && !forbiddenTags.includes(tag);
        })
    );

    if (!tags.length) {
      tags.push(metadata.displayname._.toLowerCase());
    }

    // Get Relevent links
    const links = [];
    metadata.properties.property
      .filter(prop => {
        return prop.Id.includes("Services.Links");
      })
      .forEach(linkProp => {
        const uri = linkProp.Id.split(".");
        links.push({
          name: uri[4],
          url: linkProp.Value
        });
        // links[uri[4]] = linkProp.Value;
      });

    library.name = metadata.displayname._;
    library.links = links;
    library.tags = tags;
    library.description = metadata.description._;
  });
  return library;
}

function getLibraryObject(fileName) {
  const filePath = getFilePath(fileName);

  const fileNames = fs.readdirSync(filePath + "/extension/snippets");
  const pooledSnippets = {};
  fileNames.forEach(fileName => {
    const data = fs.readFileSync(`${filePath}/extension/snippets/${fileName}`);
    Object.entries(JSON.parse(data)).forEach(([key, value]) => {
      pooledSnippets[key] = value;
    });
  });

  return pooledSnippets;
}

const createLibrary = async ({ fileName }) => {
  const libraryObject = getLibraryObject(fileName);
  // console.log(libraryObject);
  const libraryDetails = await getLibraryDetails(fileName);
  // console.log(libraryDetails);

  const snippetKeys = _.keys(libraryObject);
  const snippets = snippetKeys.map(key => {
    const prefix = libraryObject[key].prefix;
    const body = libraryObject[key].body;
    const description = libraryObject[key].description || "";
    return {
      name: key,
      prefix,
      description,
      body
    };
  });

  // console.log({
  //   name: libraryDetails.name,
  //   tags: libraryDetails.tags,
  //   description: libraryDetails.description,
  //   urls: libraryDetails.urls
  // });

  const { name, tags, description, links } = libraryDetails;

  const library = new Library({
    snippets,
    name,
    description,
    tags,
    links
  });

  // console.log({
  // snippets,
  // name,
  // description,
  // tags,
  // urls
  // });

  // console.log(library);
  await library.save();
};

// console.log(fs.readdirSync(`${__dirname}/extensions/`));

fs.readdir(`${__dirname}/extensions/`, (err, list) => {
  list = list.filter(item => !/(^|\/)\.[^\/\.]/g.test(item));
  list.forEach(lib => {
    createLibrary({ fileName: lib });
  });
});
