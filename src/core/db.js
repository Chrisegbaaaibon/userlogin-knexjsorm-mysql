const mongoose = require('mongoose');
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