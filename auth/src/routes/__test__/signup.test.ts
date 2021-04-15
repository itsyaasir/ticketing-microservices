import request from "supertest"
import  {app} from "../../app"

it("returns a 201 on succesfull signup",async () => {
    return request(app)
    .post("/api/users/signup")
    .send({
        email:"test@test.com",
        password:"password",
    })
    .expect(201)
})