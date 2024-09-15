const Tests = require("../models/tests.js");

exports.allTest = (req, res) => {
    const id = req.session.user.studentId;

    Tests.getAll(id, (err, tests) => {
        if (err) throw err;

        res.render("student/quizAssigned", { tests });
    });
};

exports.getQuizPage = (req, res) => {
    const testId = req.params.id; // Récupérer l'ID du test depuis l'URL

    // Appeler le modèle pour récupérer l'examen et ses questions
    Tests.getExamWithQuestions(testId)
        .then(([rows]) => {
            if (rows.length === 0) {
                return res.status(404).send('Examen non trouvé');
            }
            console.log(rows)
            // Rendre la vue avec l'examen et les questions
            res.render('student/quizPage', { exam: rows });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Erreur serveur');
        });
};

// controllers/quizController.js


exports.submitQuiz = (req, res) => {
    const { testId } = req.body;
    const answers = req.body.q || []; // Les réponses sont stockées dans req.body.q

    console.log('Réponses soumises:', answers);
    console.log('ID du test:', testId);

    // Récupérer les bonnes réponses depuis la base de données
    Tests.getQuestionsAndScores(testId)
        .then(([rows]) => {
            let score = 0;
            

            console.log('Questions et réponses correctes:', rows);

            rows.forEach((row, index) => {
                // Vérifier si la réponse soumise correspond à la réponse correcte
                const userAnswer = answers[index]; // Accéder à la réponse soumise par l'utilisateur
                console.log(`Comparaison pour question ${row.questionID}:`);
                console.log('Réponse soumise:', userAnswer);
                console.log('Réponse correcte:', row.correctAnswer);

                if (userAnswer === row.correctAnswer) {
                    score += row.points; // Ajouter les points si la réponse est correcte
                }
            });

            // Mettre à jour le score et numéro d'essai de l'étudiant dans la base de données
            Tests.updateStudentScore(req.session.user.studentId, testId, score)
                .then(() => {
                    console.log('Score:', score);
                    // res.json({ score: score }); // Envoyer le score au client
                    req.flash('success', 'Test pased successfully');
                    res.redirect("/STUDENT/student/details");
                })
                .catch(err => {
                    console.error(err);
                    res.status(500).send('Erreur lors de la mise à jour du score');
                });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Erreur lors de la récupération des questions');
        });
};

exports.getAllTestPassed = (req, res) => {
    const id = req.session.user.studentId;

    Tests.getAllTestPassed(id, (err, details) => {
        if (err) throw err;
console.log(details)
        res.render("student/details", { details });
    });
};






