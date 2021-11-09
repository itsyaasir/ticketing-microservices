import { Message } from "node-nats-streaming";
import { Listener } from "./base-listener";

export class TicketCreatedListener extends Listener {  // Child class of Listener class
    subject = "ticket:created";
    queueGroupName = "payment-service";
    onMessage(data: any, msg: Message) {  // on message
        console.log("You got data", data);
        msg.ack();  // acknowledge message
    }
}