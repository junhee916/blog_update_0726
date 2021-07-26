const mongoose = require('mongoose')

const connectDB = async function(){

    try{

    }
    catch(err){
        console.log(err.message)
        process.env.exit(1)
    }
}

module.exports = connectDB