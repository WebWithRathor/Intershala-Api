const { CatchAsyncError } = require("../middlewares/CatchAsyncError")
const studentModel = require('../models/StudendModel.js')
const ErrorHandler = require('../utils/ErrorHandler.js');
const { SendToken } = require("../utils/SendToke.js");


exports.homepage = CatchAsyncError(async (req, res, next) => {
    res.json({ "name": "devraj" })
});

exports.studentsignup = CatchAsyncError(async (req, res, next) => {
    const student = await new studentModel(req.body).save();
    SendToken(student,201,res);
})

exports.studentsignin = CatchAsyncError(async (req, res, next) => {
    const student = await studentModel.findOne({ email: req.body.email }).select("+password").exec();
    if (!student) {
        return next(new ErrorHandler("The Student with this email doesn't exsists", 401))
    }
    const isMatch = await student.comparePassword(req.body.password);
    if (!isMatch) {
        return next(new ErrorHandler("Wrong Password", 401))
    }
    SendToken(student,200,res);
})

exports.studentsignout = CatchAsyncError(async (req, res, next) => {
    res.clearCookie('token');
    res.json({message : 'succefully signed out'})
})

exports.CurrentStudent = CatchAsyncError(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec();
    res.json(student);
})