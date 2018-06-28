const mongoose = require('mongoose');
const Request = require('request');

const Product = mongoose.model('products');

module.exports = app => {
    app.post('/api/add/products', (req, res) => {
        Request.get('http://internal.ats-digital.com:3066/api/products', (error, response, body) => {
            if (error) {
                return console.dir(error);
            }
            Product.insertMany(JSON.parse(body));
        });
    });

    app.get('/api/get/products', (req, res) => {
        Product.find().exec(function (err, data) {
            if (err) console.log(err);
            res.send(data);
        });
    });
};