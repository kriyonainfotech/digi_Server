const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
cloudinary.config({
  cloud_name: "dd7cx04dq",
  api_key: "372424546616664",
  api_secret: "qFtRjjccwjrVttyOFMR_Xeo9qic",
});
const storageImage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'frameImages',
    allowed_formats: ['jpg', 'png', 'jpeg'],
    transformation: [
      {
        width: 500,
        height: 500,
        crop: 'fill',
        gravity: 'center',
      },
    ],
  },
});
const upload = multer({
storage: storageImage,
});
const { convertCssToJson, getFrameJson, getwp, deleteframe, namegenrate, getTotalFrameCount, updateCssToJson } = require('../controllers/frameController');
router.post('/convert-json', upload.single('imageurl'), convertCssToJson);
router.get('/getFrameJson',getFrameJson)
router.delete('/deleteframe',deleteframe)
router.post('/namegenrate',namegenrate)
router.get('/getTotalFrameCount',getTotalFrameCount)
router.post('/updateCssToJson',upload.single('imageurl'),updateCssToJson)
module.exports = router;