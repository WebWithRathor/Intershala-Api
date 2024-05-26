const express = require('express');
const router = express.Router();
const { homepage, studentsignup,studentsignin,studentsignout } = require('../controllers/indexController');

router.get('/', homepage);

router.post('/student/signup',studentsignup);

router.post('/student/signin',studentsignin);

router.post('/student/signout',studentsignout);

module.exports = router;
