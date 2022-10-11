const { Kafka } = require('kafkajs');

const start = async () => {
  const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['ticketing.dev:9092'],
    acks: -1,
  });

  const producer = kafka.producer();
  await producer.connect();
  console.log('connected');

  await producer.send({
    topic: 'test-topic',
    messages: [{ value: 'Hello KafkaJS user!' }],
  });

  await producer.disconnect();
};

start();
