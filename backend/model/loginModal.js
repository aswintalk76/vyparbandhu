const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
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
  
    password: {
        type: String,
        required: true
    },
    documents: [{
        image:String,
        name: String
    }],
});

const LoginModal = mongoose.model('Login', loginSchema);

module.exports = LoginModal;