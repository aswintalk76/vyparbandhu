const express = require('express')
const app = express()
const cors = require('cors');
app.use(cors())
const DocumentListModal = require('../model/documentListModal');
app.use(cors())
const multer = require('multer')
const path = require("path");
const fs = require('fs')
const router = express.Router();


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, path.join(__dirname, 'Documents')); // Destination folder for storing files
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname); // Filename with timestamp to avoid overwriting
//     }
// });

// const upload = multer({ storage: storage });

router.post('/create', async (req, res) => {

    try {
        const { name, file } = req.body;


        const newDoc = new DocumentListModal({ name: name, image: file });

        await newDoc.save();

        res.status(200).json({ message: 'Document Type saved successfully' });
    } catch (error) {
        console.error('Error uploading document:', error);
        res.status(500).json({ error: 'Failed to upload document' });
    }

});


router.get('/list', async (req, res) => {

    try {
        const documentData = await DocumentListModal.find();
        res.status(200).json(documentData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

});

router.post('/delete', async (req, res) => {

    try {
        const { dataId } = req.body;

        const documentData = await DocumentListModal.findByIdAndDelete({ _id: dataId });
        res.status(200).json({ message: 'Document Type delete successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

});




module.exports = router