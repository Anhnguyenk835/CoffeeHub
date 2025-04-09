const supabase = require('../config/supabase');
const { createExecSqlFunction } = require('../utils/db');
// const { createPlacesTable } = require('../database/migrations/places_mig');
const { createTable } = require('../database/migration');

// Function to initialize the database
const initializeDatabase = async () => {
  try {
    console.log('Initializing database...');
    
    // Create exec_sql function
    const functionCreated = await createExecSqlFunction();
    if (!functionCreated) {
      console.error('Failed to create exec_sql function');
      return false;
    }
    
    // Create tables
    const tablesCreated = await createTable('place_types.sql');
    if (!tablesCreated) {
      console.error('Failed to create new tables');
      return false;
    }
    
    console.log('Database initialized successfully!');
    return true;
  } catch (error) {
    console.error('Error initializing database:', error);
    return false;
  }
};

// Run the initialization
initializeDatabase()
  .then(success => {
    if (success) {
      console.log('Database setup completed successfully!');
    } else {
      console.error('Database setup failed!');
    }
    process.exit(success ? 0 : 1);
  })
  .catch(error => {
    console.error('Unhandled error during database setup:', error);
    process.exit(1);
  });
