const express = require('express');
const router = express.Router();
const { homepage, studentsignup,studentsignin,studentsignout, CurrentStudent } = require('../controllers/indexController');
const { isAuthenticated } = require('../middlewares/Auth');

router.get('/',isAuthenticated, homepage);

router.post('/student',isAuthenticated, CurrentStudent);

router.post('/student/signup',studentsignup);

router.post('/student/signin',studentsignin);

router.post('/student/signout',isAuthenticated,studentsignout);

module.exports = router;
