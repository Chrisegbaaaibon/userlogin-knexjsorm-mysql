/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.up = function(knex) {
    return knex.schema.createTable('usersaccountsX', table => {
        table.increments('id');
        table.string('email').notNullable().unique();
        table.string('name').notNullable();
        table.string('username').notNullable().unique();
        table.string('password').notNullable();
        table.integer('accountnumber').unique()
        table.foreign('transaction_user_id_foreign').references('transactionsaccountss.id');
        table.foreign('transaction_receiver_id_foreign').references('transactionsaccountss.id')
        table.integer('balance').defaultTo(0.0)
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('user');
};
