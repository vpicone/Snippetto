const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SnippetSchema = new Schema({
  name: String,
  prefix: String,
  body: [String],
  description: String
});

const LibrarySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  language: {
    type: String,
    trim: true
  },
  url: {
    type: String,
    lowercase: true,
    unique: true,
    trim: true
  },
  description: String,
  snippets: [SnippetSchema],
  highScore: {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user"
    },
    score: Number
  }
});

const Library = mongoose.model("library", LibrarySchema);

module.exports = Library;
