const express = require("express");
const router = express.Router();
const classesController = require('../controllers/classesController');

// router.get("/", (req, res) => {
//   res.render("trainer/dashboard", { title: "home page" });
// });

router.get("/trainer/layout", (req, res) => {
  return res.render("trainer/layout");
});
router.get("/dashboard", (req, res) => {
  return res.render("trainer/dashboard");
});
router.get("/manage-quiz", (req, res) => {
  return res.render("trainer/manageQuiz");
});

router.get("/AllStudents", (req, res) => {
  return res.render("trainer/crudStudents");
});

router.get("/AllRequests", (req, res) => {
  return res.render("trainer/testRequests");
});
router.get("/subjectSubtopic", (req, res) => {
  return res.render("trainer/subjectSubtopic");
});
router.get("/subjectSubtopicPage", (req, res) => {
  return res.render("trainer/subjectSubtopicPage");
});

// add class
router.post("/addClass", classesController.addClass);

module.exports = router;
