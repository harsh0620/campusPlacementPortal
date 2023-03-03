import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import "express-async-errors";
import morgan from "morgan";
/*
AUTHRNTICATE USER MIDDLEWARE IMPORT THAT WE USE IN ROUTES
import authenticateUser from "./middleware/auth.js";
*/
/*After building the application*/
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
/*After building the application*/

/*After building the application*/
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
/*After building the application*/

//db and authenticateuser
import connectDB from "./db/connect.js";

//routers
import authRouter from "./routes/authRoutes.js"; /*AUTH ROUTES*/
/*
EXAMPLE OF IMPORT
import exampleRouter from "./routes/exampleRoutes.js";*/

//middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

/*After building the application*/
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "./client/build")));
/*After building the application*/
app.use(express.json());

/*After building the application*/
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
/*After building the application*/

/*Mention all routes of application*/
app.use("/api/v1/auth", authRouter);

/*EXAMPLE TO USE ROUTES WITH AUTHENTICATION
app.use("/api/v1/example", authenticateUser, exampleRouter);*/
/*Mention all routes of application*/

/*After building the application*/
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});
/*After building the application*/

/*Mention all middleware of application*/
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
/*Mention all middleware of application*/

/*PORT SETTINGS FROM ENV OR 5000*/
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
