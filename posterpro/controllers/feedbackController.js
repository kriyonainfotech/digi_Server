const Feedback = require('../models/feedback'); // Adjust path based on your folder structure
const addFeedback = async (req, res) => {
  try {
    const { userId, text } = req.body;


    // Validate required fields
    if (!userId || !text) {
      return res.status(400).json({ success: false, message: "User ID and text are required." });
    }

    // Create a new feedback entry
    const feedback = new Feedback({
      userId,
      text,
    });

    // Save to the database
    await feedback.save();

    res.status(201).json({
      success: true,
      message: "Feedback added successfully",
      feedback,
    });
  } catch (error) {
    console.error("Error in addFeedback:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
const getFeedback = async (req, res) => {
  try {
      const Feedbacks = await Feedback.find({})
          .populate('userId', 'businessName mobileNumber') // Populate userId with the name field from the User schema
          .exec();

      const formattedFeedbacks = Feedbacks.map(feedback => ({
          userName: feedback.userId?.businessName || "Unknown User", // Include the user's name
          text: feedback.text,
          mobileNumber : feedback.userId?.mobileNumber
      }));

      res.status(200).json({ success: true, feedbacks: formattedFeedbacks });
  } catch (error) {
      console.error("Error in getFeedback:", error);
      res.status(500).json({ success: false, message: "Server error" });
  }
};


module.exports = {addFeedback,getFeedback};
