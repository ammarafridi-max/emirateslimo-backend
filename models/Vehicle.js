const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    model: {
      type: String,
      required: true,
      trim: true,
    },
    year: {
      type: Number,
      required: true,
      min: 1900, // reasonable lower bound
      max: new Date().getFullYear() + 1, // next year allowed
    },
    passengers: {
      type: Number,
      required: true,
      min: 1,
    },
    luggage: {
      type: Number,
      default: 0,
      min: 0,
    },
    type: {
      type: String,
      enum: ['Sedan', 'Crossover', 'SUV', 'Van'],
      required: true,
    },
    class: {
      type: String,
      enum: ['Standard', 'Premium', 'Business', 'Luxury'],
      required: true,
    },
    pricing: {
      initialPrice: {
        type: Number,
        required: true,
        min: 0,
      },
      pricePerHour: {
        type: Number,
        required: true,
        min: 0,
      },
      pricePerKm: {
        type: Number,
        required: true,
        min: 0,
      },
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

module.exports = mongoose.model('Vehicle', vehicleSchema);
