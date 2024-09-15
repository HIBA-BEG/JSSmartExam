const express = require("express");
const router = express.Router();
const { authmiddleware } = require('../helpers/middleware/AuthMiddleware');
const testsController = require('../controllers/testsController');
const requestsController = require('../controllers/requestsController');



router.use(authmiddleware);


router.get("/student/layoutStudent", (req, res) => {
  return res.render("student/layoutStudent");
});


router.get("/student/dashbord", (req, res) => {

  const { firstName, lastName, email, birthDay, adress, dateInscription } = req.session.user;

  return res.render("student/dashboard", { firstName, lastName, email, birthDay, adress, dateInscription });
});

router.get('/student/quiz', testsController.allTest);


router.get('/student/retakeQuiz', requestsController.allRequests);
router.post('/student/submitRetakeRequest', requestsController.submitRetakeRequest);
router.get('/student/details', testsController.getAllTestPassed);

router.get('/student/quizPage/:id', testsController.getQuizPage);

router.post('/student/submit-quiz', testsController.submitQuiz);

module.exports = router;