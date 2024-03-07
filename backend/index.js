const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const {upload} = require('./multer');
const app = express();
const port =  5000;
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
app.use(cors())
const {uploadOnCloudinary} = require('./cloudinary.js');
const { title } = require('process');

// Connect to MongoDB (replace with your connection string)
mongoose.connect('mongodb://localhost:27017/blogApp');

// Define blog post schema
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Blog = mongoose.model('Blog', blogSchema);

// // Configure multer for image uploads


// Create blog post (with image upload handling)
app.post('/api/v1/blogs',upload.single('image'),async(req, res) => {



try {
   const uploaded = await uploadOnCloudinary(req.file.path)

const imageUrl = uploaded.url;
const resData = await Blog.create({
    title:req.body.title,
    content:req.body.content,
    image:imageUrl
  })
  console.log(resData);

} catch (error) {
   console.log(error) 
}
});

// ... other routes and app configuration
app.get("/api/v1/blogs/bulk" ,async(req , res)=>{
    console.log(`we are have`)
   const data = await Blog.find({})
   res.status(200).json({
    "data":data,
   "success":true
   })
   
})
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
