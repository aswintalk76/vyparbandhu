import AWS from 'aws-sdk';
import { toast } from 'react-toastify';

const uploadFile = async (fileName, file, callBack) => {
    const S3_BUCKET = process.env.REACT_APP_BUCKET_NAME;
    const REGION = process.env.REACT_APP_REGION;

    AWS.config.update({
        accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
        region: REGION,
    });

    const s3 = new AWS.S3();

    const params = {
        Bucket: S3_BUCKET,  
        Key: fileName,
        Body: file,
    };

    const options = { partSize: 10 * 1024 * 1024, queueSize: 1 }; // Adjust according to your needs

    try {
        const data = await s3.upload(params, options).promise();
        console.log("File uploaded successfully. File URL:", data.Location);
        callBack();
        toast.success("File uploaded successfully!");
    } catch (error) {
        console.error("Error uploading file:", error);
        toast.error("Error uploading file. Please try again.");
    }
};

export default uploadFile;
