const Quastions = require('../models/questions');





exports.createQuestions = (req, res) => {
    const { point, numberOfAnswers, Question, subject, level, answers, correctAnswers } = req.body;
  
    const correctAnswerIndices = correctAnswers ? correctAnswers.map(Number) : [];
  
    Quastions.crateQuastion(point, numberOfAnswers, Question, subject, level, 1, (result) => {
      const questionId = result.insertId;
  
      const answerPromises = answers.map((answer, index) => {
        const isCorrect = correctAnswerIndices.includes(index) ? 1 : 0; 
        return new Promise((resolve, reject) => {
          Quastions.InterAnswers(answer, isCorrect, questionId, (err, result) => {
            if (err) return reject(err);
            resolve(result);
          });
        });
      });
  
       Promise.all(answerPromises)
        .then(() => {
          res.redirect('/TRAINER/dashboard');
        })
        .catch((err) => {
          console.error(err);
          res.status(500).send('Error inserting answers.');
        });
    });
  };
  
  