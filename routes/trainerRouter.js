const express = require("express");
const router = express.Router();
const {authmiddleware} = require('../helpers/middleware/AuthMiddleware');

// router.get("/", (req, res) => {
//   res.render("trainer/dashboard", { title: "home page" });
// });

router.use(authmiddleware);

router.get("/trainer/layout",  (req, res) => {
  return res.render("trainer/layout");
}); 

router.get("/dashboard",  (req, res) => {

  const {firstName, lastName, email, specialty} = req.session.user;

  return res.render("trainer/dashboard" , {firstName, lastName, email, specialty});

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

module.exports = router;
