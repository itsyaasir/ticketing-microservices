import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app"


it("returns 404 if the ticket is not found", async () => {
    const id = mongoose.Types.ObjectId().toHexString();
    const response = await request(app)
        .get(`/api/tickets/${id}`)
        .send()
        .expect(404);
})

it("returns ticket if the ticket is found", async () => {
    const title = "asdf";
    const price = 30;
    const response = await request(app)
        .post("/api/tickets")
        .set("Cookie", global.signin())
        .send({
            title, price
        })
        .expect(201)
    const ticketResponse = await request(app)
        .get(`/api/tickets/${response.body.id}`)
        .send()
        .expect(200);
    expect(ticketResponse.body.title).toEqual(title)
    expect(ticketResponse.body.price).toEqual(price)
})