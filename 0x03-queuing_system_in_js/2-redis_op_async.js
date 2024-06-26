// Import the redis module
import redis from 'redis';
// Import the promisify function from the util module to convert callbacks to promises
import { promisify } from 'util';

// Create a new Redis client
const client = redis.createClient();
// Promisify the client's get method for easier use with async/await
const cGet = promisify(client.get).bind(client);

// Set up event listeners for the Redis client
client.on("error", (error) => {
  // Log an error message if the client fails to connect to the server
  if (error) console.log(`Redis client not connected to the server: ${error}`);
}).on('ready', () => {
  // Log a success message when the client successfully connects to the server
  console.log('Redis client connected to the server');
});

// Function to set a new key-value pair in Redis
function setNewSchool(schoolName, value) {
  // Use the Redis client's set method to store the key-value pair
  client.set(schoolName, value, (error, reply) => {
    // Log the reply from the Redis server
    redis.print(`Reply: ${reply}`);
  });
}

// Async function to get the value of a key from Redis
const displaySchoolValue = async (schoolName) => {
  // Use the promisified get method to retrieve the value for the key
  const reply = await cGet(schoolName);
  // Log the value retrieved from the Redis server
  console.log(reply);
}

// Immediately Invoked Function Expression (IIFE) to run async code
(async () => {
  // Display the value of the key 'Holberton' (will likely be null if not set)
  await displaySchoolValue('Holberton');
  // Set the value for the key 'HolbertonSanFrancisco' to '100'
  setNewSchool('HolbertonSanFrancisco', '100');
  // Display the value of the key 'HolbertonSanFrancisco'
  await displaySchoolValue('HolbertonSanFrancisco');
})();
