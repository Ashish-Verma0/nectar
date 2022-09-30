const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const AWS = require("aws-sdk");
// const S3 = require("aws-sdk/clients/s3");
const sharp = require("sharp");

const bucketName = process.env.BUCKET_NAME;

const sharpifyImg = async (file, width, height) => {
  try {
    const image = sharp(file.path);
    const meta = await image.metadata();
    const format = "webp";

    const config = {
      jpeg: { quality: 100 },
      jpg: { quality: 100 },
      webp: { quality: 100 },
      png: { quality: 100 },
      svg: { quality: 100 },
    };

    const newFile = await image[format](config[format])
      .resize({
        width: width,
        height: height,
      })
      .toFormat("webp", { mozjpeg: true });
    let fileData = {
      file: newFile,
      format: "webp",
    };
    return fileData;
  } catch (err) {
    throw new Error(err);
  }
};

const s3BucketEndpoint = new AWS.Endpoint(process.env.STORAGE_END_POINT);
const s3 = new AWS.S3({
  endpoint: s3BucketEndpoint,
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SPACES_SECRET,
});

exports.uploadImg = async (file, width, height) => {
  const newFile = await sharpifyImg(file, width, height);
  const uploadParams = {
    Bucket: bucketName,
    Body: newFile.file,
    Key: file.filename,
  };
  return s3.upload(uploadParams).promise();
};

// Upload Simple Image Without Crop or Compression
exports.uploadSimpleImg = async (file) => {
  const fileStream = fs.createReadStream(file.path);
  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
  };
  return s3.upload(uploadParams).promise();
};

// upload Profile Verification Images
exports.userProfileVerification = async (file, width, height) => {
  // const newFile = await sharpifyImg(file, width, height);
  const uploadParams = {
    Bucket: bucketName,
    Body: file,
    Key: file.filename,
  };
  return s3.upload(uploadParams).promise();
};

// Video Upload
exports.uploadVideo = async (file) => {
  const fileStream = fs.createReadStream(file.path);
  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
  };
  return s3.upload(uploadParams).promise();
};

//download a file from s3
function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName,
  };
  return s3
    .getObject(downloadParams)
    .createReadStream()
    .on("error", (err) => {});
}
exports.getFileStream = getFileStream;

// Delete File From S3

exports.deleteFile = async (fileKey) => {
  const params = {
    Bucket: bucketName,
    Key: fileKey,
  };
  return s3.deleteObject(params).promise();
};
