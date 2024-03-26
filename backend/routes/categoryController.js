const express = require('express')
const app = express()
const cors = require('cors');
const categoryModal = require('../model/categoryModal');
app.use(cors())
const router = express.Router();



router.get('/addMain', async (req, res) => {
    try {
        const mainCategories = await categoryModal.findById({ _id: "65c465756df0b659a2939639" });
        res.send(mainCategories);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/alldata', async (req, res) => {
    try {
        const allData = await categoryModal.find();
        res.status(200).send(allData);
    } catch (error) {
        res.status(500).send(error);
    }
});



router.post('/subcategoriesAdd', async (req, res) => {
    const { mainCategoryId, name } = req.body;

    try {
        const mainCategory = await categoryModal.findById(mainCategoryId);

        if (!mainCategory) {
            return res.status(404).send({ error: 'Main category not found' });
        }

        mainCategory.subcategories.push({ name });
        await mainCategory.save();

        res.status(200).send({ name });
    } catch (error) {
        res.status(400).send(error);
    }
});


router.post('/innercategoriesAdd', async (req, res) => {
    const { mainCategoryId, subcategoryId, innerCategoryName } = req.body;

    try {
        const mainCategory = await categoryModal.findById(mainCategoryId);

        if (!mainCategory) {
            return res.status(404).send({ error: 'Main category not found' });
        }

        const subcategory = mainCategory.subcategories.id(subcategoryId);

        if (!subcategory) {
            return res.status(404).send({ error: 'Subcategory not found' });
        }

        subcategory.innerCategories.push(innerCategoryName);
        await mainCategory.save();

        res.status(200).send({ innerCategoryName });
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/innercategoriesDelete', async (req, res) => {
    const { mainCategoryId, subcategoryId, innerCategoryName } = req.body;

    try {
        const mainCategory = await categoryModal.findById(mainCategoryId);

        if (!mainCategory) {
            return res.status(404).send({ error: 'Main category not found' });
        }

        const subcategory = mainCategory.subcategories.id(subcategoryId);

        if (!subcategory) {
            return res.status(404).send({ error: 'Subcategory not found' });
        }

        console.log(subcategory)
        const innerCategoryIndex = subcategory.innerCategories.findIndex(name =>
            name.toLowerCase() === innerCategoryName.toLowerCase());
        console.log(innerCategoryIndex)

        if (innerCategoryIndex === -1) {
            return res.status(404).send({ error: 'Inner category not found' });
        }

        subcategory.innerCategories.splice(innerCategoryIndex, 1);
        await mainCategory.save();

        res.status(200).send({ message: 'Inner category deleted successfully' });
    } catch (error) {
        res.status(400).send(error);
    }
});


router.post('/subcategoriesDelete', async (req, res) => {
    const { mainCategoryId, subcategoryId } = req.body;

    try {
        const mainCategory = await categoryModal.findById(mainCategoryId);

        if (!mainCategory) {
            return res.status(404).send({ error: 'Main category not found' });
        }

        // Pull the subcategory by ID from the subcategories array
        mainCategory.subcategories.pull(subcategoryId);

        await mainCategory.save();

        res.status(200).send({ message: 'Subcategory deleted successfully' });
    } catch (error) {
        res.status(400).send(error);
    }
});



module.exports = router;

