const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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

module.exports = mongoose.model('Student', studentSchema);