// Import necessary modules
import express from 'express';
import redis from 'redis';
import { promisify } from 'util';

// Create a Redis client
const client = redis.createClient();

// Create an Express application
const app = express();

// Promisify Redis client methods
const getFromClient = promisify(client.get).bind(client);
const setToClient = promisify(client.set).bind(client);

// Sample list of products with their details
const products = [
  { Id: 1, name: 'Suitcase 250', price: 50, stock: 0 },
  { Id: 2, name: 'Suitcase 450', price: 100, stock: 10 },
  { Id: 3, name: 'Suitcase 650', price: 350, stock: 2 },
  { Id: 4, name: 'Suitcase 1050', price: 550, stock: 15 }
];

// Function to get a product by its ID
const getItemById = (id) => {
  for (const product of products) {
    if (product.Id === id) return product;
  }
};

// Function to reserve stock of a product by its ID
const reserveStockById = async (itemId, stock) => {
  await setToClient(itemId, stock);
};

// Function to get the current reserved stock of a product by its ID
const getCurrentReservedStockById = async (itemId) => {
  const currentReservedStock = await getFromClient(itemId);
  return currentReservedStock;
};

// Endpoint to list all products
app.get('/list_products', (req, res) => res.send(JSON.stringify(products)));

// Endpoint to get details of a specific product by its ID
app.get('/list_products/:itemId', async (req, res) => {
  const id = Number(req.params.itemId);
  const item = getItemById(id);
  if (!item) {
    res.status(404).json({ status: 'Product not found' });
    return;
  }
  const currentReservedStock = await getCurrentReservedStockById(id);
  item.reservedStock = currentReservedStock ? Number(currentReservedStock) : 0;
  res.json(item);
});

// Endpoint to reserve a product by its ID
app.get('/reserve_product/:itemId', async (req, res) => {
  const id = Number(req.params.itemId);
  const item = getItemById(id);
  if (!item) {
    res.status(404).json({ status: 'Product not found' });
    return;
  }
  const currentReservedStock = await getCurrentReservedStockById(id);
  item.reservedStock = currentReservedStock ? Number(currentReservedStock) : 0;
  if (item.stock - item.reservedStock < 1) {
    res.status(403).json({ status: 'Not enough stock available', id });
    return;
  }
  await reserveStockById(id, Number(currentReservedStock) + 1);
  res.json({ status: 'Reservation confirmed', id });
});

// Start the Express server on port 1245
app.listen(1245, () => {
  console.log('Server is running on port 1245');
});
