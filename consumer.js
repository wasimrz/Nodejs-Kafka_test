const { Kafka } = require('kafkajs');

const start = async () => {
  const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['ticketing.dev:9092'], //ticketing.dev="localhost"
    requestTimeout: 25000,
    retry: {
      initialRetryTime: 100,
      retries: 8,
    },
  });
  const consumer = kafka.consumer({ groupId: 'test-group' });

  await consumer.connect();
  await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        value: message.value.toString(),
      });
    },
  });
};

start();
