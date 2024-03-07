const cloudinary  = require('cloudinary');
const fs = require('fs');      


cloudinary.config({ 
  cloud_name: 'dj0hx0vtm', 
  api_key: '812662848193686', 
  api_secret: 'jIto9pAngoTRx0bKmMA0KY_S80k' 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfull
        //console.log("file is uploaded on cloudinary ", response.url);
        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}



module.exports= {uploadOnCloudinary}