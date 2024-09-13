const db = require("../config/database");

const Etudiant = {
  getAll: (callback) => {
    db.query(
      `SELECT * FROM utilisateurs 
      INNER JOIN etudiants 
      ON utilisateurs.id_utilisateur = etudiants.utilisateurID`,
      callback
    );
  },

  getById: (id, callback) => {
    db.query(
      `SELECT * FROM utilisateurs 
      INNER JOIN etudiants 
      ON utilisateurs.id_utilisateur = etudiants.utilisateurID
      WHERE id = ?`,
      [id], callback
    );
  },

  createStudent: (studentData, callback) => {

    const { nom, prenom, email, dateNaissance, adresse } = studentData;

    const query1 = `INSERT INTO utilisateurs (nom, prenom, email, dateNaissance, adresse) 
                      VALUES (?, ?, ?, ?, ?)`;

    db.query( query1, [nom, prenom, email, dateNaissance, adresse], (err, result) => {
        if (err) return callback(err);

        const utilisateurID = result.insertId;

        const query2 = `INSERT INTO etudiants (utilisateurID, dateinscription) 
                        VALUES (?, CURRENT_TIMESTAMP)`;
        db.query(query2, [utilisateurID], callback);
      }
    );
  },
  
  deleteEtudiant: (id, callback) => {
    db.query( 
      `DELETE utilisateurs, etudiants 
      FROM utilisateurs 
      INNER JOIN etudiants 
      ON utilisateurs.id_utilisateur = etudiants.utilisateurID 
      WHERE etudiants.id_etudiant = ? `,
      [id], callback
    );
  },
};

module.exports = Etudiant;
