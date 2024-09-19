const express = require('express');
const router = express.Router();
const { homepage, studentsignup, studentsignin, studentsignout, StudentUpdate, CurrentStudent, ResetPassword, studentForgetPassword, ChangePassword, StudentAvatar, studentApplyJob, studentApplyInternship, readAllJob, readSingleJob, readAllInternship, readSingleInternship } = require('../controllers/indexController');
const { isAuthenticated } = require('../middlewares/Auth');

router.get('/', isAuthenticated, homepage);

router.post('/student', isAuthenticated, CurrentStudent);

router.post('/student/signup', studentsignup);

router.post('/student/signin', studentsignin);

router.post('/student/signout', isAuthenticated, studentsignout);

router.post('/ForgetPassword', studentForgetPassword);

router.post('/student/resetpassword/:student', ResetPassword);

router.post('/student/changepassword', isAuthenticated, ChangePassword);

router.post('/student/update', isAuthenticated, StudentUpdate);

router.post('/student/avatar', isAuthenticated, StudentAvatar);


router.post('/internship/read',isAuthenticated , readAllInternship);

router.post('/internship/read/:id',isAuthenticated , readSingleInternship);

router.post('/job/read',isAuthenticated , readAllJob);

router.post('/job/read/:id',isAuthenticated , readSingleJob);


router.post('/student/applyJob/:jobid', isAuthenticated, studentApplyJob);

router.post('/student/applyInternship/:internshipid', isAuthenticated, studentApplyInternship);

module.exports = router;
