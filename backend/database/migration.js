const supabase = require('../config/supabase');
const fs = require('fs');
const path = require('path');

/**
 * Creates a database table using the SQL in the specified schema file
 * @param {string} schema - The name of the schema file (e.g., 'places.sql')
 * @returns {Promise<boolean>} - Success or failure
*/

const createTable = async (schema) => {
  try {
    console.log(`Creating table: ${schema} ...`);

    // Read the schema SQL from 'schema.sql'
    const schemaParse = path.join(__dirname, './schema', schema);
    const schemaSQL = fs.readFileSync(schemaParse, 'utf8');
    
    // Execute SQL to create the places table
    const { error } = await supabase.rpc('exec_sql', { sql: schemaSQL });
    if (error) {
      console.error(`Error creating table from ${schema}: `, error);
      return false;
    }
    console.log(`Table from ${schema} created successfully!`);
    return true;
  } catch (error) {
    console.error(`Migration failed for ${schema}:`, error);
    return false;
  }
};

module.exports = { createTable };
