const util = require('util');
const cloudinary = require('cloudinary');
const {cloudinaryCredentials} = require('./keys');

cloudinary.config(cloudinaryCredentials);

const uploadPromise = util.promisify(cloudinary.v2.uploader.upload);


const upload = async ({path, name}) => {
    try {
        return uploadPromise(path);
    }catch(err) {
        console.log(err);
    }
}


module.exports ={
    upload
}