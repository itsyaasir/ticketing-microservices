import request from "supertest";
import { app } from "../../app";

it("responds with details about the current user", async () => {  // it is a test case for the current user

    const cookie = await global.signin()  // global.signin() is a function that is defined in the beforeEach() function
    const response = await request(app)  // request is a function that takes app as an argument
        .get("/api/users/currentuser")  // get request to the current user
        .set("Cookie", cookie)  // set the cookie
        .send()  // send is used to send the data to the server
        .expect(200)  // expect is a method of supertest


    expect(response.body.currentUser.email).toEqual("test@test.com")  // expect is a assertion

});

it("responds with null if not authenticated", async () => {  // it is a test case for the current user when not authenticated
    const response = await request(app)
        .get("/api/users/currentuser")
        .send()
        .expect(200);

    expect(response.body.currentUser).toEqual(null);  // expect is a assertion which checks if the current user is null 
})