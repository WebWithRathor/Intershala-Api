const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema({
    employe:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employe',
    },
    student:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student',
    }],
    profile: String,
    skill: String,
    internshiptype:{
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


module.exports = mongoose.model('internship', internshipSchema);