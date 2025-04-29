const { createClient } = require('@supabase/supabase-js');
const knex = require('knex');
const knexConfig = require('../knexfile');

const environment = process.env.NODE_ENV || 'development';

// init Knex configuration
const db = knex(knexConfig[environment]);

// Initialize Supabase client
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY,
    process.env.SUPABASE_SERVICE_ROLE_KEY
)

// Helper function to run migrations and log
const runMigrations = async () => {
    try {
        console.log('Running database migrations...');
        await db.migrate.latest(); // provided function by knex
        console.log('Migrations completed successfully.');
        return true;
    } 
    catch (error) {
        console.error('Error occured in running migrations:', error);
        return false;
    }
};

module.exports = {
    db,
    supabase,
    runMigrations
}