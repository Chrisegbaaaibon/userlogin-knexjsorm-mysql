const bcrypt = require('bcrypt');
const createGuts = require('../helper')

const name = 'User';
const tableName = 'users';

const selectableProps = [
    'id',
    'username',
    'email',
    'name',
    'email',
    'balance',
    'password',
    'accountNumber',
    'token',
    'created_at',
    'updated_at',
]

const rounds = 10
const hashedPassword = password => bcrypt.hash(password, rounds);
const isMatch = (password, hash)=> bcrypt.compare(password, hash);


const beforeSave = user => {
    if(!user.password) return Promise.resolve(user)

    return hashedPassword(user.password)
        .then(hash => ({...user, password: hash}))
        .catch(err=> `Error ${err}`)
}

const generateAccountNumber = user => {
    user.accountNumber = `0` + Math.floor(1000000000 + Math.random() * 9000000000);
    return user.accountNumber 
}

module.exports = knex => {
    const guts = createGuts({
        knex,
        name,
        tableName,
        selectableProps
    })

    async function create(props){
        await beforeSave(props)
            .then(async user => {
                generateAccountNumber(user.accountNumber)
                guts.create(user)
                }
            )
    }


    const verify = (username, password) => {
        const matchErrorMsg = 'Username or password do not match'

        knex.select()
            .from(tableName)
            .where({username})
            .timeout(guts.timeout)
            .then(user => {
                if (!user) throw matchErrorMsg

                return user
            })
            .then(user => Promise.all([user, isMatch(password, user.password)]))
            .then(([user, isMatch]) => {
                if (!isMatch) throw matchErrorMsg

                return user
            })
    }

    return {
        ...guts,
        create,
        verify
    }
}
