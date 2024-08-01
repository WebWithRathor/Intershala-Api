const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const studentSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "Firstname is required"],
        maxLength: [15, "Firstname should not exceed 15 characters"],
        minLength: [3, "Firstname should be atleast of 3 characters"]
    },
    lastname: {
        type: String,
        required: [true, "Lastname is required"],
        maxLength: [15, "Lastname should not exceed 15 characters"],
        minLength: [3, "Lastname should be atleast of 3 characters"]
    },
    gender: { type: String,enum: ["Male", "Female", "Others"] },
    avatar: {
        type: Object,
        default: {
            url: "https://imgs.search.brave.com/GrTMprW4fg05XTsfzacsNofnbaMJuXlbLIXZqUAn9vg/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAwLzY0LzY3LzI3/LzM2MF9GXzY0Njcy/NzM2X1U1a3BkR3M5/a2VVbGw4Q1JRM3Az/WWFFdjJNNnFrVlk1/LmpwZw",
            fileid: "default_avatar_y0j12o"
        }
    },
    contact: {
        type: String,
        required: [true, "Contact is required"],
        maxLength: [10, "Contact should not exceed 10 characters"],
        minLength: [10, "Contact should be atleast of 10 characters"]
    },
    city: {
        type: String,
        maxLength: [20, "city name should not exceed 20 characters"],
        minLength: [3, "city name should be atleast of 3 characters"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email"]
    },
    password: {
        type: String,
        select: false,
        maxLength: [15, "Password should not exceed 15 characters"],
        minLength: [5, "Password should be atleast of 5 characters"]
    },
    passwordresettoken: {
        type: String,
        default: "0"
    },
    resume:{
        education:[],
        experience:[],
        skills:[],
        responsibility:[],
        courses:[],
        projects:[],
        workSamples:[],
        accomplishment:[],
    }, 
    internships: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'internship'
    }],
    jobs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'job'
    }],
}, { timestamps: true });

studentSchema.pre("save", function () {

    if (!this.isModified('password')) return;

    let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
})

studentSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

studentSchema.methods.generatejwt = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

module.exports = mongoose.model('student', studentSchema);