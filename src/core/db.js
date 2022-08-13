const knex = require("knex")({
    client: 'mysql',
    connection: {
        host : '127.0.0.1',
        port : 3306,
        user : 'your_database_user',
        password : 'your_database_password',
        database : 'myapp_test'
    }
});

const {errorHandling} = require("./error-handler");
require('dotenv').config()

exports.db = async ()=>{
    try{
        mongoose.connect(process.env.MONGO_URI, (err)=>{
            if(err) return errorHandling(`500|Connecting to db failed.|`);
            console.log('Connected')
        })
    }catch(e){
        new Error(e.stack)
    }
}