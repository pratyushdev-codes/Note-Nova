const mongoose = require('mongoose');

async function connectToMongo() {
  try {
    await mongoose.connect('mongodb://0.0.0.0:27017/notenova', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB Connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

module.exports = connectToMongo;
