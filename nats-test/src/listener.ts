import nats, { Message } from "node-nats-streaming";
import { randomBytes } from "crypto";
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
    // Options
    const options = stan
        .subscriptionOptions()  // create subscription options
        .setManualAckMode(true)  // set manual ack mode
        .setDeliverAllAvailable() // set deliver all available messages
        .setDurableName('accounting-service');  // Durable subscription 

    const subscription = stan.subscribe("ticket:created", 'queue-group-name', options);   //subscribe to the ticket:created topic with the orders-service-queue-group
    subscription.on("message", (msg: Message) => {
        const data = msg.getData(); //get the data from the message

        if (typeof data === "string") {
            console.log(`Received event #${msg.getSequence()} with data ${data}`);
        }
        msg.ack();  //acknowledge the message
    });
});
// Interrupt Message Listener
process.on("SIGINT", () => stan.close()); // close connection to nats server on SIGINT
process.on("SIGTERM", () => stan.close()); // close connection to nats server on SIGTERM

// Core concurrency Issues
// 1. Listener is not processing messages
// 2. One listener might be processing messages faster than another
// 3. NATS might think a client is still alive when it is dead
// 4. We might recieve the same event twice
