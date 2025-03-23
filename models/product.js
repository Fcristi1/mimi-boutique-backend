const { query } = require('../config/db');

const createProductTable = async () => {
  try {
    await query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        price NUMERIC
      )
    `);
  } catch (err) {
    console.error('Error creating product table:', err);
    throw err;
  }
};

const getAllProducts = async () => {
  const result = await query('SELECT * FROM products');
  return result.rows;
};

const addProduct = async (product) => {
  const { brand, size, model, color, price } = product;
  const result = await query(
    'INSERT INTO products (brand, size, model, color, price) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [brand, size, model, color, price]
  );
  return result.rows[0];
};

module.exports = {
  createProductTable,
  getAllProducts,
  addProduct,
};