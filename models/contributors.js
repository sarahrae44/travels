const mongoose = require('mongoose');
const Post = require('./posts.js');

const contributorSchema = mongoose.Schema({
  name: String,
  posts: [Post.schema]
});

const Contributor = mongoose.model('Contributor', contributorSchema);

module.exports = Contributor;
