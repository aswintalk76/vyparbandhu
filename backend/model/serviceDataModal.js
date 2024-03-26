const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define main schema
const yourDataSchema = new Schema({
    mainCategoryName: String,
    subCategoryName: String,
    innerCategoryName: String,
    heading: String,
    details: String,
    images: String, // Array of image filenames

    // Step 2
    stepTwoData: [{
        name: String,
        icon: String,
        description: String
    }],

    // Step 3
    stepThreeData: [{
        heading: String,
        image: String,
        questions: [{
            question: String,
            description: String
        }]
    }],

    requirements: [{
        heading: String,
        details: [{
            name: String,
        }
        ]
    }],

    // Step 4
    stepFourData: [{
        heading: String,
        description: String,
        images: [{
            filename: String
        }]
    }],

    // Step 5
    stepFiveData: [{
        heading: String,
        description: String,
        documentsData: [{
            icon: String,
            document: String
        }]
    }],
    process: [{
        heading: String,
        processData: [{
            stepName: String,
            description: String
        }]
    }],
    incorporation: [{
        heading: String,
        details: [{
            name: String,
        }
        ]
    }],

    // Step 6
    stepSixData: [{
        package: String,
        amount: Number,
        description: String
    }],

    // Step 7
    youtubeLink: [{
        link: String,
        heading: String
    }],
    faqData: [{
        question: String,
        answer: String
    }]
});

// Create model
const serviceDataModel = mongoose.model('YourData', yourDataSchema);

module.exports = serviceDataModel;
