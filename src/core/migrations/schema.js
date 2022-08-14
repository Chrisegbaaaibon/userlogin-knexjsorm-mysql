exports.up = function (knex) {
    return knex.schema.createTable('user', table => {
        table.increments('id');
        table.string('email').notNullable().unique();
        table.string('name').notNullable();
        table.string('username').notNullable().unique();
        table.string('password').notNullable();
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('user');
}

exports.up = function (knex){
    return knex.schema.createTable('account', table =>{
        table.increments('id');
        table.string('userId').unique().notNullable();
        table.string('accountName').notNullable();
        table.increments('accountNumber').unique();
        table.string('phonenumber').unique().notNullable()
        table.string('balance');
    })
}

exports.down = function (knex){
    return knex.schema.dropTableIfExists('account')
}

