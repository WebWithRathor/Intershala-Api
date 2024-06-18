const { CatchAsyncError } = require("../middlewares/CatchAsyncError")
const employeModel = require('../models/employeModel.js');
const intershipModel = require("../models/intershipModel.js");
const ErrorHandler = require('../utils/ErrorHandler.js');
const { sendMail } = require("../utils/SendMail.js");
const { SendToken } = require("../utils/SendToken.js");
const InitImageKit = require("../utils/ImageKit.js").InitImageKit();
const path = require('path')


exports.homepage = CatchAsyncError(async (req, res, next) => {
    res.json({ "name": "devraj Employe" })
});

exports.employesignup = CatchAsyncError(async (req, res, next) => {
    const employe = await new employeModel(req.body).save();
    SendToken(employe, 201, res);
})

exports.employesignin = CatchAsyncError(async (req, res, next) => {
    const employe = await employeModel.findOne({ email: req.body.email }).select("+password").exec();
    if (!employe) {
        return next(new ErrorHandler("The employe with this email doesn't exsists", 401))
    }
    const isMatch = await employe.comparePassword(req.body.password);
    if (!isMatch) {
        return next(new ErrorHandler("Wrong Password", 401))
    }
    SendToken(employe, 200, res);
})

exports.employesignout = CatchAsyncError(async (req, res, next) => {
    const employe = await employeModel.findOne({ _id:req.id }).exec()
    if (!employe) {
        return next(new ErrorHandler("The employe with this email doesn't exsists", 401))
    }
    res.clearCookie('token');
    res.json({ message: 'succefully signed out' })
})

exports.Currentemploye = CatchAsyncError(async (req, res, next) => {
    const employe = await employeModel.findById(req.id).exec();
    res.json(employe);
})

exports.employeForgetPassword = CatchAsyncError(async (req, res, next) => {
    const employe = await employeModel.findOne({ email: req.body.email }).exec();
    if (!employe) next(new ErrorHandler("The employe with this email doesn't exsists", 401));
    const url = `${req.protocol}://${req.get('host')}/employe/resetpassword/${employe._id}`;
    sendMail(req, res, next, url);
    employe.passwordresettoken = "1";
    employe.save();
    res.json({ message: "Successfull send Email for reset password", url });
})

exports.ResetPassword = CatchAsyncError(async (req, res, next) => {
    const employe = await employeModel.findOne({ _id: req.params.employe }).exec();
    if (employe.passwordresettoken == "1") {
        employe.passwordresettoken = "0";
        employe.password = req.body.password;
    } else {
        return next(new ErrorHandler("Invalid password reset link", 404))
    }
    await employe.save()
    res.json({ message: "Successfully reset password" });
})

exports.ChangePassword = CatchAsyncError(async (req, res, next) => {
    const employe = await employeModel.findOne({ _id: req.id }).exec();
    employe.password = req.body.password;
    await employe.save()
    res.json({ message: "Successfully Change password" });
})

exports.employeUpdate = CatchAsyncError(async (req, res, next) => {
    const employe = await employeModel.findOneAndUpdate({ _id: req.id }, req.body, { runValidators: true, context: 'query' }).exec();
    res.json({ message: "Successfully Details updated", employe });
})

exports.employeAvatar = CatchAsyncError(async (req, res, next) => {
    const employe = await employeModel.findOne({ _id: req.id }).exec();
    if (!req.files) {
        return next(new ErrorHandler("Please upload a file", 400))
    }
    const file = req.files.avatar;
    if (employe.avatar) {
        await InitImageKit.deleteFile(employe.avatar.fileId);
    }
    const modifiedName = `internshala-${Date.now()}${path.extname(file.name)}`
    const { fileId, url } = await InitImageKit.upload({
        file: file.data,
        fileName: modifiedName
    });
    employe.avatar = { fileId, url };
    employe.save();
    res.json({ employe });
})

// ---------------- internship-------------------
exports.intershipCreate = CatchAsyncError(async (req, res, next) => {
    const employe = await employeModel.findById(req.id).exec();
    if(!employe){
        return next(new ErrorHandler("The employe with this email doesn't exsists", 401))
    }
    const intership = await new intershipModel(req.body).save();
    res.status(201).json(intership)
})