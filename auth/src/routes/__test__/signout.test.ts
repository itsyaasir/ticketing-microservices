import request from "supertest"
import { app } from "../../app"

it("clears the cookie after signing out", async () => {  // it is a test case to clear the cookie after signing out
    await request(app)
        .post("/api/users/signup")
        .send({
            email: "test@test.com",
            password: "password",
        })
        .expect(201);

    const response = await request(app)
        .post("/api/users/signout")
        .send({})
        .expect(200);

    expect(response.get("Set-Cookie")).toBeDefined()
})