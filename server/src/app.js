import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";

import routes from "./routes/index.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import { requestId } from "./middleware/requestId.js";

const app = express();
const isProduction = process.env.NODE_ENV === "production";

// Request ID
app.use(requestId);

// Security Headers
app.use(
  helmet({
    contentSecurityPolicy: isProduction ? undefined : false,
    crossOriginEmbedderPolicy: isProduction,
  })
);

// ✅ CORS FIX (IMPORTANT)
const corsOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.CLIENT_URL,
  process.env.CLIENT_URL_PROD,
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (corsOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Rate Limiting
const limiter = rateLimit({
  windowMs: isProduction ? 15 * 60 * 1000 : 1 * 60 * 1000,
  max: isProduction ? 100 : 1000,
  message: "Too many requests, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api/", limiter);

// Body Parsing
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Data Sanitization
app.use(mongoSanitize());
app.use(
  hpp({
    whitelist: ["category", "sort", "page", "limit", "search", "status"],
  })
);

// Compression
app.use(compression());

// Logging
if (!isProduction) {
  morgan.token("id", (req) => req.id || "-");
  app.use(morgan(":id :method :url :status :response-time ms"));
} else {
  app.use(morgan("combined"));
}

// Routes
app.use("/api", routes);

// Root route (for testing)
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Error handling
app.use(notFound);
app.use(errorHandler);

export default app;