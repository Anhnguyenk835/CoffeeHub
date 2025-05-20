const schema = require('../schema/coffeeSchema');

/**
 * @param {import('knex')} knex
 */
exports.up = async function (knex) {
    // Check if tables exist before creating them
    const tableExists = async (tableName) => {
        return knex.schema.hasTable(tableName);
    };

    if (!(await tableExists('Coffee_Shop'))) {
        await knex.schema.createTable('Coffee_Shop', (table) => schema.coffeeSchema.Coffee_Shop(table, knex));
    }
    
    if (!(await tableExists('Coffee_Extension'))) {
        await knex.schema.createTable('Coffee_Extension', (table) => schema.coffeeSchema.Coffee_Extension(table, knex));
    }
       
    if (!(await tableExists('Coffee_Rating'))) {
        await knex.schema.createTable('Coffee_Rating', (table) => schema.coffeeSchema.Coffee_Rating(table, knex));
    }
    
    if (!(await tableExists('Coffee_Image'))) {
        await knex.schema.createTable('Coffee_Image', (table) => schema.coffeeSchema.Coffee_Image(table, knex));
    }
    
    if (!(await tableExists('Coffee_Opening_Hours'))) {
        await knex.schema.createTable('Coffee_Opening_Hours', (table) => schema.coffeeSchema.Coffee_Opening_Hours(table, knex));
    }

    const functionExists = await knex.raw(`
        SELECT 1 FROM pg_proc WHERE proname = 'update_timestamp'
    `);
    
    if (!functionExists.rows.length) {
        await knex.raw(`
            CREATE OR REPLACE FUNCTION update_timestamp()
            RETURNS TRIGGER AS $$
            BEGIN
                NEW.updated_at = NOW();
                RETURN NEW;
            END;
            $$ LANGUAGE plpgsql;
        `);
    }

    const tables = ['Coffee_Shop', 'Coffee_Extension', 'Coffee_Rating', 'Coffee_Image', 'Coffee_Opening_Hours'];
    for (const table of tables) {
        const triggerExists = await knex.raw(`
            SELECT 1 FROM pg_trigger WHERE tgname = '${table}_updated_at'
        `);
        
        if (!triggerExists.rows.length) {
            await knex.raw(`
                CREATE TRIGGER ${table}_updated_at
                BEFORE UPDATE ON "${table}"
                FOR EACH ROW
                EXECUTE PROCEDURE update_timestamp();
            `);
        }
    }
};


/**
 * @param {import('knex')} knex
 */
exports.down = async function (knex) {
    // Drop triggers and function
    const tables = ['Coffee_Shop', 'Coffee_Extension', 'Coffee_Rating', 'Coffee_Image', 'Coffee_Opening_Hours'];
    for (const table of tables) {
        await knex.raw(`DROP TRIGGER IF EXISTS ${table}_updated_at ON "${table}"`);
    }
    await knex.raw('DROP FUNCTION IF EXISTS update_timestamp()');

    // Drop tables
    await knex.schema.dropTableIfExists('Coffee_Opening_Hours');
    await knex.schema.dropTableIfExists('Coffee_Image');
    await knex.schema.dropTableIfExists('Coffee_Rating');
    await knex.schema.dropTableIfExists('Coffee_Extension');
    await knex.schema.dropTableIfExists('Coffee_Shop');
};