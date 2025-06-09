const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

module.exports = async function uploadToS3(buffer, mimetype) {
  const uploadParams = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `students/${uuidv4()}.jpg`,
    Body: buffer,
    ContentType: mimetype,
    ACL: "public-read",
  };

  const data = await s3.upload(uploadParams).promise();
  return data.Location; 
};