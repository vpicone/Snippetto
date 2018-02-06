const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ScoreSchema = new Schema({
  library: {
    type: Schema.Types.ObjectId,
    ref: "library",
    required: [true, "Must supply a library id."]
  },
  score: {
    type: Number,
    required: [true, "Must supply a score value"]
  },
  date: Date
});

const UserSchema = new Schema({
  email: String,
  username: {
    type: String,
    required: [true, "Username is required"]
  },
  bio: String,
  accountCreationDate: {
    type: Date,
    default: Date.now
  },
  scores: [ScoreSchema]
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
