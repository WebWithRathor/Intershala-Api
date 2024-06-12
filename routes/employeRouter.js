const express = require('express');
const router = express.Router();
const { homepage, employesignup, employesignin, employesignout, employeUpdate, Currentemploye, ResetPassword, employeForgetPassword, ChangePassword, employeAvatar } = require('../controllers/employeController');
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

router.post('/avatar', isAuthenticated, employeAvatar);

module.exports = router;
