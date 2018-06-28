const mongoose = require('mongoose');
const {Schema} = mongoose;

const reviewSchema = new Schema({
    rating: Number,
    content: String
});

module.exports = reviewSchema;