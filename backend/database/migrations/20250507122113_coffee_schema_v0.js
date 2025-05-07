const schema = require('../schema/coffeeSchema');

/**
 * @param {import('knex')} knex
 */
exports.up = async function (knex) {
    // console.log(knex);
    await knex.schema.createTable('Coffee_Shop', (table) => schema.coffeeSchema.Coffee_Shop(table, knex));
    await knex.schema.createTable('Coffee_Extension', (table) => schema.coffeeSchema.Coffee_Extension(table, knex));
    await knex.schema.createTable('Coffee_Rating', (table) => schema.coffeeSchema.Coffee_Rating(table, knex));
    await knex.schema.createTable('Coffee_Image', (table) => schema.coffeeSchema.Coffee_Image(table, knex));
    await knex.schema.createTable('Coffee_Opening_Hours', (table) => schema.coffeeSchema.Coffee_Opening_Hours(table, knex));

    await knex.raw(`
        CREATE OR REPLACE FUNCTION update_timestamp()
        RETURNS TRIGGER AS $$
        BEGIN
            NEW.updated_at = NOW();
            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
    `); 

    // ADD TRIGGER
    const tables = ['Coffee_Shop', 'Coffee_Extension', 'Coffee_Rating', 'Coffee_Image', 'Coffee_Opening_Hours'];
    for (const table of tables) {
        await knex.raw(`
            CREATE TRIGGER ${table}_updated_at
            BEFORE UPDATE ON "${table}"
            FOR EACH ROW
            EXECUTE PROCEDURE update_timestamp();
        `);
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
    await knex.schema.dropTableIfExists('Coffee_Shop');
    await knex.schema.dropTableIfExists('Coffee_Extension');
    await knex.schema.dropTableIfExists('Coffee_Rating');
    await knex.schema.dropTableIfExists('Coffee_Image');
    await knex.schema.dropTableIfExists('Coffee_Opening_Hours');
};