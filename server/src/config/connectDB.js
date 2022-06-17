import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGOOSE_USER_NAME}:${process.env.MONGOOSE_PASSWORD}@dev.5zp9cbu.mongodb.net/?retryWrites=true&w=majority`
    );
    console.log('Connected successfully to Mongo');
  } catch (error) {
    console.log('Connected failed to Mongo');
  }
};

module.exports = connectDB;
