import mongoose, { Connection } from "mongoose";

let cashedConnection: Connection | null = null;
export async function connectToMongoDB() {
  if (cashedConnection) {
    console.log("Using cashed MongoDB connection");
    return cashedConnection;
  }
  try {
    const connection = await mongoose.connect(
      process.env.MONGODB_URI as string,
    );
    cashedConnection = connection.connection;
    console.log("New MongoDB connection established");
    return cashedConnection;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
