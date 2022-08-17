exports.up = function (knex) {
    return knex.schema.createTable('user', table => {
        table.increments('id');
        table.string('email').notNullable().unique();
        table.string('name').notNullable();
        table.string('username').notNullable().unique();
        table.string('password').notNullable();
        table.integer('accountnumber').unique()
        table.integer('balance').defaultTo(0.0)
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('user');
}
