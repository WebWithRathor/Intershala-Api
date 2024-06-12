const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middlewares/Auth');
const {resume,addEducation,editEducation, deleteEducation, addExperience, editExperience, deleteExperience, addSkills, editSkills, deleteSkills, addResponsibility, editResponsibility, deleteResponsibility, addCourses, editCourses, deleteCourses, addAccomplishment, editAccomplishment, deleteAccomplishment, addProjects, editProjects, deleteProjects, addWorkSamples, editWorkSamples, deleteWorkSamples} = require('../controllers/resumeController.js')

router.get('/', isAuthenticated, resume);

router.post('/add-edu', isAuthenticated, addEducation);

router.post('/edit-edu/:eduid', isAuthenticated, editEducation);

router.post('/delete-edu/:eduid', isAuthenticated, deleteEducation);

router.post('/add-exp', isAuthenticated, addExperience);

router.post('/edit-exp/:expid', isAuthenticated, editExperience);

router.post('/delete-exp/:expid', isAuthenticated, deleteExperience);

router.post('/add-skill', isAuthenticated, addSkills);

router.post('/edit-skill/:skillid', isAuthenticated, editSkills);

router.post('/delete-skill/:skillid', isAuthenticated, deleteSkills);

router.post('/add-res', isAuthenticated, addResponsibility);

router.post('/edit-res/:resid', isAuthenticated, editResponsibility);

router.post('/delete-res/:resid', isAuthenticated, deleteResponsibility);

router.post('/add-cour', isAuthenticated, addCourses);

router.post('/edit-cour/:courid', isAuthenticated, editCourses);

router.post('/delete-cour/:courid', isAuthenticated, deleteCourses);

router.post('/add-pro', isAuthenticated, addProjects);

router.post('/edit-pro/:proid', isAuthenticated, editProjects);

router.post('/delete-pro/:proid', isAuthenticated, deleteProjects);

router.post('/add-work', isAuthenticated, addWorkSamples);

router.post('/edit-work/:workid', isAuthenticated, editWorkSamples);

router.post('/delete-work/:workid', isAuthenticated, deleteWorkSamples);

router.post('/add-accomp', isAuthenticated, addAccomplishment);

router.post('/edit-accomp/:accompid', isAuthenticated, editAccomplishment);

router.post('/delete-accomp/:accompid', isAuthenticated, deleteAccomplishment);


module.exports = router;
