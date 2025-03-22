const db = require('../config/db');

const createProductTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      brand VARCHAR(50) NOT NULL,
      size VARCHAR(10) NOT NULL,
      model VARCHAR(100) NOT NULL,
      color VARCHAR(50) NOT NULL,
      price NUMERIC(10, 2) NOT NULL
    )
  `;
  await db.query(queryText);
};

const getAllProducts = async () => {
  const result = await db.query('SELECT * FROM products');
  return result.rows;
};

const addProduct = async (product) => {
  const { brand, size, model, color, price } = product;
  const result = await db.query(
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