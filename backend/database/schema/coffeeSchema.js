const coffeeSchema = {
    Place: (table, knex) => {
        table.uuid('place_id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.string('place_url').unique().notNullable();
        table.string('place_name').notNullable();
        table.string('price_range');
        table.string('phone');
        table.string('website');
        table.decimal('latitude', 9, 6).notNullable();
        table.decimal('longitude', 9, 6).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    },

    PlaceType: (table, knex) => { 
        table.uuid('place_type_id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.uuid('place_id').references('place_id').inTable('Place').onDelete('CASCADE');
        table.string('type_name').notNullable();
    }
};

module.exports = {
    coffeeSchema,
};