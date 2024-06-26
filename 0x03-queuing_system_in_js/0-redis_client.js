// Enable strict mode for better error handling and to avoid silent errors
'use strict';

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
