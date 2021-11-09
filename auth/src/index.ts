import mongoose from "mongoose";
import { app } from "./app"
// Mongoose

const start = async () => {
    // Perform checks for the JWT_KEY secret in Kubernetes
    if (!process.env.JWT_KEY) {  // If the JWT_KEY is not set
        throw new Error("JWT_KEY must be defined")
    }
    if (!process.env.MONGO_URI) {  // If the MONGO_URI is not set
        throw new Error("MONGO_URI must be defined")
    }
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });  // Connect to MongoDB
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error(err);  // If there is an error, print it
    }

    app.listen(3000, () => {
        console.log("Listening on Port 3000!!");
    });  // Start the server
};

start();  // Start the server
