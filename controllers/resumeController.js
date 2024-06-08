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

exports.addExperience = CatchAsyncError(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec()
    student.resume.experience.push({...req.body,id:uuidV4()});
    await student.save()
    res.json(student.resume)
});

exports.editExperience = CatchAsyncError(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec()
    const expIndex = student.resume.experience.findIndex(exp => exp.id === req.params.expid)
    student.resume.experience[expIndex] = {...student.resume.experience[expIndex],...req.body};
    await student.save()
    res.json(student.resume)
});

exports.deleteExperience = CatchAsyncError(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec()
    student.resume.experience = student.resume.experience.filter(e=>e.id !== req.params.expid);    
    await student.save()
    res.json(student.resume)
});

exports.addSkills = CatchAsyncError(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec()
    student.resume.skills.push({...req.body,id:uuidV4()});
    await student.save()
    res.json(student.resume)
});

exports.editSkills = CatchAsyncError(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec()
    const skillIndex = student.resume.skills.findIndex(skill => skill.id === req.params.skillid)
    student.resume.skills[skillIndex] = {...student.resume.skills[skillIndex],...req.body};
    await student.save()
    res.json(student.resume)
});

exports.deleteSkills = CatchAsyncError(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec()
    student.resume.skills = student.resume.skills.filter(e=>e.id !== req.params.skillid);    
    await student.save()
    res.json(student.resume)
});

exports.addResponsibility = CatchAsyncError(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec()
    student.resume.responsibility.push({...req.body,id:uuidV4()});
    await student.save()
    res.json(student.resume)
});

exports.editResponsibility = CatchAsyncError(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec()
    const resIndex = student.resume.responsibility.findIndex(res => res.id === req.params.resid)
    student.resume.responsibility[resIndex] = {...student.resume.responsibility[resIndex],...req.body};
    await student.save()
    res.json(student.resume)
});

exports.deleteResponsibility = CatchAsyncError(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec()
    student.resume.responsibility = student.resume.responsibility.filter(e=>e.id !== req.params.resid);    
    await student.save()
    res.json(student.resume)
});

exports.addCourses = CatchAsyncError(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec()
    student.resume.courses.push({...req.body,id:uuidV4()});
    await student.save()
    res.json(student.resume)
});

exports.editCourses = CatchAsyncError(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec()
    const courIndex = student.resume.courses.findIndex(cour => cour.id === req.params.courid)
    student.resume.courses[courIndex] = {...student.resume.courses[courIndex],...req.body};
    await student.save()
    res.json(student.resume)
});

exports.deleteCourses = CatchAsyncError(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec()
    student.resume.courses = student.resume.courses.filter(e=>e.id !== req.params.courid);    
    await student.save()
    res.json(student.resume)
});

exports.addProjects = CatchAsyncError(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec()
    student.resume.projects.push({...req.body,id:uuidV4()});
    await student.save()
    res.json(student.resume)
});

exports.editProjects = CatchAsyncError(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec()
    const proIndex = student.resume.projects.findIndex(pro => pro.id === req.params.proid)
    student.resume.projects[proIndex] = {...student.resume.projects[proIndex],...req.body};
    await student.save()
    res.json(student.resume)
});

exports.deleteProjects = CatchAsyncError(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec()
    student.resume.projects = student.resume.projects.filter(e=>e.id !== req.params.proid);    
    await student.save()
    res.json(student.resume)
});

exports.addWorkSamples = CatchAsyncError(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec()
    student.resume.workSamples.push({...req.body,id:uuidV4()});
    await student.save()
    res.json(student.resume)
});

exports.editWorkSamples = CatchAsyncError(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec()
    const workIndex = student.resume.workSamples.findIndex(work => work.id === req.params.workid)
    student.resume.workSamples[workIndex] = {...student.resume.workSamples[workIndex],...req.body};
    await student.save()
    res.json(student.resume)
});

exports.deleteWorkSamples = CatchAsyncError(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec()
    student.resume.workSamples = student.resume.workSamples.filter(e=>e.id !== req.params.workid);    
    await student.save()
    res.json(student.resume)
});



