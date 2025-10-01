// src/db.ts
import mongoose from 'mongoose';

const DATABASE_NAME = process.env.DATABASE_NAME as string;
const DATABASE_URI = process.env.DATABASE_URI as string;

if (!DATABASE_URI) {
  throw new Error('DATABASE_URI is not defined in environment variables');
}

if (!DATABASE_NAME) {
  throw new Error('DATABASE_NAME is not defined in environment variables');
}

export async function connectDB() {
  try {
    await mongoose.connect(DATABASE_URI, {
      dbName: DATABASE_NAME,
    });
    return mongoose.connection;
  } catch (error) {
    console.error('Error connecting to database:', error);
    throw error;
  }
}
