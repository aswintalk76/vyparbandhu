const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    email: {
        type: String,
    },
    number: {
        type: Number,
    },
  
    doubt: {
        type: String,
    },
 
});

const ConatctUsCallModal = mongoose.model('ContactUS', contactSchema);

module.exports = ConatctUsCallModal;