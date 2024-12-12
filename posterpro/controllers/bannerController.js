const Banner = require('../models/banner')
const cloudinary = require('cloudinary').v2;
const getPublicIdFromUrl = (url) => {
  if (typeof url === 'string') {
    const regex = /\/(?:v\d+\/)?([^\/]+)\/([^\/]+)\.[a-z]+$/;
    const match = url.match(regex);
    if (match) {
      return `${match[1]}/${match[2]}`; // captures folder and file name without versioning or extension
    }
    console.error("Could not match regex for publicId extraction:", url);
    return null;
  } else if (Array.isArray(url) && url.length > 0) {
    // Handle case where url is an array by extracting the first element
    return getPublicIdFromUrl(url[0]);
  } else {
    console.error("The provided URL is not a valid string or non-empty array:", url);
    return null;
  }
};
const Addbanner = async (req, res) => {
    try {
      console.log(req.file);
      
      // Check if a file is uploaded
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'Banner image is required.',
        });
      }
  
      // Upload the image to Cloudinary (already done via multer storage)
      const uploadedImage = req.file;
  
      // Save the banner to the database
      const newBanner = new Banner({
        image: {
          url: uploadedImage.path, // Cloudinary file path
        },
      });
  
      await newBanner.save();
  
      // Send success response
      res.status(201).json({
        success: true,
        message: 'Banner added successfully.',
        banner: newBanner,
      });
    } catch (error) {
      console.error('Error in Addbanner:', error);
      res.status(500).json({
        success: false,
        message: 'Server error.',
      });
    }
}
const getbanner = async(req,res) => {
    try {
        const banner = await Banner.find({})
        res.status(200).json({
            success: true,
            message: 'Banner fetched successfully.',
            banner: banner
            })
    } catch (error) {
        console.error('Error in Addbanner:', error);
      res.status(500).json({
        success: false,
        message: 'Server error.',
      });
    }
}
const deleteBanner = async (req, res) => { 
  try {
    const { bannerId } = req.body; // Extracting bannerId from request body
    console.log(req.body);

    const banner = await Banner.findById(bannerId); // Find the banner by ID
    if (!banner) {
      return res.status(404).json({ success: false, message: "Banner not found" });
    }
    console.log(banner);

    // Check if 'image' is an array or an object and handle it accordingly
    const images = Array.isArray(banner.image) ? banner.image : [banner.image];

    // Delete each image from Cloudinary
    for (let image of images) {
      const publicId = getPublicIdFromUrl(image.url);
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
    }

    // Delete the banner from the database
    await Banner.findByIdAndDelete(bannerId);

    return res.status(200).json({ success: true, message: "Banner deleted successfully" });
  } catch (error) {
    console.error("Error in deleteBanner:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};
module.exports = {
    Addbanner,getbanner,deleteBanner
}