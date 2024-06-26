// Import the redis module
import redis from 'redis';

// Create a new Redis client
const client = redis.createClient();

// Set up event listeners for the Redis client
client.on("error", (error) => {
  // Log an error message if the client fails to connect to the server
  if (error) console.log(`Redis client not connected to the server: ${error}`);
}).on('ready', () => {
  // Log a success message when the client successfully connects to the server
  console.log('Redis client connected to the server');
});

// Function to publish a message to a Redis channel after a specified delay
const publishMessage = (message, time) => {
  // Use setTimeout to delay the execution
  setTimeout(() => {
    // Log a message indicating the message is about to be sent
    console.log(`About to send ${message}`);
    // Publish the message to the 'holberton school channel' channel
    client.publish('holberton school channel', message);
  }, time);
}

// Publish several messages to the channel with different delays
publishMessage("Holberton Student #1 starts course", 100);  // Send after 100 ms
publishMessage("Holberton Student #2 starts course", 200);  // Send after 200 ms
publishMessage("KILL_SERVER", 300);                         // Send after 300 ms
publishMessage("Holberton Student #3 starts course", 400);  // Send after 400 ms
