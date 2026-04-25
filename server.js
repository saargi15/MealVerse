const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const Restaurant = require("./models/Restaurant");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Test Route
app.get("/", (req, res) => {
  res.send("Server Running");
});
app.get("/test-db", async (req, res) => {
  try {
    const Restaurant = require("./models/Restaurant");
    const all = await Restaurant.find();
    console.log(all);
    res.json(all);
  } catch (error) {
    console.log(error);
    res.send("Error fetching data");
  }
});
app.get("/nearby", async (req, res) => {
  const { lng, lat } = req.query;

  const restaurants = await Restaurant.find({
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [parseFloat(lng), parseFloat(lat)]
        },
        $maxDistance: 5000
      }
    }
  });

  res.json(restaurants);
});

// Server start (ALWAYS LAST)
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
app.get("/nearby", async (req, res) => {
  const { lng, lat } = req.query;

  const restaurants = await Restaurant.find({
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [parseFloat(lng), parseFloat(lat)]
        },
        $maxDistance: 5000
      }
    }
  });

  res.json(restaurants);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

