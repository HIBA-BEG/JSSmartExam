const express = require("express");
const router = express.Router();
const {authmiddleware} = require('../helpers/middleware/AuthMiddleware');



router.use(authmiddleware);


router.get("/student/layoutStudent", (req, res) => {
    return res.render("student/layoutStudent");
  });
router.get("/student/dashbord", (req, res) => {


  const {firstName , lastName , email ,birthDay, adress } = req.session.user ;

    return res.render("student/dashboard" , {firstName , lastName ,email ,birthDay , adress});
  });
router.get("/student/quiz", (req, res) => {
    return res.render("student/quizAssigned");
  });
router.get("/student/retakeQuiz", (req, res) => {
    return res.render("student/retakeQuiz");
  });
router.get("/student/details", (req, res) => {
    return res.render("student/details");
  });
router.get("/student/quizPage", (req, res) => {
    return res.render("student/quizPage");
  });

module.exports = router;