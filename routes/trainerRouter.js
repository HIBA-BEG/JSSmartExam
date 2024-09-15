const express = require("express");
const router = express.Router();
const { authmiddleware } = require('../helpers/middleware/AuthMiddleware');
const classesController = require('../controllers/classesController');
const studentController = require('../controllers/studentController');
const levelController = require('../controllers/levelController');
const level = require('../models/level');
const subjects = require('../controllers/subjectController');
const Quastions = require('../controllers/QuastionsController');

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

router.get('/addOneStudent', (req,res)=>{

  const {className} = req.session.user;

console.log(className);

  res.render("trainer/addStudent" ,{className} );

});
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



router.get('/addQuestions', async (req, res) => {
  try {

    const subjectsList = await subjects.redAllSubjects();

      const levelsList = await new Promise((resolve, reject) => {
          level.getLevel((err, levels) => {
              if (err) {
                  return reject(err);
              }
              resolve(levels);
          });
      });

      res.render('trainer/addTestQuestions', { levels: levelsList, subjects: subjectsList });
  } catch (error) {
      console.error('Error fetching levels or subjects:', error);
      res.status(500).send('Internal Server Error');
  }
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

router.post('/AddLevel', levelController.createLevel);

router.post('/AddQuestions' , Quastions.createQuestions);


// add subject and subTopic
router.post("/add-subject", subjectController.addSubject);


module.exports = router;
