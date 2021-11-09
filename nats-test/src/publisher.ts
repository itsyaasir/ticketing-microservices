import nats from "node-nats-streaming"
import { TicketCreatedPublisher } from "./events/ticket-created-publisher";
console.clear()

const stan = nats.connect("ticketing", "abc", {  // nats-streaming
    url: "https://localhost:4222"
}); // connect to nats server

stan.on("connect", async () => {  // listen to connect event
    console.log("Publisher connected to NATS")
    const publisher = new TicketCreatedPublisher(stan);
    try {
        await publisher.publish({
            id: '123',
            title: "concert",
            price: 20
        });
    } catch (e) {
        console.error(e);
    }
    // const data = JSON.stringify({
    //     id: "123",
    //     title: "concert",
    //     price: 20
    // });  // create a json object

    // stan.publish("ticket:created", data, () => {
    //     console.log("Event Published");
    // }); // publish event


});