const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const videoSchema = new mongoose.Schema({
  videoURL: {
    type: String,
    required: [true, "Video URL is required"],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
