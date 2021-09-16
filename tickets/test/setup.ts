// import { request } from "express";
import { MongoMemoryServer } from "mongodb-memory-server";
import { app } from "../src/app";
import request from 'supertest'
import mongoose from "mongoose";
import jwt from "jsonwebtoken"
let mongo: any

// Declare global variable
declare global {
    namespace NodeJS {
        interface Global {
            signin(): string[]
        }
    }
}
beforeAll(async () => {
    process.env.JWT_KEY = "yasirshariff";
    mongo = new MongoMemoryServer();
    const mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        await collection.deleteMany({});
    };
});

afterAll(async () => {
    await mongo.stop();

    await mongoose.connection.close()
})

global.signin = () => {
    const payload = {
        id: new mongoose.Types.ObjectId().toHexString(),
        email: "test@test.com"
    }

    // Create the JWT!
    const token = jwt.sign(payload, process.env.JWT_KEY!);

    // Build Session Object. {jwt:MY_JWT}
    const session = { jwt: token }
    // Turn that session into JSON
    const sessionJSON = JSON.stringify(session);
    // Take JSON and encode it as base64
    const base64 = Buffer.from(sessionJSON).toString("base64");
    // Return string thats the cookie with encoded data
    return [`express:sess=${base64}`]
}