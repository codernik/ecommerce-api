import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: "ecommerce-api",
    brokers: [process.env.KAFKA_BROKER],
});

const producer = kafka.producer();

(async () => {
    await producer.connect();
})();

export async function publishExceedEvent(data) {
    console.log("Publishing rate limit violation event:", data);
    await producer.send({
        topic: "rate-limit-violations",
        messages: [{ value: JSON.stringify(data) }],
    });
}