const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { Addcategory, getCategories, updateCategory, deleteCategory, getCategoryBycategory, addImageToCategory, Imagedelete, updateimageorder, getTotalTemplateCount, updateCategoryOrder, updatethumbnail, getDummyCategories } = require('../controllers/categoryController');

cloudinary.config({
  cloud_name: "dd7cx04dq",
  api_key: "372424546616664",
  api_secret: "qFtRjjccwjrVttyOFMR_Xeo9qic",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'categories', 
    allowed_formats: ['jpg', 'png', 'jpeg'],
    transformation: [
        {
          crop: 'fill',
          gravity: 'center',
          quality: 'auto:best', // Automatically optimizes quality while maintaining visual fidelity
        }
      ]
  },
});
const storaget = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'thumbnail', 
    allowed_formats: ['jpg', 'png', 'jpeg'],
    transformation: [
        {
          crop: 'fill',
          gravity: 'center',
          quality: 'auto:best', // Automatically optimizes quality while maintaining visual fidelity
        }
      ]
  },
});

const upload = multer({ storage: storage });
const uploadt = multer({ storage: storaget });
router.post('/Addcategory', upload.array('images', 5), Addcategory);
router.get('/getCategories',getCategories)
router.post('/updateCategory',upload.array('images', 5),updateCategory)
router.post('/deleteCategory',deleteCategory)
router.post('/getCategoryBycategory',getCategoryBycategory)
router.post('/addImageToCategory',upload.array('images', 5),addImageToCategory)
router.post('/Imagedelete',Imagedelete)
router.post('/updateImageOrder',updateimageorder)
router.get('/getTotalTemplateCount',getTotalTemplateCount)
router.post('/updateCategoryOrder',updateCategoryOrder)
router.post('/updatethumbnail',uploadt.single('thumbnail'),updatethumbnail)
router.get('/getDummyCategories',getDummyCategories)
module.exports = router;
