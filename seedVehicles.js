const mongoose = require('mongoose');
const Vehicle = require('./models/Vehicle'); // adjust path if needed

// 🔧 replace with your MongoDB connection string
const MONGO_URI =
  'mongodb+srv://admin01:obaid123@cluster0.eb3zmm7.mongodb.net/emirateslimo?retryWrites=true&w=majority';

const seedVehicles = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    console.log('✅ MongoDB connected...');

    const vehicles = [
      {
        brand: 'Lexus',
        model: 'ES300',
        year: 2024,
        passengers: 5,
        luggage: 3,
        type: 'Sedan',
        class: 'Premium',
        pricing: {
          initialPrice: 150,
          pricePerHour: 50,
          pricePerKm: 4,
        },
      },
      {
        brand: 'Mercedes',
        model: 'S-Class',
        year: 2024,
        passengers: 4,
        luggage: 3,
        type: 'Sedan',
        class: 'Luxury',
        pricing: {
          initialPrice: 250,
          pricePerHour: 80,
          pricePerKm: 6,
        },
      },
    ];

    await Vehicle.deleteMany(); // clear old data
    const created = await Vehicle.insertMany(vehicles);

    console.log(`✅ Inserted ${created.length} vehicles`);
    process.exit();
  } catch (err) {
    console.error('❌ Error seeding data:', err);
    process.exit(1);
  }
};

seedVehicles();
