import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./config/db.js";
import configureCloudinary from "./config/cloudinary.js";

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";

const startServer = async () => {
  try {
    await connectDB();
    configureCloudinary();

    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running in ${NODE_ENV} mode on port ${PORT}`);
      console.log(`📍 Health check: /health`);
    });

    // Graceful Shutdown
    const gracefulShutdown = (signal) => {
      console.log(`\n🛑 Received ${signal}. Shutting down gracefully...`);

      server.close(() => {
        console.log("✅ HTTP server closed.");
        process.exit(0);
      });

      setTimeout(() => {
        console.error("❌ Force shutdown after timeout.");
        process.exit(1);
      }, 10000);
    };

    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
    process.on("SIGINT", () => gracefulShutdown("SIGINT"));

    process.on("unhandledRejection", (err) => {
      console.error(`❌ Unhandled Rejection: ${err.message}`);
      server.close(() => process.exit(1));
    });

    process.on("uncaughtException", (err) => {
      console.error(`❌ Uncaught Exception: ${err.message}`);
      process.exit(1);
    });

  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();