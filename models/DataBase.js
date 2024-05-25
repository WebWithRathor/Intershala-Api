const mongoose = require('mongoose');

exports.ConnectDatabase = async ()=>{
    try {
        await mongoose.connect(process.env.MongoDbUrl);
        console.log('Database Connected');
    } catch (error) {
        console.log(error.message);
    }
}