const mongoose = require('mongoose');

const dcoumentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    premium: {
        type: Boolean,
        required: true
    },
    type: {
        type: String,
        required: true
    }
});

const DocumentModal = mongoose.model('Document', dcoumentSchema);

module.exports = DocumentModal;