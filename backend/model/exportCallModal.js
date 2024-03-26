const mongoose = require('mongoose');

const expertSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
  
    detail: {
        type: String,
    },
 
});

const ExpertCallModal = mongoose.model('ExpertCall', expertSchema);

module.exports = ExpertCallModal;