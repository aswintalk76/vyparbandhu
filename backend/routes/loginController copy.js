
const express = require('express')
const app = express()
const cors = require('cors');
const Aws = require('aws-sdk');
const multer = require('multer');

const LoginModal = require('../model/loginModal');
app.use(cors())
require('dotenv/config');

const router = express.Router();

const storage = multer.memoryStorage({
    destination: function (req, file, cb) {
        cb(null, '');
    }
});

const upload = multer({ storage: storage });

const s3 = new Aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET
});


router.post('/createAccount', async (req, res) => {
    const { email, name, number, password } = req.body;

    try {
        const existingData = await LoginModal.findOne({ email });
        if (existingData) {
            return res.status(400).send({ error: 'email already exists' });
        }
        const existingData1 = await LoginModal.findOne({ number });
        if (existingData1) {
            return res.status(400).send({ error: 'number already exists' });
        }
        else {

            const newDoc = new LoginModal({ name: name, email: email, password: password, number: number });

            await newDoc.save();

            res.status(200).json({ message: 'create account  successfully' });
        }
    } catch (error) {
        console.error('Error create account:', error);
        res.status(500).json({ error: 'Failed create account' });
    }
});

router.post('/ForgotPassword', async (req, res) => {
    const { email, password } = req.body;

        try {
        const existingData = await LoginModal.findOne({ email });
        if (!existingData) {
            return res.status(400).send({ error: 'Email does not exist' });
        } else {
            // Update the password
            existingData.password = password;
            await existingData.save();

            res.status(200).json({ message: 'Password updated successfully' });
        }
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ error: 'Failed to update password' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingData = await LoginModal.findOne({ email });
        if (existingData) {
            if (existingData.password === password) {

                res.status(200).json(existingData);
            }
            else {
                res.status(500).json({ error: 'Not find account' });

            }
        }

    } catch (error) {
        console.error('Error create account:', error);
        res.status(500).json({ error: 'Failed create account' });
    }
});


router.post('/editAccount', async (req, res) => {
    const { email, name, number, id } = req.body;

    try {
        // Find the user by ID
        const existingData = await LoginModal.findById(id);
        console.log(existingData)
        if (!existingData) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update the user information
        if (email) {
            existingData.email = email;
        }
        if (name) {
            existingData.name = name;
        }
        if (number) {
            existingData.number = number;
        }

        // Save the updated user document
        await existingData.save();

        res.status(200).json({ message: 'User information updated successfully', user: existingData });
    } catch (error) {
        console.error('Error updating user information:', error);
        res.status(500).json({ error: 'Failed to update user information' });
    }
});

router.post('/getuser', async (req, res) => {
    const { id } = req.body;

    try {
        const existingData = await LoginModal.findById(id);
        if (!existingData) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User information get successfully', user: existingData });
    } catch (error) {
        console.error('Error updating user information:', error);
        res.status(500).json({ error: 'Failed to update user information' });
    }
});

router.post('/addDocuments', upload.single('productimage'),async (req, res) => {

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: req.file.originalname,
        Body: req.file.buffer,
        ContentType: 'image/jpeg'
    };
    s3.upload(params, (error, data) => {
        if (error) {
            res.status(500).send({ "err": error });
        } else {
            const product = new Product({
                name: req.body.name,
                price: req.body.price,
                productImage: data.Location
            });
            product.save()
                .then(result => {
                    res.status(200).send({
                        _id: result._id,
                        name: result.name,
                        price: result.price,
                        productImage: data.Location
                    });
                })
                .catch(err => {
                    res.status(500).send({ message: err });
                });
        }
    });
    // ============
    // console.log("sssssss");
    // const { name, id } = req.body;
    // console.log(req.body)
    // return

    // try {
    //     const existingData = await LoginModal.findById(id);

    //     if (!existingData) {
    //         return res.status(404).json({ error: 'User not found' });
    //     }

    //     // Add new document to the documents array
    //     existingData.documents.push({ image, name });

    //     // Save the updated user document
    //     await existingData.save();

    //     res.status(200).json({ message: 'Documents updated successfully', user: existingData });
    // } catch (error) {
    //     console.error('Error updating documents:', error);
    //     res.status(500).json({ error: 'Failed to update documents' });
    // }
});

router.post('/deleteDocument', async (req, res) => {
    const { userId, docId } = req.body;

    try {
        // Find the user by ID
        const existingData = await LoginModal.findById({_id:userId});

        if (!existingData) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Find the index of the document within the user's documents array
        const documentIndex = existingData.documents.findIndex(doc => doc._id == docId);

        if (documentIndex === -1) {
            return res.status(404).json({ error: 'Document not found' });
        }

        // Remove the document from the documents array
        existingData.documents.splice(documentIndex, 1);

        // Save the updated user document
        await existingData.save();

        res.status(200).json({ message: 'Document deleted successfully', user: existingData });
    } catch (error) {
        console.error('Error deleting document:', error);
        res.status(500).json({ error: 'Failed to delete document' });
    }
});





module.exports = router
