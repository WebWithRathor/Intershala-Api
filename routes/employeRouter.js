const express = require('express');
const router = express.Router();
const { homepage, employesignup, employesignin, employesignout, employeUpdate, Currentemploye, ResetPassword, employeForgetPassword, ChangePassword, employeAvatar, internshipCreate, readInternship, readSingleInternship, jobCreate, readjob, readSinglejob } = require('../controllers/employeController');
const { isAuthenticated } = require('../middlewares/Auth');

router.get('/', isAuthenticated, homepage);

router.post('/current', isAuthenticated,Currentemploye);

router.post('/signup', employesignup);

router.post('/signin', employesignin);

router.post('/signout', isAuthenticated, employesignout);

router.post('/ForgetPassword', employeForgetPassword);

router.post('/resetpassword/:employe', ResetPassword);

router.post('/changepassword', isAuthenticated, ChangePassword);

router.post('/update', isAuthenticated, employeUpdate);

router.post('/OrganizationLogo', isAuthenticated, employeAvatar);

// ----------------------internship --------------------

router.post('/internship/create',isAuthenticated , internshipCreate);

router.post('/internship/read',isAuthenticated , readInternship);


// ----------------------job --------------------

router.post('/job/create',isAuthenticated , jobCreate);

router.post('/job/read',isAuthenticated , readjob);



module.exports = router;
