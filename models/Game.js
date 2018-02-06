const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GameSnippet = new Schema({
  name: String,
  prefix: String,
  description: String,
  completed: {
    type: Boolean,
    default: false
  },
  completeTime: {
    type: Number,
    default: 5
  },
  correctlyAnswered: {
    type: Boolean,
    default: false
  }
});

const GameSchema = new Schema({
  library: {
    type: Schema.Types.ObjectId,
    required: [true, "Must supply a library for new games."],
    ref: "library"
  },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, "Must supply a user for new games."],
    ref: "user"
  },
  currentScore: {
    type: Number,
    default: 0
  },
  snippets: [GameSnippet]
});

GameSchema.virtual("completed").get(function() {
  return this.snippets.filter(snippet => snippet.completed).length === 0;
});

const Game = mongoose.model("game", GameSchema);

module.exports = Game;
