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

// Subscribe to the 'holberton school channel' channel
client.subscribe("holberton school channel");

// Set up an event listener for incoming messages on the subscribed channel
client.on('message', (channel, message) => {
  // Log the received message
  console.log(message);
  // Check if the received message is 'KILL_SERVER'
  if (message === 'KILL_SERVER') {
    // Unsubscribe from the channel
    client.unsubscribe(channel);
    // Exit the process with a success status code
    process.exit(0);
  }
});
