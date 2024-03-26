// require('dotenv').config();
import AWS from 'aws-sdk';
import { toast } from 'react-toastify';

const uploadFile = async (fileName, file, callBack) => {
    const S3_BUCKET = `${process.env.S3_BUCKET}`;
    const REGION = `${process.env.REGION}`;

    AWS.config.update({
        accessKeyId: `${process.env.accessKeyId}`,
        secretAccessKey: `${process.env.secretAccessKey}`,
    });
    const s3 = new AWS.S3({
        params: { Bucket: S3_BUCKET },
        region: REGION,
    });

    const params = {
        Bucket: S3_BUCKET,
        Key: fileName,
        Body: file,
    };

    var upload = s3
        .putObject(params)
        .on("httpUploadProgress", (evt) => {
            console.log(
                "Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%"
            );
        })
        .promise();

    await upload.then((err, data) => {
        console.log(err);
        callBack()
        toast.success("Upload file Sucesfully!")
    });
};
export default uploadFile