const schemas = require('../schema/userSchema');

/**
 * @param {import('knex')} knex
 */
exports.up = async function(knex) {
  // Create tables in the correct order (respecting references)
  await knex.schema.createTable('users', (table) => schemas.users(table, knex));
  await knex.schema.createTable('products', (table) => schemas.products(table, knex));
  await knex.schema.createTable('orders', (table) => schemas.orders(table, knex));
  await knex.schema.createTable('order_items', (table) => schemas.order_items(table, knex));
  
  // Create additional indexes or triggers if needed
  await knex.raw(`
    CREATE OR REPLACE FUNCTION update_timestamp()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.updated_at = now();
      RETURN NEW;
    END;
    $$ language 'plpgsql';
  `);
  
  // Add triggers for updated_at fields
  const tables = ['users', 'products', 'orders', 'order_items'];
  for (const table of tables) {
    await knex.raw(`
      CREATE TRIGGER ${table}_updated_at
      BEFORE UPDATE ON "${table}"
      FOR EACH ROW
      EXECUTE PROCEDURE update_timestamp();
    `);
  }
};

exports.down = async function(knex) {
  // Drop tables in reverse order (respecting references)
  await knex.schema.dropTableIfExists('order_items');
  await knex.schema.dropTableIfExists('orders');
  await knex.schema.dropTableIfExists('products');
  await knex.schema.dropTableIfExists('users');
  
  // Drop the timestamp function
  await knex.raw('DROP FUNCTION IF EXISTS update_timestamp();');
};