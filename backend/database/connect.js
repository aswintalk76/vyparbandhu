const mongoose = require("mongoose");
const dotenv = require('dotenv');

dotenv.config();
const connectDB = async ()=>{
        const conn =  mongoose.connect(`${process.env.MONGO_URL}`);
        console.log('mongodb connect');
        
};

module.exports = connectDB;