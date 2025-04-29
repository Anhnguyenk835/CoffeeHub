require('dotenv').config({ path: '../env' });
const { runMigrations } = require('./index');

const updateDatabase = async () => {
    try {
        console.log('Running database migrations...');
        const migrationsSuccess = await runMigrations();
        if (!migrationsSuccess) {
            console.error('Migrations failed.');
            process.exit(1);
        }
        console.log('Database migrations completed successfully.');
        process.exit(0); // Exit successfully
    } catch (error) {
        console.error('Error occurred during database migrations:', error);
        process.exit(1); // Exit with failure
    }
};

updateDatabase();