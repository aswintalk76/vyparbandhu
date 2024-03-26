const mongoose = require('mongoose');


const blogSchema = new mongoose.Schema({
    heading: {
        type: String,
    },
  
    image: {
        type: String,
    },
    details: {
        type: String,
    },
    link: {
        type: String,
    },
    description: {
        type: String,
    },
    
  
});

const blogModal = mongoose.model('Blog', blogSchema);

module.exports = blogModal;