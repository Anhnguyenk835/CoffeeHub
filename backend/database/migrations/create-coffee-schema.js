const schema = require('../schema/coffeeSchema');

/**
 * @param {import('knex')} knex
 */
exports.up = async function (knex) {
    // console.log(knex);
    await knex.schema.createTable('Place', (table) => schema.coffeeSchema.Place(table, knex));
    await knex.schema.createTable('PlaceType', (table) => schema.coffeeSchema.PlaceType(table, knex));

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
    const tables = ['Place', 'PlaceType'];
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
    const tables = ['Place', 'PlaceType'];
    for (const table of tables) {
        await knex.raw(`DROP TRIGGER IF EXISTS ${table}_updated_at ON "${table}"`);
    }
    await knex.raw('DROP FUNCTION IF EXISTS update_timestamp()');

    // Drop tables
    await knex.schema.dropTableIfExists('PlaceType');
    await knex.schema.dropTableIfExists('Place');
};