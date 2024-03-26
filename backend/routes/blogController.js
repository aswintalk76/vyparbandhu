
const express = require('express')
const app = express()
const cors = require('cors');
const blogModal = require('../model/blogModal');
app.use(cors())

const router = express.Router();


router.post('/add', async (req, res) => {
    const { heading, image, details, link, description } = req.body;

    try {


        const newDoc = new blogModal({ image: image, heading: heading, link: link? link:'', details: details, description: description });
        console.log(newDoc)
        await newDoc.save();

        res.status(200).json({ message: 'create blog  successfully' });

    } catch (error) {
        console.error('Error create account:', error);
        res.status(500).json({ error: 'Failed create account' });
    }
});

router.get('/list', async (req, res) => {
    
    try {
        const existingData = await blogModal.find();
        console.log(existingData)
        res.status(200).json(existingData);
    } catch (error) {
        console.error('Error updating user information:', error);
        res.status(500).json({ error: 'Failed to update user information' });
    }
});

router.post('/delete', async (req, res) => {
    try {
        console.log(req.body);
        const dataId = req.body.dataId;
        await blogModal.deleteOne({ _id: dataId });
        res.status(200).json({ message: 'Document deleted successfully' });
    } catch (error) {
        console.error('Error deleting document:', error);
        res.status(500).json({ error: 'Failed to delete document' });
    }
});



router.post('/edit', async (req, res) => {
    const { heading, image, details, link, description, id } = req.body;

    try {
        const existingData = await blogModal.findById(id);
        console.log(existingData)
        console.log(heading, image, details, link, description)
        if (!existingData) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (description) {
            existingData.description = description;
        }
        if (link) {
            existingData.link = link;
        }
        if (details) {
            existingData.details = details;
        }
        if (heading) {
            existingData.heading = heading;
        }
        if (image) {
            existingData.name = image;
        }
    

        // Save the updated user document
        await existingData.save();

        res.status(200).json({ message: 'User information updated successfully', user: existingData });
    } catch (error) {
        console.error('Error updating user information:', error);
        res.status(500).json({ error: 'Failed to update user information' });
    }
});
router.post('/getById', async (req, res) => {
    const {  id } = req.body;

    try {
        const existingData = await blogModal.findById(id);
        if (!existingData) {
            return res.status(404).json({ error: 'User not found' });
        }

       

        res.status(200).json(existingData);
    } catch (error) {
        console.error('Error updating user information:', error);
        res.status(500).json({ error: 'Failed to update user information' });
    }
});


// router.post('/ForgotPassword', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const existingData = await blogModal.findOne({ email });
//         if (!existingData) {
//             return res.status(400).send({ error: 'Email does not exist' });
//         } else {
//             // Update the password
//             existingData.password = password;
//             await existingData.save();

//             res.status(200).json({ message: 'Password updated successfully' });
//         }
//     } catch (error) {
//         console.error('Error updating password:', error);
//         res.status(500).json({ error: 'Failed to update password' });
//     }
// });

// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const existingData = await blogModal.findOne({ email });
//         if (existingData) {
//             if (existingData.password === password) {

//                 res.status(200).json(existingData);
//             }
//             else {
//                 res.status(500).json({ error: 'Not find account' });

//             }
//         }

//     } catch (error) {
//         console.error('Error create account:', error);
//         res.status(500).json({ error: 'Failed create account' });
//     }
// });


// router.post('/editAccount', async (req, res) => {
//     const { email, name, number, id } = req.body;

//     try {
//         // Find the user by ID
//         const existingData = await blogModal.findById(id);
//         console.log(existingData)
//         if (!existingData) {
//             return res.status(404).json({ error: 'User not found' });
//         }

//         // Update the user information
//         if (email) {
//             existingData.email = email;
//         }
//         if (name) {
//             existingData.name = name;
//         }
//         if (number) {
//             existingData.number = number;
//         }

//         // Save the updated user document
//         await existingData.save();

//         res.status(200).json({ message: 'User information updated successfully', user: existingData });
//     } catch (error) {
//         console.error('Error updating user information:', error);
//         res.status(500).json({ error: 'Failed to update user information' });
//     }
// });

// router.post('/getuser', async (req, res) => {
//     const { id } = req.body;

//     try {
//         const existingData = await blogModal.findById(id);
//         if (!existingData) {
//             return res.status(404).json({ error: 'User not found' });
//         }
//         res.status(200).json({ message: 'User information get successfully', user: existingData });
//     } catch (error) {
//         console.error('Error updating user information:', error);
//         res.status(500).json({ error: 'Failed to update user information' });
//     }
// });

// router.post('/addDocuments', async (req, res) => {
//     const { image, name, id } = req.body;

//     try {
//         const existingData = await blogModal.findById(id);

//         if (!existingData) {
//             return res.status(404).json({ error: 'User not found' });
//         }

//         // Add new document to the documents array
//         existingData.documents.push({ image, name });

//         // Save the updated user document
//         await existingData.save();

//         res.status(200).json({ message: 'Documents updated successfully', user: existingData });
//     } catch (error) {
//         console.error('Error updating documents:', error);
//         res.status(500).json({ error: 'Failed to update documents' });
//     }
// });

// router.post('/deleteDocument', async (req, res) => {
//     const { userId, docId } = req.body;

//     try {
//         // Find the user by ID
//         const existingData = await blogModal.findById({ _id: userId });

//         if (!existingData) {
//             return res.status(404).json({ error: 'User not found' });
//         }

//         // Find the index of the document within the user's documents array
//         const documentIndex = existingData.documents.findIndex(doc => doc._id == docId);

//         if (documentIndex === -1) {
//             return res.status(404).json({ error: 'Document not found' });
//         }

//         // Remove the document from the documents array
//         existingData.documents.splice(documentIndex, 1);

//         // Save the updated user document
//         await existingData.save();

//         res.status(200).json({ message: 'Document deleted successfully', user: existingData });
//     } catch (error) {
//         console.error('Error deleting document:', error);
//         res.status(500).json({ error: 'Failed to delete document' });
//     }
// });





module.exports = router
