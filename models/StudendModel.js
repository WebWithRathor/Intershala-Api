const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const studentSchema = new mongoose.Schema({
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
    passwordresettoken:{
        type: String,
        default:"0"
    }
}, { timestamps: true });

studentSchema.pre("save",function(){

    if(!this.isModified('password')) return;

    let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
})

studentSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

studentSchema.methods.generatejwt = function(){
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

module.exports = mongoose.model('Student', studentSchema);