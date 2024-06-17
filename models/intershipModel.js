const mongoose = require('mongoose');

const intershipSchema = new mongoose.Schema({
    profile: String,
    skill: String,
    intershiptype:{
        type: String,
        enum: ['In office', 'Remote']
    },
    openigs:Number,
    from:String,
    to:String,
    duration:String,
    responsibility:String,
    stipend:{
        status:{
            type: String,
            enum: ['Negotiable', 'Fixed','performance based','unpaid']
        },
        amount:Number,
    },
    perks:String,
    assessments:String,
}, { timestamps: true });


module.exports = mongoose.model('intership', intershipSchema);