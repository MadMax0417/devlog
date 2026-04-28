import mongoose from "mongoose";

const dbConnect: any = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || "", {
      appName: process.env.MONGODB_APP_NAME || "",
    });
    console.log("MongoDB is connected:", conn.connection.host);
  } catch (err) {
    console.error("err while connecting to database:", err);
    // throw err
    process.exit(1);
  }
};

export default dbConnect;
