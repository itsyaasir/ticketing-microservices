import mongoose from "mongoose";
import {app } from "./app"
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
