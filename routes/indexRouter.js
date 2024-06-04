const express = require('express');
const router = express.Router();
const { homepage, studentsignup,studentsignin,studentsignout, CurrentStudent, ResetPassword, studentForgetPassword, ChangePassword } = require('../controllers/indexController');
const { isAuthenticated } = require('../middlewares/Auth');

router.get('/',isAuthenticated, homepage);

router.post('/student',isAuthenticated, CurrentStudent);

router.post('/student/signup',studentsignup);

router.post('/student/signin',studentsignin);

router.post('/student/signout',isAuthenticated,studentsignout);

router.post('/ForgetPassword',studentForgetPassword);

router.post('/student/resetpassword/:student',ResetPassword);

router.post('/student/changepassword',isAuthenticated,ChangePassword);

module.exports = router;
