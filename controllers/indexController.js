const { CatchAsyncError } = require("../middlewares/CatchAsyncError")
const studentModel = require('../models/StudendModel.js')
const ErrorHandler = require('../utils/ErrorHandler.js');
const { sendMail } = require("../utils/SendMail.js");
const { SendToken } = require("../utils/SendToke.js");


exports.homepage = CatchAsyncError(async (req, res, next) => {
    res.json({ "name": "devraj" })
});

exports.studentsignup = CatchAsyncError(async (req, res, next) => {
    const student = await new studentModel(req.body).save();
    SendToken(student, 201, res);
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
    SendToken(student, 200, res);
})

exports.studentsignout = CatchAsyncError(async (req, res, next) => {
    res.clearCookie('token');
    res.json({ message: 'succefully signed out' })
})

exports.CurrentStudent = CatchAsyncError(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec();
    res.json(student);
})

exports.studentForgetPassword = CatchAsyncError(async (req, res, next) => {
    const student = await studentModel.findOne({ email: req.body.email }).exec();
    if (!student) next(new ErrorHandler("The Student with this email doesn't exsists", 401));
    const url = `${req.protocol}://${req.get('host')}/student/resetpassword/${student._id}`;
    sendMail(req, res, next, url);
    student.passwordresettoken = "1";
    student.save();
    res.json({ message: "Successfull send Email for reset password", url });
})

exports.ResetPassword = CatchAsyncError(async (req, res, next) => {
    const student = await studentModel.findOne({ _id: req.params.student }).exec();
    if (student.passwordresettoken == "1") {
        student.passwordresettoken = "0";
        student.password = req.body.password;
    } else {
       return next(new ErrorHandler("Invalid password reset link", 404))
    }
    await student.save()
    res.json({ message: "Successfully reset password" });
})

exports.ChangePassword = CatchAsyncError(async (req, res, next) => {
    const student = await studentModel.findOne({ _id: req.id }).exec();
    student.password = req.body.password;
    await student.save()
    res.json({ message: "Successfully Change password" });
})