const db = require("../config/database");


const Requests = {

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
   
    submitRetakeRequest: (description, testID, etudiantID) => {
        return db.promise().query(
            `INSERT INTO demande (description, confirmation, testID, etudiantID) VALUES (?, 0, ?, ?)`,
            [description, testID, etudiantID]
        );
    }



};
module.exports = Requests;