/**
 * Database schema definitions
 * This file contains all table schemas in one place
 */

// Schema definitions for Knex migrations
const schemas = {
    users: (table, knex) => {
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
      table.string('email').unique().notNullable();
      table.string('name');
      table.timestamps(true, true);
    },
    
    products: (table, knex) => {
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
      table.string('name').notNullable();
      table.text('description');
      table.decimal('price', 10, 2).notNullable();
      table.integer('stock').notNullable().defaultTo(0);
      table.timestamps(true, true);
    },
    
    orders: (table, knex) => {
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
      table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE');
      table.enum('status', ['pending', 'completed', 'cancelled']).defaultTo('pending');
      table.decimal('total', 10, 2).notNullable();
      table.timestamps(true, true);
    },
    
    order_items: (table, knex) => {
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
      table.uuid('order_id').references('id').inTable('orders').onDelete('CASCADE');
      table.uuid('product_id').references('id').inTable('products');
      table.integer('quantity').notNullable();
      table.decimal('price', 10, 2).notNullable();
      table.timestamps(true, true);
      
      // Composite index for better query performance
      table.index(['order_id', 'product_id']);
    }
  };
  
  module.exports = schemas;