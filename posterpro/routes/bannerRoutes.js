const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { Addbanner, getbanner } = require('../controllers/bannerController');
cloudinary.config({
  cloud_name: "dd7cx04dq",
  api_key: "372424546616664",
  api_secret: "qFtRjjccwjrVttyOFMR_Xeo9qic",
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'banner', 
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
router.post('/addbanner',upload.single('banner'),Addbanner)
router.get('/getBanner',getbanner)
module.exports = router;