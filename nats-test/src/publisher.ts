import nats from "node-nats-streaming"
console.clear()

const stan = nats.connect("ticketing", "abc", {  // nats-streaming
    url: "https://localhost:4222"
}); // connect to nats server

stan.on("connect", () => {  // listen to connect event
    console.log("Publisher connected to NATS")

    const data = JSON.stringify({
        id: "123",
        title: "concert",
        price: 20
    });  // create a json object

    stan.publish("ticket:created", data, () => {
        console.log("Event Published");
    }); // publish event
});