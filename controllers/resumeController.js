const { CatchAsyncError } = require("../middlewares/CatchAsyncError")
const studentModel = require('../models/StudendModel.js')
const ErrorHandler = require('../utils/ErrorHandler.js');
const {v4 : uuidV4} =require('uuid')


exports.resume = CatchAsyncError(async (req, res, next) => {
    const {resume} = await studentModel.findById(req.id)
    res.json(resume)
});

exports.addEducation = CatchAsyncError(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec()
    student.resume.education.push({...req.body,id:uuidV4()});
    await student.save()
    res.json(student.resume)
});

exports.editEducation = CatchAsyncError(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec()
    const eduIndex = student.resume.education.findIndex(edu => edu.id === req.params.eduid)
    student.resume.education[eduIndex] = {...student.resume.education[eduIndex],...req.body};
    await student.save()
    res.json(student.resume)
});

exports.deleteEducation = CatchAsyncError(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec()
    student.resume.education = student.resume.education.filter(e=>e.id !== req.params.eduid);    
    await student.save()
    res.json(student.resume)
});

