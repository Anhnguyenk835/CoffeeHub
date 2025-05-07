const coffeeSchema = {
    Coffee_Shop: (table, knex) => {
        table.string('place_id').primary();
        table.text('place_url').unique().notNullable();
        table.text('place_name').notNullable();
        table.text('place_address').notNullable();
        table.decimal('latitude', 30, 20).notNullable();
        table.decimal('longitude', 30, 20).notNullable();
        table.specificType('type', 'text[]');
        table.string('price_range');
        table.text('website');
        table.string('phone');
        table.float('rating');
        table.text('online_order_link');
        table.text('thumbnail');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());

        table.unique(['latitude', 'longitude'], 'unique_lat_long');
    },

    Coffee_Extension: (table, knex) => {
        table.uuid('ext_id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.string('place_id').references('place_id').inTable('Coffee_Shop').onDelete('CASCADE');
        table.string('category');
        table.specificType('values', 'text[]');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    },

    Coffee_Rating: (table, knex) => {
        table.uuid('rating_id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.string('place_id').references('place_id').inTable('Coffee_Shop').onDelete('CASCADE');
        table.integer('stars').notNullable(); 
        table.integer('amount');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    },

    Coffee_Image: (table, knex) => {
        table.uuid('image_id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.string('place_id').references('place_id').inTable('Coffee_Shop').onDelete('CASCADE');
        table.text('img_title');
        table.text('img_url').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    },

    Coffee_Opening_Hours: (table, knex) => {
        table.uuid('opening_hours_id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.string('place_id').references('place_id').inTable('Coffee_Shop').onDelete('CASCADE');
        table.string('day').notNullable();
        table.string('time').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    }

    // PlaceQuestion: (table, knex) => {
    //     table.uuid('place_question_id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    //     table.uuid('place_id').references('place_id').inTable('Place').onDelete('CASCADE');
    //     table.string('question').notNullable();
    //     table.date('question_date').notNullable();
    // },

    // QuestionAnswer: (table, knex) => {
    //     table.uuid('question_answer_id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    //     table.uuid('place_question_id').references('place_question_id').inTable('PlaceQuestion').onDelete('CASCADE');
    //     table.string('answer').notNullable();
    //     table.date('answer_date').notNullable();
    // },
};

module.exports = {
    coffeeSchema,
};