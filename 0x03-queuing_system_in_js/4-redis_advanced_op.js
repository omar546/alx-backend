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

// Define the name of the hash and the key-value pairs to be stored in Redis
const name = 'HolbertonSchools';
const values = {
  'Portland': 50,
  'Seattle': 80,
  'New York': 20,
  'Bogota': 20,
  'Cali': 40,
  'Paris': 2
};

// Iterate over the entries in the values object and store each key-value pair in the Redis hash
for (const [key, val] of Object.entries(values)) {
  // Use the Redis client's hset method to store the key-value pair in the hash
  client.hset(name, key, val, (error, reply) => 
    // Log the reply from the Redis server
    redis.print(`Reply: ${reply}`)
  );
}

// Retrieve and log all the key-value pairs in the Redis hash
client.hgetall(name, (error, object) => console.log(object));
