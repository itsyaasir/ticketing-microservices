import nats from "node-nats-streaming";
import { randomBytes } from "crypto";
import { TicketCreatedListener } from "./events/ticket-created-listener";


console.clear()
const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
    url: "https://localhost:4222"
});  // connect to nats server

stan.on("connect", () => {
    console.log("Listener connected to NATS")

    stan.on("close", () => {
        console.log("NATS connection close!");
        process.exit();
    });  // close connection to nats server

    new TicketCreatedListener(stan).listen();  // listen to ticket created event from ticket-created topic

});
// Interrupt Message Listener
process.on("SIGINT", () => stan.close()); // close connection to nats server on SIGINT
process.on("SIGTERM", () => stan.close()); // close connection to nats server on SIGTERM

// Core concurrency Issues
// 1. Listener is not processing messages
// 2. One listener might be processing messages faster than another
// 3. NATS might think a client is still alive when it is dead
// 4. We might recieve the same event twice