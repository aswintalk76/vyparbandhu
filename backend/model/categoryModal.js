const mongoose = require('mongoose');


const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    subcategories: [{
        name: {
            type: String,
            required: true
        },
        innerCategories: [{
            type: String,
            required: true,
            unique: true
        }]
    }]
});

const categoryModal = mongoose.model('Category', categorySchema);

module.exports = categoryModal;