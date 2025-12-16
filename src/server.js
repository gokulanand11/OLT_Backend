import mongoose from "mongoose";
import { config } from "./config/env.js";
import app from "./app.js";

mongoose
  .connect(config.mongoUri, {
    autoIndex: process.env.NODE_ENV !== 'production',
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000
  })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(config.port, () => console.log(`API running on :${config.port}`));
  })
  .catch(err => {
    console.error("MongoDB connect error:", err.message);
    process.exit(1);
  });