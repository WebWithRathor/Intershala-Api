const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    employe:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employe',
    },
    student:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student',
    }],
    title: String,
    skill: String,
    jobtype:{
        type: String,
        enum: ['In office', 'Remote']
    },
    descripton:String,
    openings: Number,
    salary: Number,
    prefrences:String,
    perks:String,
    assessments:String,
}, { timestamps: true });


module.exports = mongoose.model('job', jobSchema);