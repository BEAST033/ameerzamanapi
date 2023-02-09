const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const imageSchema = new mongoose.Schema({
  imageURL: {
    type: String,
    required: [true, "Image URL is required"],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;
