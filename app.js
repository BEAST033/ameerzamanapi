const express = require("express");
const cors = require("cors");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const Video = require("./models/Video");
const Image = require("./models/Image");
const auth = require("./middleware/auth");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

app.post("/verify-recaptcha", async (req, res) => {
  const { token } = req.body;

  const result = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY}&response=${token}`
  );

  if (result.data.success) {
    res.send("Human");
  } else {
    res.send("Robot");
  }
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (email !== "muftiameerzaman@gmail.com" || password !== "123ameerzaman123")
    return res.json({ status: "fail", message: "Invalid email or password" });

  res.send({
    status: "success",
    token: jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    }),
  });
});

app.post("/videos", auth, async (req, res) => {
  try {
    const { videoURL } = req.body;
    const newVideo = await Video.create({ videoURL });

    res.status(201).json({
      status: "success",
      data: {
        video: newVideo,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
});

app.post("/images", auth, async (req, res) => {
  try {
    const { imageURL } = req.body;
    const newImage = await Image.create({ imageURL });

    res.status(201).json({
      status: "success",
      data: {
        image: newImage,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
});

app.get("/videos", async (req, res) => {
  try {
    if (req.query) {
      const { top } = req.query;
      const videos = await Video.find({}).sort("-createdAt").limit(top);

      return res.status(200).json({
        status: "success",
        data: {
          videos,
        },
      });
    }
    const videos = await Video.find({}).sort("-createdAt");

    res.status(200).json({
      status: "success",
      data: {
        videos,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
});

app.get("/images", async (req, res) => {
  try {
    if (req.query) {
      const { top } = req.query;
      const images = await Image.find({}).sort("-createdAt").limit(top);

      return res.status(200).json({
        status: "success",
        data: {
          images,
        },
      });
    }
    const images = await Image.find({}).sort("-createdAt");

    res.status(200).json({
      status: "success",
      data: {
        images,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
});

module.exports = app;
