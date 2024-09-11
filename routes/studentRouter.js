const express = require("express");
const router = express.Router();


router.get("/student/layoutStudent", (req, res) => {
    return res.render("student/layoutStudent");
  });
router.get("/student/dashbord", (req, res) => {
    return res.render("student/dashboard");
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