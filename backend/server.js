import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import adminAuthRouter from "./routes/adminAuthRoute.js";
import companyRouter from "./routes/companyRoute.js";
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

// Load environment variables from .env file
dotenv.config();

const app = express();

// Use morgan middleware in development environment for logging requests and responses
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Use cors middleware to allow cross-origin requests
app.use(cors());

// Parse incoming JSON data
app.use(express.json());

// Mount admin authentication routes at /api/v1/auth
app.use("/api/v1/auth", adminAuthRouter);
// Mount company authentication routes at /api/v1/auth
app.use("/api/v1/company", companyRouter);
// Mount middleware for handling 404 not found errors
app.use(notFoundMiddleware);

// Mount middleware for handling all other errors
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    // Connect to database
    await connectDB();

    // Start the server
    app.listen(PORT, () => {
      console.log(
        `Server running in ${process.env.NODE_ENV} mode on http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
