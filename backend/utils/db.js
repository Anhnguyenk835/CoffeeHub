const supabase = require('../config/supabase');


// Function to create a stored procedure for executing SQL
const createExecSqlFunction = async () => {
    try {
      console.log('Creating exec_sql function...');
      
      const { error } = await supabase.rpc('exec_sql', 
                                            { sql: 'SELECT 1;' });
      
      if (error) {
        console.error('Error creating exec_sql function:', error);
        return false;
      }
      
      console.log('exec_sql function created successfully!');
      return true;
    } catch (error) {
      console.error('Error creating exec_sql function:', error);
      return false;
    }
  };



// test database connection
const testDbConnection = async () => {
    try {
        const {data, err} = await supabase.from('pg_tables').select('*').limit(1);

        if (err) {
            console.error('Connection error to Supabase:', err);
            return false;
        }

        console.log('Database connection successful:');
        return true;
    }
    catch (error) {
        console.error('Connection error to Supabase:', error);
        // throw error;
        return false;
    }
};


module.exports = { testDbConnection, createExecSqlFunction };