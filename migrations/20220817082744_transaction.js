/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.up = function(knex) {
    return knex.schema.createTable('transactionsaccounts', table=>{
        table.increments('id');
        table.integer('user_id').references('usersaccountsX.id').unsigned()
        table.integer('receiver_id').references('usersaccountsX.id').unsigned()
        table.enum('type', ['deposit', 'transfer', 'withdraw'], {
            useNative: true,
            enumName: 'transactionType'
        })
        table.integer('transactionAmount').notNullable();
        table.integer('VAT').notNullable()
        table.integer('previousBalance').notNullable()
        table.integer('currentBalance').notNullable();
        table.timestamps(true, true)
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('transaction');
};
