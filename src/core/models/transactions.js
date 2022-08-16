const createGuts = require('../helper')

const name = 'Project'
const tableName = 'projects'


const selectableProps = [
    'id',
    'user_id',
    'receiver_id',
    'transactionType',
    'transactionAmount',
    'VAT',
    'previousBalance',
    'currentBalance',
    'created_at',
    'updated_at'
]

module.exports = knex =>{
    const guts = createGuts({
        knex,
        name,
        tableName,
        selectableProps
    })

    return {
        ...guts
    }
}
