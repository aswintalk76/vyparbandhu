const mongoose = require('mongoose');

const dcoumentListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },

});

const DocumentListModal = mongoose.model('DocumentList', dcoumentListSchema);

module.exports = DocumentListModal;