const mongoose = require('mongoose');
const { Schema } = mongoose;
const ReviewSchema = require('./Review');

const productSchema = new Schema({
    productName: String,
    basePrice: Number,
    category: String,
    brand: String,
    productMaterial: String,
    imageUrl: String,
    delivery: Date,
    details: String,
    reviews: [ReviewSchema]
});

mongoose.model('products',productSchema);