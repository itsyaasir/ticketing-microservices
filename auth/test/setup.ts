// import { request } from "express";
import { MongoMemoryServer } from "mongodb-memory-server";
import { app } from "../src/app";
import request from 'supertest'
import mongoose from "mongoose";
let mongo: any

// Declare global variable
declare global { namespace NodeJS { interface Global { signin(): Promise<string[]> } } }
beforeAll(async () => {
    process.env.JWT_KEY = "asdf";
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

global.signin = async () => {
    const email = "test@test.com"
    const password = "password"

    const response = await request(app)
        .post("/api/users/signup")
        .send({
            email, password
        })
        .expect(201);

    const cookie = response.get("Set-Cookie")

    return cookie;
}