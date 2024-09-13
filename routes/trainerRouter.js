const express = require("express");
const router = express.Router();
const { authmiddleware } = require('../helpers/middleware/AuthMiddleware');
const classesController = require('../controllers/classesController');
const studentController = require('../controllers/studentController');
const levelController = require('../controllers/levelController');

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

// router.get("/AllStudents", (req, res) => {
//   return res.render("trainer/crudStudents");
// });

router.get('/AllStudents', studentController.allStudents);

router.get('/addOneStudent', studentController.createForm);
router.post('/addOneStudent', studentController.createStudent);

router.get('/deleteStudent/:id', studentController.deleteEtudiant);

router.get('/updateStudent/:id', studentController.updateForm);
router.post('/updateStudent/:id', studentController.updateStudent);

// router.get("/addOneStudent", (req, res) => {
//   return res.render("trainer/addStudent");
// });

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
router.get("/editeSubjectSubtopicPage/:id", async (req, res) => {
  const id = req.params.id;

  const subjects = await subjectController.redSubjectById(id);

  console.log(subjects)

  return res.render("trainer/editeSubjectSubtopicPage", { subjects: subjects });
});


router.post("/addClass", classesController.addClass);

router.post('/AddLevel' , levelController.createLevel);

// add subject and subTopic
router.post("/add-subject", subjectController.addSubject);


module.exports = router;
