const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    price: String
});

module.exports = mongoose.model('Meal', mealSchema);
