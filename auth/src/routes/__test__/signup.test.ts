import request from "supertest"
import { app } from "../../app"

it("returns a 201 on succesfull signup", async () => {  // it is a test case which returns 201 on succesfull signup
    return request(app)
        .post("/api/users/signup")
        .send({
            email: "test@test.com",
            password: "password",
        })
        .expect(201);
});


it("returns 400 with an invalid email", async () => { // it is a test case which returns 400 with an invalid email
    return request(app)
        .post("/api/users/signup")
        .send({
            email: "test",
            password: "password",
        })
        .expect(400);
});

it("returns 400 with an invalid password", async () => { // it is a test case which returns 400 with an invalid password
    return request(app)
        .post("/api/users/signup")
        .send({
            email: "test@test.com",
            password: "1"
        })
        .expect(400);
});

it("returns 400 with missing email and password", async () => { // it is a test case which returns 400 with missing email and password
    await request(app)
        .post("/api/users/signup")
        .send({
            email: "",
            password: "dbsgbdf"
        })
        .expect(400);
    await request(app)
        .post("/api/users/signup")
        .send({
            email: "test@test.com",
            password: ""
        })
        .expect(400);
});

it("disallows duplicate emails", async () => { // it is a test case which disallows duplicate emails    
    await request(app)
        .post("/api/users/signup")
        .send({
            email: "test@test.com",
            password: "1234"
        })
        .expect(201);
    await request(app)
        .post("/api/users/signup")
        .send({
            email: "test@test.com",
            password: "1234"
        })
        .expect(400);
});

it("sets a cookie after succesfull sign up", async () => { // it is a test case which sets a cookie after succesfull sign up
    const response = await request(app)
        .post("/api/users/signup")
        .send({
            email: "test@test.com",
            password: "1234"
        })
        .expect(201);

    expect(response.get("Set-Cookie")).toBeDefined();    
})

