// SQL function to execute arbitrary SQL statements
// This needs to be created in Supabase before running migrations
const createExecSqlFunction = `
CREATE OR REPLACE FUNCTION exec_sql(sql text) 
RETURNS void AS 
$$
BEGIN
  EXECUTE sql;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
`;

const supabase = require('../config/supabase');

// Function to create the exec_sql function in Supabase
const createExecSqlFunctionInSupabase = async () => {
  try {
    console.log('Creating exec_sql function in Supabase...');
    
    // Execute raw SQL to create the function
    const { error } = await supabase.rpc('exec_sql', { sql: createExecSqlFunction });
    
    if (error) {
      // If the function doesn't exist yet, we need a different approach
      console.log('Could not call exec_sql (it might not exist yet). Trying direct SQL execution...');
      
      // Try direct SQL execution (this requires appropriate permissions)
      const { error: directError } = await supabase.rpc('exec_sql_direct', { sql: createExecSqlFunction });
      
      if (directError) {
        console.error('Error creating exec_sql function:', directError);
        return false;
      }
    }
    
    console.log('exec_sql function created successfully!');
    return true;
  } catch (error) {
    console.error('Error creating exec_sql function:', error);
    return false;
  }
};

module.exports = { createExecSqlFunctionInSupabase };
