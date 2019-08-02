const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function() {
    mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true, autoIndex: false })
    .then(() => winston.info('connected to MongoDB...'));
}