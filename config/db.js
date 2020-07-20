const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    console.log('Tring to Connect to DB...');
    // "mongoURI": "mongodb+srv://react123:react123@contactkeeper.veust.mongodb.net/testdb?retryWrites=true&w=majority",
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
