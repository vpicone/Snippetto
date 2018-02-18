const mongoose = require("mongoose");
mongoose.Promise = Promise;
const Schema = mongoose.Schema;

const SnippetSchema = new Schema({
  prefix: "string",
  snippetName: { type: String },
  body: ["string"],
  description: "string"
});

const LibrarySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  publisher: String,
  description: String,
  version: String,
  languages: [String],
  image: Schema.Types.Mixed,
  links: [
    {
      name: String,
      url: String
    }
  ],
  snippets: [
    {
      prefix: String,
      name: String,
      body: [String],
      description: String
    }
  ]
});

const Library = mongoose.model("library", LibrarySchema);

module.exports = Library;
