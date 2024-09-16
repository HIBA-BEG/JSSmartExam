const db = require("../config/database");

const Quiz = {
  createQuiz: (quizData, callback) => {
    const query = 
    `INSERT INTO tests (title, successScore, sujetID, formateurID) 
    VALUES (?, ?, ?, ?)`;
    db.query(
      query,
      [quizData.title, quizData.successScore, quizData.sujetID, quizData.formateurID],
      callback
    );
  },

  getAll: (callback) => {
    const query = 
    `SELECT * FROM tests`;
    db.query(query, callback);
  },

  getById: (id, callback) => {
    const query = 
    `SELECT * FROM tests 
    WHERE id = ?`;
    db.query(query, [id], callback);
  },

  deleteQuiz: (id, callback) => {
    const query = 
    `DELETE FROM tests WHERE id_test = ?`;
    db.query(query, [id], callback);
  },
};

module.exports = Quiz;
