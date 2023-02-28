const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  title: String,
  miniature: String,
  content: String,
  path: {
    type: String,
    unique: true,
  },
  created_at: Date,
});
module.exports = mongoose.models("Post", PostSchema);
