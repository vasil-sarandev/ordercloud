/* eslint-disable no-undef */
const AWS = require('aws-sdk')

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const uploadFileToS3 = async (file, key) => {
    const params = {
        Bucket: 'ordercloud',
        Key: key,
        Body: file
    }
    try {
        const data = await s3.upload(params).promise()
        console.log(`File uploaded successfully at ${data.Location}`)
        return data.Location
    } catch (e) {
        console.log('error', e)
        throw new Error(e.message)
    }
}

module.exports = {
    uploadFileToS3
}