const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SnippetSchema = new Schema({
  name: String,
  prefix: String,
  body: [String],
  description: String
});

const LinkSchema = new Schema({
  name: String,
  url: String
});

const LibrarySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  tags: {
    type: [String],
    lowercase: true,
    trim: true
  },
  links: [LinkSchema],
  description: String,
  snippets: [SnippetSchema]
});

const Library = mongoose.model("library", LibrarySchema);

module.exports = Library;
