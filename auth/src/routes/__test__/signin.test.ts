import request from "supertest";
import { app } from "../../app";

it("fails when an email that doesnt exist is supplied", async () => {  // it is a test case for the signin route when the email is not found
    await request(app)
        .post("/api/users/signin")
        .send({
            email: "test@test.com",
            password: "1234",
        })
        .expect(400);
});

it("fails when incorrect password is supplied", async () => {  // it is a test case for the signin route when the password is incorrect
    await request(app)
        .post("/api/users/signup")
        .send({
            email: "test@test.com",
            password: "1234",
        })
        .expect(201);
    await request(app)
        .post("/api/users/signin")
        .send({
            email: "test@test.com",
            password: "dhbdhf",
        })
        .expect(400);
});

it("sets a cookie after successfull sign in", async () => {  // it is a test case for the signin route when cookie is set
    await request(app)
        .post("/api/users/signup")
        .send({
            email: "test@test.com",
            password: "1234",
        })
        .expect(201);
    const response = await request(app)
        .post("/api/users/signin")
        .send({
            email: "test@test.com",
            password: "1234"
        })
        .expect(201);
    expect(response.get("Set-Cookie")).toBeDefined();  // expect the cookie to be defined
})
