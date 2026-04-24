const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema({
  name: String,
  cuisine: String,

  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
});

// important for geo queries
RestaurantSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Restaurant", RestaurantSchema);