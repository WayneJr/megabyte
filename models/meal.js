const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    price: String,
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
});

module.exports = mongoose.model('Meal', mealSchema);
