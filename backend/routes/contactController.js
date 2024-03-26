
const express = require('express')
const app = express()
const cors = require('cors');
const ExpertCallModal = require('../model/exportCallModal');
const ConatctUsCallModal = require('../model/contactusModal');
app.use(cors())

const router = express.Router();


router.post('/creatExpertCall', async (req, res) => {
    const { email, name, number, detail } = req.body;

    try {


        const newDoc = new ExpertCallModal({ name: name, email: email, number: number, detail: detail ? detail : '' });

        await newDoc.save();

        res.status(200).json({ message: 'create Expert call   successfully' });
    } catch (error) {
        console.error('Error create account:', error);
        res.status(500).json({ error: 'Failed create account' });
    }
});
router.get('/getExpertCall', async (req, res) => {
    try {
        const newDoc = await ExpertCallModal.find();
        res.status(200).json(newDoc);
    } catch (error) {
        console.error('Error get list:', error);
        res.status(500).json({ error: 'Failed get list' });
    }
});

router.post('/expertCalldelete', async (req, res) => {
    try {
        console.log(req.body);
        const dataId = req.body.dataId;
        await ExpertCallModal.deleteOne({ _id: dataId });
        res.status(200).json({ message: 'Document deleted successfully' });
    } catch (error) {
        console.error('Error deleting document:', error);
        res.status(500).json({ error: 'Failed to delete document' });
    }
});

router.post('/ConatctUsExpertCall', async (req, res) => {
    const { firstname, lastname, email, number, doubt } = req.body;

    try {


        const newDoc = new ConatctUsCallModal({ firstname: firstname, lastname: lastname, number: number, email: email, doubt: doubt });

        await newDoc.save();

        res.status(200).json({ message: 'create Expert call  successfully' });
    } catch (error) {
        console.error('Error create account:', error);
        res.status(500).json({ error: 'Failed create account' });
    }
});


router.get('/getConatctUsExpertCall', async (req, res) => {
    try {
        const newDoc = await ConatctUsCallModal.find();
        res.status(200).json(newDoc);
    } catch (error) {
        console.error('Error get list:', error);
        res.status(500).json({ error: 'Failed get list' });
    }
});

router.post('/ConatctUsdelete', async (req, res) => {
    try {
        console.log(req.body);
        const dataId = req.body.dataId;
        await ConatctUsCallModal.deleteOne({ _id: dataId });
        res.status(200).json({ message: 'Document deleted successfully' });
    } catch (error) {
        console.error('Error deleting document:', error);
        res.status(500).json({ error: 'Failed to delete document' });
    }
});






module.exports = router
