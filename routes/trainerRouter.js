const express = require("express");
const router = express.Router();
const { authmiddleware } = require('../helpers/middleware/AuthMiddleware');
const classesController = require('../controllers/classesController');
const subjectController = require('../controllers/subjectController');

// router.get("/", (req, res) => {
//   res.render("trainer/dashboard", { title: "home page" });
// });

router.use(authmiddleware);

router.get("/trainer/layout", (req, res) => {
  return res.render("trainer/layout");
});

router.get("/dashboard", (req, res) => {

  const { firstName, lastName, email, specialty } = req.session.user;

  return res.render("trainer/dashboard", { firstName, lastName, email, specialty });

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
// red all subject
router.get("/subjectSubtopic", async (req, res) => {
  const subjects = await subjectController.redAllSubjects();
  return res.render("trainer/subjectSubtopic", { subjects: subjects });
});

// delete subject
router.post("/delete-subject/:id", subjectController.deleteSubject);

router.get("/subjectSubtopicPage", (req, res) => {
  return res.render("trainer/subjectSubtopicPage");
});

// add class
router.post("/addClass", classesController.addClass);
// add subject and subTopic
router.post("/add-subject", subjectController.addSubject);


module.exports = router;
