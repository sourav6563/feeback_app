import mongoose from "mongoose";

type connectionObject = {
  isConnected?: number;
};

const connection: connectionObject = {};

const dbConnect = async (): Promise<void> => {
  // Your code here
  if (connection.isConnected) {
    console.log(`Already Connected to Database  `);
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI as string);
    console.log(db);
    connection.isConnected = db.connections[0].readyState;
    console.log(connection.isConnected);

    console.log(`db connected Successfully`);
  } catch (error) {
    console.log(`database connection failed`, error);
    process.exit(1);
  }
};
export default dbConnect;
