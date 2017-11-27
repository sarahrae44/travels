const mongoose = require('mongoose');

const contributorSchema = mongoose.Schema({
  name: String
});

const Contributor = mongoose.model('Contributor', contributorSchema);

module.exports = Contributor;
