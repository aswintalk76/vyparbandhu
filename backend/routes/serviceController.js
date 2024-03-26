const express = require('express')
const app = express()
const cors = require('cors');
const serviceDataModal = require('../model/serviceDataModal');
app.use(cors())
const multer = require('multer')
const path = require("path");
const fs = require('fs');
const serviceDataModel = require('../model/serviceDataModal');
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

router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const { premium, type, name } = req.body;
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const filePath = path.relative(path.join(__dirname, 'Documents'), req.file.path);

        // Save the file path in MongoDB
        const newDoc = new DocumentModal({ fileName: filePath, premium, type, name });

        await newDoc.save();

        res.status(200).json({ message: 'Document uploaded successfully' });
    } catch (error) {
        console.error('Error uploading document:', error);
        res.status(500).json({ error: 'Failed to upload document' });
    }
});

router.get('/file/:filename', (req, res) => {
    const fileName = req.params.filename;
    res.sendFile(__dirname + `/Documents/${fileName}`);
});


router.post('/delete', async (req, res) => {
    try {
        const dataId = req.body.dataId;

        // Find the document data based on the _id
        const documentData = await serviceDataModal.findOne({ _id: dataId });

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

        await serviceDataModal.deleteOne({ _id: dataId });
        res.status(200).json({ message: 'Document deleted successfully' });
    } catch (error) {
        console.error('Error deleting document:', error);
        res.status(500).json({ error: 'Failed to delete document' });
    }
});




