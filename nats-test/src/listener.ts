import nats, { Message } from "node-nats-streaming";
import { randomBytes } from "crypto";
console.clear()
const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
    url: "https://localhost:4222"
});  // connect to nats server

stan.on("connect", () => {
    console.log("Listener connected to NATS")

    const subscription = stan.subscribe("ticket:created");   //subscribe to the ticket:created topic
    subscription.on("message", (msg: Message) => {
        const data = msg.getData(); //get the data from the message

        if (typeof data === "string") {
            console.log(`Received event #${msg.getSequence()}`);
        }
    });
})