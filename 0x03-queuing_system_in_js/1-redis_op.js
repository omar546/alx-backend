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

// Function to set a new key-value pair in Redis
function setNewSchool(schoolName, value) {
  // Use the Redis client's set method to store the key-value pair
  client.set(schoolName, value, (error, reply) => {
    // Log the reply from the Redis server
    redis.print(`Reply: ${reply}`);
  });
}

// Function to get the value of a key from Redis
function displaySchoolValue(schoolName) {
  // Use the Redis client's get method to retrieve the value for the key
  client.get(schoolName, (error, reply) => {
    // Log the value retrieved from the Redis server
    console.log(reply);
  });
}

// Display the value of the key 'Holberton' (will likely be null if not set)
displaySchoolValue('Holberton');

// Set the value for the key 'HolbertonSanFrancisco' to '100'
setNewSchool('HolbertonSanFrancisco', '100');

// Display the value of the key 'HolbertonSanFrancisco'
displaySchoolValue('HolbertonSanFrancisco');
