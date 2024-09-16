const Quiz = require("../models/quiz.js");
const Subject = require("../models/subject.js");

exports.createQuizForm = (req, res) => {
  Subject.AllSubject((err, subjects) => {
    console.log(Subject);
    if (err) {
      console.error("Error fetching subjects:", err);
      return res.status(500).send("Error fetching subjects");
    }
    res.render("trainer/addQuiz", { subjects });
  });
};

exports.createQuiz = (req, res) => {
  const { title, successScore, sujetID, subTopicID } = req.body;
  const formateurID = req.session.user.trinerId;

  const newQuiz = {
    title,
    successScore,
    sujetID,
    subTopicID,
    formateurID,
  };

  Quiz.createQuiz(newQuiz, (err, testId) => {
    if (err) {
      console.error("Error creating quiz:", err);
      return res.status(500).send("Error creating quiz");
    }
    res.redirect(`/TRAINER/manage-quiz`);
    
  });
};

exports.allQuizzes = (req, res) => {
  Quiz.getAll((err, quizzes) => {
    if (err) throw err;
    res.render("trainer/manageQuiz", { quizzes });
  });
};

exports.deleteQuiz = (req, res) => {
  const id = req.params.id;
  Quiz.deleteQuiz(id, (err) => {
    if (err) throw err;
    res.redirect("/TRAINER/manage-quiz");
  });
};
