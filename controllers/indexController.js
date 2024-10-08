const { CatchAsyncError } = require("../middlewares/CatchAsyncError")
const studentModel = require('../models/StudentModel.js');
const internshipModel = require("../models/internshipModel.js");
const jobsModel = require("../models/jobsModel.js");
const ErrorHandler = require('../utils/ErrorHandler.js');
const { sendMail } = require("../utils/SendMail.js");
const { SendToken } = require("../utils/SendToken.js");
const InitImageKit = require("../utils/ImageKit.js").InitImageKit();
const path = require('path')


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
    const student = await studentModel.findOne({ _id: req.id }).exec();
    if (!student) {
        return next(new ErrorHandler("The Student with this email doesn't exsists", 401))
    }
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
    const student = await studentModel.findOne({ _id: req.id }).select('+password').exec();
    if(!student.comparePassword(req.body.oldPassword)){
        return next(new ErrorHandler("Old password does not match", 400));
    }
    student.password = req.body.newPassword;
    await student.save()
    res.json({ message: "Successfully Change password" });
})

exports.StudentUpdate = CatchAsyncError(async (req, res, next) => {
    const student = await studentModel.findOneAndUpdate({ _id: req.id }, req.body, { runValidators: true, context: 'query' }).exec();
    res.json({ message: "Successfully Details updated", student });
})

exports.StudentAvatar = CatchAsyncError(async (req, res, next) => {

    const student = await studentModel.findOne({ _id: req.id }).exec();

    if (!req.files) {
        return next(new ErrorHandler("Please upload a file", 400))
    }
    const file = req.files.avatar;
    if (student.avatar && !student.avatar.fileid === 'default_avatar_y0j12o') {
        await InitImageKit.deleteFile(student.avatar.fileid);
    }
    const modifiedName = `internshala-${Date.now()}${path.extname(file.name)}`
    const { fileId, url } = await InitImageKit.upload({
        file: file.data,
        fileName: modifiedName
    });
    student.avatar = { fileId, url };
    student.save();
    res.json({ student });
})

// -----------------apply job --------------------
exports.studentApplyJob = CatchAsyncError(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec();
    if (!student) return new ErrorHandler("No student found with this email address", 404);
    const job = await jobsModel.findById(req.params.jobid);
    const alreadyApplied = student.jobs.includes(job._id);
    if (alreadyApplied) {
        return next(new ErrorHandler("You have already applied for this internship", 400));
    }
    student.jobs.push(job._id);
    job.student.push(student._id);
    await student.save();
    await job.save();
    res.json({ message: "Successfully Applied for job", student });
})

// -----------------apply internship --------------------
exports.studentApplyInternship = CatchAsyncError(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec();
    if (!student) return next(new ErrorHandler("No student found with this email address", 404));
    const internship = await internshipModel.findById(req.params.internshipid);
    const alreadyApplied = student.internships.includes(internship._id);
    if (alreadyApplied) {
        return next(new ErrorHandler("You have already applied for this internship", 400));
    }
    student.internships.push(internship._id);
    internship.student.push(student._id);
    await student.save();
    await internship.save();
    res.json({ message: "Successfully Applied for internship", student });
})

// -----internship 

exports.readSingleInternship = CatchAsyncError(async (req, res, next) => {
    const internship = await internshipModel.findById(req.params.id).exec();
    res.status(200).json(internship)
})

exports.readAllInternship = CatchAsyncError(async (req, res, next) => {
    const internships = await internshipModel.find().exec();
    res.status(200).json(internships)
})


//  job

exports.readSingleJob = CatchAsyncError(async (req, res, next) => {
    const job = await jobsModel.findById(req.params.id).exec();
    res.status(200).json(job)
})

exports.readAllJob = CatchAsyncError(async (req, res, next) => {
    const jobs = await jobsModel.find().exec();
    res.status(200).json(jobs)
})