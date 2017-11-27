const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  date: { type: String, require: true },
  notes: { type: String },
  photos: { type: Array }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
