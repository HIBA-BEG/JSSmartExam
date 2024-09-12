const express = require("express");
const router = express.Router();
const studentController = require('../controllers/studentController');

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

// router.get("/AllStudents", (req, res) => {
//   return res.render("trainer/crudStudents");
// });

router.get('/AllStudents', studentController.allStudents);

router.get('/addOneStudent', studentController.createForm);
router.post('/addOneStudent', studentController.createStudent);

router.get('/deleteStudent/:id', studentController.deleteEtudiant);

// router.get("/addOneStudent", (req, res) => {
//   return res.render("trainer/addStudent");
// });

router.get("/AllRequests", (req, res) => {
  return res.render("trainer/testRequests");
});




module.exports = router;