router.get('/list', async (req, res) => {

    try {
        const documentData = await serviceDataModal.find();
        res.status(200).json(documentData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

});

router.post('/getbyid', async (req, res) => {

    try {
        const { dataId } = req.body;

        const documentData = await serviceDataModal.findById({ _id: dataId });
        if (documentData) {

            res.status(200).json(documentData);
        } else {
            res.status(400).send({ message: "Document not Found" });

        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

});

router.post('/updateStep1', async (req, res) => {
    const { heading, details, dataId, file } = req.body;
    const document = await serviceDataModal.findById(dataId);
    try {

        if (file) {

            if (document) {
                document.heading = heading;
                document.details = details;
                document.images = file;
                await document.save(); // Save the updated document

                res.status(200).json({ message: 'Document updated successfully', document });
            } else {
                res.status(404).json({ error: 'Document not found' });
            }
        } else {
            if (document) {
                document.heading = heading;
                document.details = details;
                await document.save(); // Save the updated document

                // console.log("Updated document:", document);
                res.status(200).json({ message: 'Document updated successfully', document });
            } else {
                res.status(404).json({ error: 'Document not found' });
            }
        }

    } catch (e) {
        console.error(e);
        res.status(500).send({ error: 'Internal server error' });
    }
})



// Route to handle creation of data
router.post('/create', async (req, res) => {
    try {
        // Extract data from request body
        const { mainCategoryName, subCategoryName, innerCategoryName, heading, details, file } = req.body;

        const existingData = await serviceDataModal.findOne({ innerCategoryName });
        if (existingData) {
            return res.status(400).send({ error: 'Inner category already exists' });
        }


        // Create a new data instance
        const newData = new serviceDataModal({
            mainCategoryName,
            subCategoryName,
            innerCategoryName,
            heading,
            details,
            images: file,
            stepTwoData: [{
                name: "",
                icon: "",
                description: ""
            }],
            stepThreeData: [{
                heading: "",
                image: "",
                questions: [{
                    question: "",
                    description: ""
                }]
            }],
            requirements: [{
                heading: "",
                details: [{
                    name: "",
                }
                ]
            }],

            stepFourData: [{
                heading: "",
                description: "",
                images: [{
                    filename: ""
                }]
            }],
            stepFiveData: [{
                heading: '',
                description: '',
                documentsData: [{
                    icon: '',
                    document: ''
                }]
            }],
            process: [{
                heading: "",
                processData: [{
                    stepName: "",
                    description: ""
                }]
            }],
            incorporation: [{
                heading: "",
                details: [{
                    name: "",
                }
                ]
            }],
            stepSixData: [{
                package: "",
                amount: "00",
                description: ""
            }],
            youtubeLink: [{ link: "", heading: "" }],
            faqData: [{
                question: "",
                answer: ""
            }]

        });

        await newData.save();

        // Send a success response
        res.status(200).json(newData);


    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).send({ error: 'Internal server error' });
    }
});

router.post('/updateStep2', async (req, res) => {

    const { type, mainCategoryid } = req.body
    if (type === "Add Attributes") {
        const document = await serviceDataModal.findById({ _id: mainCategoryid });
        const newStepTwoData = {
            name: "",
            icon: "",
            description: ""
        };
        // Add the new blank object to the stepTwoData array
        document.stepTwoData.push(newStepTwoData);
        await document.save();

        res.status(200).json({ message: "Add Attribute succefully" });

    }
    else {

        try {

            const { mainCategoryid, setp2dataid, name, description, file } = req.body;

            if (file) {
                const document = await serviceDataModal.findById({ _id: mainCategoryid });

                if (!document) {
                    return res.status(404).json({ error: "Document not found" });
                }

                // Find the stepTwoData object within the document by its _id
                const stepTwoDataIndex = document.stepTwoData.findIndex(data => data._id.toString() === setp2dataid);

                if (stepTwoDataIndex === -1) {
                    const newStepTwoData = {
                        name: "",
                        icon: "",
                        description: ""
                    };
                    // Add the new blank object to the stepTwoData array
                    document.stepTwoData.push(newStepTwoData);
                    await document.save();

                    res.status(200).json(document.stepTwoData);
                }
                else {

                    document.stepTwoData[stepTwoDataIndex].name = name;
                    document.stepTwoData[stepTwoDataIndex].icon = file;
                    document.stepTwoData[stepTwoDataIndex].description = description;
                    await document.save();

                    // Send a success response with the updated stepTwoData object
                    res.status(200).json(document.stepTwoData[stepTwoDataIndex]);
                }
            }
            else {
                const document = await serviceDataModal.findById({ _id: mainCategoryid });
                if (!document) {
                    return res.status(404).json({ error: "Document not found" });
                }
                const stepTwoDataIndex = document.stepTwoData.findIndex(data => data._id.toString() === setp2dataid);
                if (stepTwoDataIndex === -1) {
                    const newStepTwoData = {
                        name: "",
                        icon: "",
                        description: ""
                    };
                    document.stepTwoData.push(newStepTwoData);
                    await document.save();
                    res.status(200).json(document.stepTwoData);
                }
                else {
                    document.stepTwoData[stepTwoDataIndex].name = name;
                    document.stepTwoData[stepTwoDataIndex].description = description;
                    await document.save();
                    res.status(200).json(document.stepTwoData[stepTwoDataIndex]);
                }
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal server error' });
        }
    }
});


router.post('/deletestep2', async (req, res) => {
    const { mainCategoryid, innerCategoryid } = req.body;
    console.log(innerCategoryid)
    try {
        const document = await serviceDataModal.findById({ _id: mainCategoryid });
        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }


        document.stepTwoData = document.stepTwoData.filter(data => data._id.toString() !== innerCategoryid);
        await document.save();
        res.status(200).json({ message: 'StepTwoData deleted successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal server error' });
    }
})





router.post('/updateStep3', upload.single('file'), async (req, res) => {

    const { type, mainCategoryid, innerId } = req.body
    if (type === "Add Section") {
        const document = await serviceDataModal.findById({ _id: mainCategoryid });
        const newStepTwoData = {
            heading: "",
            image: "",
            questions: [{
                question: "",
                description: ""
            }]
        };
        // Add the new blank object to the stepTwoData array
        document.stepThreeData.push(newStepTwoData);
        await document.save();

        res.status(200).json({ message: "Add Attribute succefully" });

    }
    else if (type === "Add Attribute") {
        const document = await serviceDataModal.findById({ _id: mainCategoryid });
        const newStepTwoData = {
            question: "",
            description: ""
        };

        // Find the correct object in the stepThreeData array
        const targetObjectIndex = document.stepThreeData.findIndex(item => item._id.toString() === innerId);

        if (targetObjectIndex !== -1) {
            // Push the new question object into the questions array of the found object
            document.stepThreeData[targetObjectIndex].questions.push(newStepTwoData);

            // Save the updated document
            await document.save();

            res.status(200).json({ message: "Attribute added successfully" });
        } else {
            res.status(404).json({ message: "Object not found" });
        }

    }



})

router.post('/updateStep3Heading', async (req, res) => {
    const { heading, mainCategoryid, innerId, file } = req.body;
    try {
        // Find the document by ID
        const doc = await serviceDataModal.findById({ _id: mainCategoryid });

        if (!doc) {
            return res.status(404).json({ message: 'Document not found' });
        }

        // Find the specific object within stepThreeData array
        const objToUpdate = doc.stepThreeData.find(obj => obj._id.toString() === innerId);

        if (!objToUpdate) {
            return res.status(404).json({ message: 'Object not found within stepThreeData' });
        }

        if (file) {

            objToUpdate.heading = heading;
            objToUpdate.image = file;
            await doc.save();


            res.status(200).json({ message: 'Object updated successfully', data: objToUpdate });

        } else {

            objToUpdate.heading = heading;

            await doc.save();

            res.status(200).json({ message: 'Object updated successfully', data: objToUpdate });
        }



        // Save the updated document
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
})

router.post('/updateStep3questions', async (req, res) => {
    const { question, description, innerId, questionId, mainCategoryid } = req.body;


    try {
        const doc = await serviceDataModel.findById({ _id: mainCategoryid });

        if (!doc) {
            return res.status(404).json({ message: 'Document not found' });
        }

        const objToUpdate = doc.stepThreeData.find(obj => obj._id.toString() === innerId);

        if (!objToUpdate) {
            return res.status(404).json({ message: 'Object not found within stepThreeData' });
        }

        if (objToUpdate.questions && objToUpdate.questions.length > 0) {
            const questionToUpdate = objToUpdate.questions.find(q => q._id.toString() === questionId);

            if (!questionToUpdate) {
                return res.status(404).json({ message: 'Question not found within stepThreeData' });
            }

            if (question) {
                questionToUpdate.question = question;
            }
            if (description) {
                questionToUpdate.description = description;
            }
        } else {
            return res.status(404).json({ message: 'No questions found within stepThreeData' });
        }

        await doc.save();

        res.status(200).json({ message: 'Question updated successfully', data: objToUpdate });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
})


router.post('/deletestep3', async (req, res) => {
    const { mainCategoryid, innerCategoryid, type, innerId } = req.body;
    if (type === "Delete Section") {

        try {
            const document = await serviceDataModal.findById({ _id: mainCategoryid });
            if (!document) {
                return res.status(404).json({ message: 'Document not found' });
            }


            document.stepThreeData = document.stepThreeData.filter(data => data._id.toString() !== innerCategoryid);

            await document.save();
            res.status(200).json({ message: 'StepTwoData deleted successfully' });

        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal server error' });

        }
    }
    else {

        try {
            const document = await serviceDataModal.findById({ _id: mainCategoryid });
            if (!document) {
                return res.status(404).json({ message: 'Document not found' });
            }

            const targetObjectIndex = document.stepThreeData.findIndex(item => item._id.toString() === innerId);

            if (targetObjectIndex !== -1) {
                const updatedQuestions = document.stepThreeData[targetObjectIndex].questions.filter(item => item._id.toString() !== innerCategoryid);

                // Update the questions array of the found object with the filtered questions
                document.stepThreeData[targetObjectIndex].questions = updatedQuestions;

                // Save the updated document
                await document.save();

                res.status(200).json({ message: 'Question deleted successfully' });
            } else {
                res.status(404).json({ message: 'Object not found' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal server error' });
        }


    }
})

router.post('/addstep4', async (req, res) => {
    const { mainCategoryid } = req.body
    const document = await serviceDataModal.findById({ _id: mainCategoryid });
    const newStepFourData = {
        heading: "",
        description: "",
        images: [
            {
                filename: "",
            }
        ],
    }
    // Add the new blank object to the stepTwoData array
    document.stepFourData.push(newStepFourData);
    await document.save();

    res.status(200).json({ message: "Add Attribute succefully" });


})

router.post('/addstep4Attribute', async (req, res) => {
    const { mainCategoryid, innerId } = req.body
    const newStepFourData = {
        filename: "",
    }
    const document = await serviceDataModal.findById({ _id: mainCategoryid });
    const targetObjectIndex = document.stepFourData.findIndex(item => item._id.toString() === innerId);
    if (targetObjectIndex !== -1) {
        document.stepFourData[targetObjectIndex].images.push(newStepFourData);
        await document.save();
        res.status(200).json({ message: "Attribute added successfully" });
    } else {
        res.status(404).json({ message: "Object not found" });
    }


})

router.post('/deletestep4Attribute', async (req, res) => {
    const { mainCategoryid, innerId, innerCategoryid } = req.body;
    try {
        const document = await serviceDataModal.findById({ _id: mainCategoryid });
        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }

        const targetObjectIndex = document.stepFourData.findIndex(item => item._id.toString() === innerId);

        if (targetObjectIndex !== -1) {
            const updatedImages = document.stepFourData[targetObjectIndex].images.filter(image => image._id.toString() !== innerCategoryid);

            // Get the filename of the image to be deleted
            const imageToDelete = document.stepFourData[targetObjectIndex].images.find(image => image._id.toString() === innerCategoryid);
            const filenameToDelete = imageToDelete ? imageToDelete.filename : null;

            // Delete the image file from the file system if it exists

            // Update the images array of the found object with the filtered images
            document.stepFourData[targetObjectIndex].images = updatedImages;

            // Save the updated document
            await document.save();

            res.status(200).json({ message: 'Image deleted successfully' });
        } else {
            res.status(404).json({ message: 'Object not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal server error' });
    }
});




router.post('/deletestep4section', async (req, res) => {
    const { mainCategoryid, innerCategoryid } = req.body
    try {
        const document = await serviceDataModal.findById({ _id: mainCategoryid });
        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }


        document.stepFourData = document.stepFourData.filter(data => data._id.toString() !== innerCategoryid);

        await document.save();
        res.status(200).json({ message: 'step4Data deleted successfully' });


    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal server error' });

    }


})



router.post('/updateStep4Heading', async (req, res) => {
    const { heading, mainCategoryid, innerId, description } = req.body;
    try {
        // Find the document by ID
        const doc = await serviceDataModal.findById({ _id: mainCategoryid });

        if (!doc) {
            return res.status(404).json({ message: 'Document not found' });
        }

        // Find the specific object within stepThreeData array
        const objToUpdate = doc.stepFourData.find(obj => obj._id.toString() === innerId);

        if (!objToUpdate) {
            return res.status(404).json({ message: 'Object not found within stepThreeData' });
        }



        objToUpdate.heading = heading;
        objToUpdate.description = description;

        await doc.save();

        res.status(200).json({ message: 'Object updated successfully', data: objToUpdate });



        // Save the updated document
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
})


router.post('/updateStep4Images', async (req, res) => {
    const { innerId, imagesId, mainCategoryid, file } = req.body;


    try {
        const doc = await serviceDataModal.findById({ _id: mainCategoryid });

        if (!doc) {
            return res.status(404).json({ message: 'Document not found' });
        }

        const objToUpdate = doc.stepFourData.find(obj => obj._id.toString() === innerId);

        if (!objToUpdate) {
            return res.status(404).json({ message: 'Object not found within stepThreeData' });
        }

        if (objToUpdate.images && objToUpdate.images.length > 0) {
            const questionToUpdate = objToUpdate.images.find(q => q._id.toString() === imagesId);

            if (!questionToUpdate) {
                return res.status(404).json({ message: 'Question not found within stepThreeData' });
            }

            if (file) {

                questionToUpdate.filename = file;
            }

        } else {
            return res.status(404).json({ message: 'No questions found within stepThreeData' });
        }

        await doc.save();

        res.status(200).json({ message: 'Question updated successfully', data: objToUpdate });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
})










router.post('/deleteDocument', async (req, res) => {
    const { mainCategoryid, innerId, innerCategoryid } = req.body;

    try {
        const document = await serviceDataModal.findById({ _id: mainCategoryid });
        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }

        const targetObjectIndex = document.stepFiveData.findIndex(item => item._id.toString() === innerId);

        if (targetObjectIndex !== -1) {
            const updatedQuestions = document.stepFiveData[targetObjectIndex].documentsData.filter(item => item._id.toString() !== innerCategoryid);

            // Update the questions array of the found object with the filtered questions
            document.stepFiveData[targetObjectIndex].documentsData = updatedQuestions;

            // Save the updated document
            await document.save();

            res.status(200).json({ message: 'Question deleted successfully' });
        } else {
            res.status(404).json({ message: 'Object not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal server error' });
    }

})


router.post('/AddDocumentStep5', async (req, res) => {

    const { mainCategoryid, innerId } = req.body



    const document = await serviceDataModal.findById({ _id: mainCategoryid });
    const newFiveData = {
        icon: "",
        document: ""
    };

    // Find the correct object in the stepThreeData array
    const targetObjectIndex = document.stepFiveData.findIndex(item => item._id.toString() === innerId);

    if (targetObjectIndex !== -1) {
        // Push the new question object into the questions array of the found object
        document.stepFiveData[targetObjectIndex].documentsData.push(newFiveData);

        // Save the updated document
        await document.save();

        res.status(200).json({ message: "Attribute added successfully" });
    } else {
        res.status(404).json({ message: "Object not found" });
    }
})

router.post('/updateDocument', async (req, res) => {
    const { mainCategoryid, innerId, document, icon, documentId } = req.body;

    try {
        const doc = await serviceDataModal.findById({ _id: mainCategoryid });

        if (!doc) {
            return res.status(404).json({ message: 'Document not found' });
        }

        const objToUpdate = doc.stepFiveData.find(obj => obj._id.toString() === innerId);

        if (!objToUpdate) {
            return res.status(404).json({ message: 'Object not found within documentsData' });
        }

        if (objToUpdate.documentsData && objToUpdate.documentsData.length > 0) {
            const questionToUpdate = objToUpdate.documentsData.find(q => q._id.toString() === documentId);

            if (!questionToUpdate) {
                return res.status(404).json({ message: 'Document not found within documentsData' });
            }

            if (icon) {
                questionToUpdate.icon = icon;
            }
            if (document) {
                questionToUpdate.document = document;
            }
        } else {
            return res.status(404).json({ message: 'No Document found within documentsData' });
        }

        await doc.save();

        res.status(200).json({ message: 'Document updated successfully', data: objToUpdate });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }

})

router.post('/updateDocumentHeading', async (req, res) => {
    const { heading, mainCategoryid, description, innerId } = req.body;
    try {
        // Find the document by ID
        const doc = await serviceDataModal.findById({ _id: mainCategoryid });

        if (!doc) {
            return res.status(404).json({ message: 'Document not found' });
        }

        // Find the specific object within stepThreeData array
        const objToUpdate = doc.stepFiveData.find(obj => obj._id.toString() === innerId);

        if (!objToUpdate) {
            return res.status(404).json({ message: 'Object not found within stepFiveData' });
        }


        objToUpdate.heading = heading;
        objToUpdate.description = description;

        await doc.save();

        res.status(200).json({ message: 'Object updated successfully', data: objToUpdate });



        // Save the updated document
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
})


router.post('/AddLink', async (req, res) => {

    const { mainCategoryid } = req.body
    const document = await serviceDataModal.findById({ _id: mainCategoryid });
    const youtubeLink = {
        link: "",
        heading: ""
    };
    document.youtubeLink.push(youtubeLink);
    await document.save();
    res.status(200).json({ message: "Add Attribute succefully" });
})


router.post('/deleteLink', async (req, res) => {
    const { mainCategoryid, innerCategoryid } = req.body;

    try {
        const document = await serviceDataModal.findById({ _id: mainCategoryid });
        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }

        document.youtubeLink = document.youtubeLink.filter(data => data._id.toString() !== innerCategoryid);

        await document.save();
        res.status(200).json({ message: 'StepTwoData deleted successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal server error' });

    }

})

router.post('/updateLink', upload.single('file'), async (req, res) => {
    const { mainCategoryid, innerId, link, heading } = req.body;
    try {
        // Find the document by ID
        const doc = await serviceDataModal.findById({ _id: mainCategoryid });

        if (!doc) {
            return res.status(404).json({ message: 'Document not found' });
        }

        // Find the specific object within stepThreeData array
        const objToUpdate = doc.youtubeLink.find(obj => obj._id.toString() === innerId);

        if (!objToUpdate) {
            return res.status(404).json({ message: 'Object not found within stepThreeData' });
        }
        objToUpdate.link = link;
        objToUpdate.heading = heading;

        await doc.save();

        res.status(200).json({ message: 'Object updated successfully', data: objToUpdate });



        // Save the updated document
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
})


router.post('/addstep6', async (req, res) => {
    const { mainCategoryid } = req.body
    const document = await serviceDataModal.findById({ _id: mainCategoryid });
    const newstepSixData = {
        package: "",
        amount: "",
        description: ""
    }
    // Add the new blank object to the stepTwoData array
    document.stepSixData.push(newstepSixData);
    await document.save();

    res.status(200).json({ message: "Add Attribute succefully" });

})



router.post('/deletestep6', async (req, res) => {
    const { mainCategoryid, innerCategoryid } = req.body
    try {
        const document = await serviceDataModal.findById({ _id: mainCategoryid });
        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }


        document.stepSixData = document.stepSixData.filter(data => data._id.toString() !== innerCategoryid);

        await document.save();
        res.status(200).json({ message: 'stepSixData deleted successfully' });


    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal server error' });

    }


})

router.post('/updateStep6', async (req, res) => {
    const { package, mainCategoryid, innerId, amount, description } = req.body;
    try {
        const doc = await serviceDataModal.findById({ _id: mainCategoryid });

        if (!doc) {
            return res.status(404).json({ message: 'Document not found' });
        }
        const objToUpdate = doc.stepSixData.find(obj => obj._id.toString() === innerId);
        if (!objToUpdate) {
            return res.status(404).json({ message: 'Object not found within stepThreeData' });
        }

        objToUpdate.package = package;
        objToUpdate.amount = amount;
        objToUpdate.description = description;

        await doc.save();

        res.status(200).json({ message: 'Object updated successfully', data: objToUpdate });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
})



router.post('/addFaq', async (req, res) => {
    const { mainCategoryid } = req.body
    const document = await serviceDataModal.findById({ _id: mainCategoryid });
    const newfaqData = {
        question: "",
        answer: "",
    }
    // Add the new blank object to the stepTwoData array
    document.faqData.push(newfaqData);
    await document.save();

    res.status(200).json({ message: "Add Attribute succefully" });

})

router.post('/deleteFaq', async (req, res) => {
    const { mainCategoryid, innerCategoryid } = req.body
    try {
        const document = await serviceDataModal.findById({ _id: mainCategoryid });
        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }


        document.faqData = document.faqData.filter(data => data._id.toString() !== innerCategoryid);

        await document.save();
        res.status(200).json({ message: 'faqData deleted successfully' });


    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal server error' });

    }


})


router.post('/updateFaq', async (req, res) => {
    const { question, mainCategoryid, innerId, answer } = req.body;
    try {
        const doc = await serviceDataModal.findById({ _id: mainCategoryid });

        if (!doc) {
            return res.status(404).json({ message: 'Document not found' });
        }
        const objToUpdate = doc.faqData.find(obj => obj._id.toString() === innerId);
        if (!objToUpdate) {
            return res.status(404).json({ message: 'Object not found within stepThreeData' });
        }

        objToUpdate.question = question;
        objToUpdate.answer = answer;

        await doc.save();

        res.status(200).json({ message: 'Object updated successfully', data: objToUpdate });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
})


router.post('/addRequirements', async (req, res) => {
    const { mainCategoryid, innerId } = req.body
    const document = await serviceDataModal.findById({ _id: mainCategoryid });
    const newStepTwoData = {
        name: "",
    };

    // Find the correct object in the stepThreeData array
    const targetObjectIndex = document.requirements.findIndex(item => item._id.toString() === innerId);

    if (targetObjectIndex !== -1) {
        // Push the new question object into the questions array of the found object
        document.requirements[targetObjectIndex].details.push(newStepTwoData);

        // Save the updated document
        await document.save();

        res.status(200).json({ message: "Attribute added successfully" });
    } else {
        res.status(404).json({ message: "Object not found" });
    }

})

router.post('/deleteRequirements', async (req, res) => {
    const { mainCategoryid, innerCategoryid, innerId } = req.body;


    try {
        const document = await serviceDataModal.findById({ _id: mainCategoryid });
        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }

        const targetObjectIndex = document.requirements.findIndex(item => item._id.toString() === innerId);

        if (targetObjectIndex !== -1) {
            const updatedQuestions = document.requirements[targetObjectIndex].details.filter(item => item._id.toString() !== innerCategoryid);

            // Update the details array of the found object with the filtered details
            document.requirements[targetObjectIndex].details = updatedQuestions;

            // Save the updated document
            await document.save();

            res.status(200).json({ message: 'Question deleted successfully' });
        } else {
            res.status(404).json({ message: 'Object not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal server error' });
    }
})

router.post('/updateRequirements', async (req, res) => {
    const { heading, mainCategoryid, innerId } = req.body;
    try {
        // Find the document by ID
        const doc = await serviceDataModal.findById({ _id: mainCategoryid });

        if (!doc) {
            return res.status(404).json({ message: 'Document not found' });
        }

        // Find the specific object within stepThreeData array
        const objToUpdate = doc.requirements.find(obj => obj._id.toString() === innerId);

        if (!objToUpdate) {
            return res.status(404).json({ message: 'Object not found within stepThreeData' });
        }



        objToUpdate.heading = heading;

        await doc.save();

        res.status(200).json({ message: 'Object updated successfully', data: objToUpdate });



        // Save the updated document
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
})


router.post('/updateRequirementsName', async (req, res) => {
    const { name, innerId, questionId, mainCategoryid } = req.body;


    try {
        const doc = await serviceDataModel.findById({ _id: mainCategoryid });

        if (!doc) {
            return res.status(404).json({ message: 'Document not found' });
        }

        const objToUpdate = doc.requirements.find(obj => obj._id.toString() === innerId);

        if (!objToUpdate) {
            return res.status(404).json({ message: 'Object not found within requirements' });
        }

        if (objToUpdate.details && objToUpdate.details.length > 0) {
            const questionToUpdate = objToUpdate.details.find(q => q._id.toString() === questionId);

            if (!questionToUpdate) {
                return res.status(404).json({ message: 'Question not found within requirements' });
            }

            questionToUpdate.name = name;
        } else {
            return res.status(404).json({ message: 'No questions found within requirements' });
        }

        await doc.save();

        res.status(200).json({ message: 'Question updated successfully', data: objToUpdate });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
})


router.post('/addprocess', async (req, res) => {
    const { mainCategoryid, innerId } = req.body
    const document = await serviceDataModal.findById({ _id: mainCategoryid });
    const newStepTwoData = {
        stepName: "",
        description: ""
    };

    // Find the correct object in the stepThreeData array
    const targetObjectIndex = document.process.findIndex(item => item._id.toString() === innerId);

    if (targetObjectIndex !== -1) {
        // Push the new question object into the questions array of the found object
        document.process[targetObjectIndex].processData.push(newStepTwoData);

        // Save the updated document
        await document.save();

        res.status(200).json({ message: "Attribute added successfully" });
    } else {
        res.status(404).json({ message: "Object not found" });
    }

})

router.post('/deleteprocess', async (req, res) => {
    const { mainCategoryid, innerCategoryid, innerId } = req.body;


    try {
        const document = await serviceDataModal.findById({ _id: mainCategoryid });
        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }

        const targetObjectIndex = document.process.findIndex(item => item._id.toString() === innerId);

        if (targetObjectIndex !== -1) {
            const updatedQuestions = document.process[targetObjectIndex].processData.filter(item => item._id.toString() !== innerCategoryid);
            document.process[targetObjectIndex].processData = updatedQuestions;
            await document.save();

            res.status(200).json({ message: 'Question deleted successfully' });
        } else {
            res.status(404).json({ message: 'Object not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal server error' });
    }
})

router.post('/updateprocess', async (req, res) => {
    const { heading, mainCategoryid, innerId } = req.body;
    try {
        const doc = await serviceDataModal.findById({ _id: mainCategoryid });
        if (!doc) {
            return res.status(404).json({ message: 'Document not found' });
        }
        const objToUpdate = doc.process.find(obj => obj._id.toString() === innerId);
        if (!objToUpdate) {
            return res.status(404).json({ message: 'Object not found within stepThreeData' });
        }
        objToUpdate.heading = heading;
        await doc.save();
        res.status(200).json({ message: 'Object updated successfully', data: objToUpdate });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
})


router.post('/updateprocessStep', async (req, res) => {
    const { stepName, description, innerId, questionId, mainCategoryid } = req.body;

    console.log(stepName, description, 'data')
    try {
        const doc = await serviceDataModel.findById({ _id: mainCategoryid });

        if (!doc) {
            return res.status(404).json({ message: 'Document not found' });
        }

        const objToUpdate = doc.process.find(obj => obj._id.toString() === innerId);

        if (!objToUpdate) {
            return res.status(404).json({ message: 'Object not found within process' });
        }

        if (objToUpdate.processData && objToUpdate.processData.length > 0) {
            const questionToUpdate = objToUpdate.processData.find(q => q._id.toString() === questionId);

            if (!questionToUpdate) {
                return res.status(404).json({ message: 'Question not found within requirements' });
            }
            if (stepName) {
                questionToUpdate.stepName = stepName;

            }
            if (description) {
                questionToUpdate.description = description;
            }

        } else {
            return res.status(404).json({ message: 'No questions found within requirements' });
        }

        await doc.save();

        res.status(200).json({ message: 'Question updated successfully', data: objToUpdate });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
})





router.post('/addincorporation', async (req, res) => {
    const { mainCategoryid, innerId } = req.body
    const document = await serviceDataModal.findById({ _id: mainCategoryid });
    const newStepTwoData = {
        name: "",
    };

    // Find the correct object in the stepThreeData array
    const targetObjectIndex = document.incorporation.findIndex(item => item._id.toString() === innerId);

    if (targetObjectIndex !== -1) {
        // Push the new question object into the questions array of the found object
        document.incorporation[targetObjectIndex].details.push(newStepTwoData);

        // Save the updated document
        await document.save();

        res.status(200).json({ message: "Attribute added successfully" });
    } else {
        res.status(404).json({ message: "Object not found" });
    }

})

router.post('/deleteincorporation', async (req, res) => {
    const { mainCategoryid, innerCategoryid, innerId } = req.body;


    try {
        const document = await serviceDataModal.findById({ _id: mainCategoryid });
        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }

        const targetObjectIndex = document.incorporation.findIndex(item => item._id.toString() === innerId);

        if (targetObjectIndex !== -1) {
            const updatedQuestions = document.incorporation[targetObjectIndex].details.filter(item => item._id.toString() !== innerCategoryid);

            // Update the details array of the found object with the filtered details
            document.incorporation[targetObjectIndex].details = updatedQuestions;

            // Save the updated document
            await document.save();

            res.status(200).json({ message: 'Question deleted successfully' });
        } else {
            res.status(404).json({ message: 'Object not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal server error' });
    }
})

router.post('/updateincorporation', async (req, res) => {
    const { heading, mainCategoryid, innerId } = req.body;
    try {
        // Find the document by ID
        const doc = await serviceDataModal.findById({ _id: mainCategoryid });

        if (!doc) {
            return res.status(404).json({ message: 'Document not found' });
        }

        // Find the specific object within stepThreeData array
        const objToUpdate = doc.incorporation.find(obj => obj._id.toString() === innerId);

        if (!objToUpdate) {
            return res.status(404).json({ message: 'Object not found within stepThreeData' });
        }



        objToUpdate.heading = heading;

        await doc.save();

        res.status(200).json({ message: 'Object updated successfully', data: objToUpdate });



        // Save the updated document
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
})


router.post('/updateincorporationsName', async (req, res) => {
    const { name, innerId, questionId, mainCategoryid } = req.body;


    try {
        const doc = await serviceDataModel.findById({ _id: mainCategoryid });

        if (!doc) {
            return res.status(404).json({ message: 'Document not found' });
        }

        const objToUpdate = doc.incorporation.find(obj => obj._id.toString() === innerId);

        if (!objToUpdate) {
            return res.status(404).json({ message: 'Object not found within incorporation' });
        }

        if (objToUpdate.details && objToUpdate.details.length > 0) {
            const questionToUpdate = objToUpdate.details.find(q => q._id.toString() === questionId);

            if (!questionToUpdate) {
                return res.status(404).json({ message: 'Question not found within incorporation' });
            }

            questionToUpdate.name = name;
        } else {
            return res.status(404).json({ message: 'No questions found within incorporation' });
        }

        await doc.save();

        res.status(200).json({ message: 'Question updated successfully', data: objToUpdate });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
})

module.exports = router