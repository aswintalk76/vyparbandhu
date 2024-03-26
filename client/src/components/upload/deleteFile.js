// require('dotenv').config();
import { toast } from 'react-toastify';
import AWS from 'aws-sdk';


const deleteFile = async (key, callBack) => {
    let BUCKET_NAME = `${process.env.S3_BUCKET}`;

    try {
        let s3bucket = new AWS.S3({
            accessKeyId: `${process.env.accessKeyId}`,
            secretAccessKey: `${process.env.secretAccessKey}`,
            Bucket: BUCKET_NAME,
        });
        var params = { Bucket: BUCKET_NAME, Key: decodeURIComponent(key) }; // Decoding URI component
        await s3bucket.deleteObject(params).promise();
        callBack()
        toast.success("File deleted Sucesfully!")

        console.log("Object deleted successfully");
    } catch (error) {
        console.error("Error deleting object from S3:", error);
    }
};


export default deleteFile