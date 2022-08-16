exports.up = function (knex){
    return knex.schema.createTable('transaction', table=>{
        table.increments('id');
        table.integer('user_id').references('user.id').unsigned().index().onDelete('CASCADE');
        table.integer('receiver_id').references('user.id')
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
}