const db = require("../config/database");


const Tests = {

    getAll: (id, callback) => {
        db.query(
            `SELECT tests.*, classes.nomclasse FROM tests JOIN etudiant_test 
            ON tests.id_test = etudiant_test.idTest JOIN etudiants 
            ON etudiant_test.idEtudiant = etudiants.id_etudiant JOIN classes 
            ON etudiants.classeID = classes.id_classe WHERE etudiant_test.idEtudiant = ?;`,
            [id],
            callback
        );
    },
    getExamWithQuestions :(testId) => {
        return db.promise().query(
          `SELECT tests.id_test AS id_test, tests.title AS test_titre,questions.nbrPoints, questions.texteQuestion, reponses.texteReponse, reponses.solution
            FROM tests
            JOIN questions ON questions.id_test = tests.id_test
            JOIN reponses ON reponses.questionID = questions.id_question
            WHERE tests.id_test = ?;`
            , [testId]
        );
      },
      getQuestionsAndScores: (testId) => {
        return db.promise().query(
            `SELECT questions.id_question AS questionID, reponses.texteReponse AS correctAnswer, questions.nbrPoints AS points
             FROM questions
             JOIN reponses ON reponses.questionID = questions.id_question
             WHERE questions.id_test = ? AND reponses.solution = 1`,
            [testId]
        );
    },

    // Fonction pour mettre à jour le score de l'étudiant
    updateStudentScore: (studentId, testId, score) => {
        // D'abord, on récupère le numero_essai actuel
        return db.promise().query(
            `SELECT tests.numero_essai 
             FROM tests 
             JOIN etudiant_test ON tests.id_test = etudiant_test.idTest 
             WHERE etudiant_test.idEtudiant = ? AND tests.id_test = ?`,
            [studentId, testId]
        )
        .then(([rows]) => {
            // Vérifier si des données ont été trouvées
            if (rows.length > 0) {
                let numero_essai = rows[0].numero_essai || 0;
                numero_essai++; // Incrémenter le numero_essai
    
                // Ensuite, on met à jour le score et le numero_essai dans la base de données
                return db.promise().query(
                    `UPDATE tests
                     JOIN etudiant_test ON tests.id_test = etudiant_test.idTest
                     SET tests.scoreEtudiant = ?, tests.numero_essai = ?
                     WHERE etudiant_test.idEtudiant = ? AND tests.id_test = ?`,
                    [score, numero_essai, studentId, testId]
                );
            } else {
                throw new Error("Aucune donnée trouvée pour cet étudiant et test.");
            }
        });
    },
    getAllTestPassed: (id, callback) => {
        db.query(
            `SELECT tests.*, classes.nomclasse 
             FROM tests 
             JOIN etudiant_test ON tests.id_test = etudiant_test.idTest 
             JOIN etudiants ON etudiant_test.idEtudiant = etudiants.id_etudiant 
             JOIN classes ON etudiants.classeID = classes.id_classe 
             WHERE etudiant_test.idEtudiant = ? 
             AND tests.numero_essai > 0;`, // Ajouter la condition pour vérifier que le numero_essai est supérieur à zéro
            [id],
            callback
        );
    }
    


};

module.exports = Tests;