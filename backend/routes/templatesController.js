const express = require('express')
const app = express()
const cors = require('cors');
const DocumentModal = require('../model/documentModal');
app.use(cors())
const multer = require('multer')
const path = require("path");
const fs = require('fs')
const router = express.Router();



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'Documents')); // Destination folder for storing files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Filename with timestamp to avoid overwriting
    }
});

const upload = multer({ storage: storage });

router.post('/upload', async (req, res) => {
    console.log(req)
    try {
        const { premium, type, name, file } = req.body;
        // console.log(req.file.file, ' req.file')
        // if (!req.file) {
        //     return res.status(400).json({ error: 'No file uploaded' });
        // }

        // const filePath = path.relative(path.join(__dirname, 'Documents'), req.file.path);

        // Save the file path in MongoDB
        const newDoc = new DocumentModal({ fileName: file, premium, type, name });

        await newDoc.save();

        res.status(200).json({ message: 'Document uploaded successfully' });
    } catch (error) {
        console.error('Error uploading document:', error);
        res.status(500).json({ error: 'Failed to upload document' });
    }
});

router.get('/file/:filename', (req, res) => {
    const fileName = req.params.filename;
    console.log(fileName)
    res.sendFile(__dirname + `/Documents/${fileName}`);
});


router.post('/delete', async (req, res) => {
    try {
        console.log(req.body);
        const dataId = req.body.dataId;

        // Find the document data based on the _id
        const documentData = await DocumentModal.findOne({ _id: dataId });

        if (!documentData) {
            return res.status(404).json({ error: 'Document not found' });
        }

        // Delete the document data from MongoDB

        // Delete the associated file from the Documents folder
        // const filePath = path.join(__dirname, 'Documents', documentData.fileName);
        // fs.unlink(filePath, (err) => {
        //     if (err) {
        //         console.error('Error deleting file:', err);
        //         return res.status(500).json({ error: 'Failed to delete file' });
        //     }
        //     console.log('File deleted successfully');
        // });

        await DocumentModal.deleteOne({ _id: dataId });
        res.status(200).json({ message: 'Document deleted successfully' });
    } catch (error) {
        console.error('Error deleting document:', error);
        res.status(500).json({ error: 'Failed to delete document' });
    }
});




router.get('/list', async (req, res) => {

    try {
        const documentData = await DocumentModal.find();
        res.status(200).json(documentData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

});


module.exports = router