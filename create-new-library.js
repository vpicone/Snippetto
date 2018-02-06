const _ = require("lodash");
const mongoose = require("mongoose");
const prompt = require("prompt");
const fs = require("fs");
const path = require("path");
const xml2js = require("xml2js");

const Library = require("./models/Library");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/snipetto", {
  useMongoClient: true
});

async function getLibraryObject(fileName) {
  const filePath = path.join(__dirname, `extensions/${fileName}`);
  let metadata = {};

  var parser = new xml2js.Parser();
  fs.readFile(filePath + "/extension.vsixmanifest", function(err, data) {
    parser.parseString(data, function(err, result) {
      // metadata = result;
      console.log(result.PackageManifest.Metadata);
    });
  });

  const fileNames = await fs.readdirSync(filePath + "/extension/snippets");
  const pooledSnippets = {};
  fileNames.forEach(fileName => {
    const data = fs.readFileSync(`${filePath}/extension/snippets/${fileName}`);
    Object.entries(JSON.parse(data)).forEach(([key, value]) => {
      pooledSnippets[key] = value;
    });
  });

  const {DisplayName, Description, }
  return pooledSnippets;
}

const createLibrary = ({ libraryObject, name, language, url }) => {
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

  const library = new Library({ snippets, name, language, url });
  library.save();
};

const schema = {
  properties: {
    fileName: {
      description: "File name in extensions folder",
      required: true
    },
    name: {
      description: "Name of the snippet library",
      required: true
    },
    language: {
      description:
        "Name of the primary snippet programming language (default: Other)",
      default: "Other"
    },
    url: {
      description: "VSCode marketplace URL",
      required: true
    }
  }
};

// prompt.start();

// prompt.get(schema, async (err, result) => {
//   if (err) {
//     console.log("\n\nExiting early.");
//     process.exit(0);
//   }
const libraryObject = getLibraryObject("onecentlin.laravel-blade-1.13.0");

// createLibrary({ libraryObject, ...result });
// });
