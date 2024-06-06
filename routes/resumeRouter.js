const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middlewares/Auth');
const {resume,addEducation,editEducation, deleteEducation} = require('../controllers/resumeController.js')

router.get('/', isAuthenticated, resume);

router.post('/add-edu', isAuthenticated, addEducation);

router.post('/edit-edu/:eduid', isAuthenticated, editEducation);

router.post('/delete-edu/:eduid', isAuthenticated, deleteEducation);

module.exports = router;
