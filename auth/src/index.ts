import express from "express";
import { json } from "body-parser";
require("express-async-errors");
import mongoose from "mongoose";
import cookieSession from "cookie-session";
// Routers
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signupRouter } from "./routes/signup";
import { signoutRouter } from "./routes/signout";

// Middleware
import { errorHandler } from "./middleware/error-handler";
import { NotFoundError } from "./errors/not-found-error";
const app = express();
// trust proxy
app.set("trust proxy", true);

app.use(json());
// Adding cookie-session support
app.use(cookieSession({ signed: false, secure: true }));
// Routes
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);

app.all("*", async (req, res) => {
    throw new NotFoundError();
});
app.use(errorHandler);
// Mongoose

const start = async () => {
    // Perform checks for the JWT_KEY secret in Kubernetes
    if (!process.env.JWT_KEY) {
        throw new Error("JWT_KEY must be defined")
    }
    try {
        await mongoose.connect("mongodb://auth-mongo-srv:27017/auth", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error(err);
    }

    app.listen(3000, () => {
        console.log("Listening on Port 3000!!");
    });
};

start();
