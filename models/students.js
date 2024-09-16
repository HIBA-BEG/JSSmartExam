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

  getAllByClass: (classId, callback) => {
    const query = `
      SELECT u.*, e.id_etudiant, e.dateinscription, e.classeID
      FROM utilisateurs u
      INNER JOIN etudiants e ON u.id_utilisateur = e.utilisateurID
      WHERE e.classeID = ?
    `;
    db.query(query, [classId], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  },

  getById: (id, callback) => {
    db.query(
      `SELECT * FROM utilisateurs 
      INNER JOIN etudiants 
      ON utilisateurs.id_utilisateur = etudiants.utilisateurID
      HAVING etudiants.id_etudiant = ?`,
      [id],
      callback
    );
  },

  createStudent: (studentData, callback) => {
    const { nom, prenom, email, dateNaissance, adresse, classeID } =
      studentData;

    const query1 = `INSERT INTO utilisateurs (nom, prenom, email, dateNaissance, adresse) 
                      VALUES (?, ?, ?, ?, ?)`;

    db.query(
      query1,
      [nom, prenom, email, dateNaissance, adresse],
      (err, result) => {
        if (err) return callback(err);

        const utilisateurID = result.insertId;

        const query2 = `INSERT INTO etudiants (utilisateurID, classeID, dateinscription) 
                        VALUES (?,?, CURRENT_TIMESTAMP)`;
        db.query(query2, [utilisateurID, classeID], callback);
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
      [id],
      callback
    );
  },

  updateStudent: (id, data, callback) => {
    db.query(
      `UPDATE utilisateurs 
     INNER JOIN etudiants ON utilisateurs.id_utilisateur = etudiants.utilisateurID
     SET utilisateurs.nom = ?, utilisateurs.prenom = ?, utilisateurs.adresse = ?, utilisateurs.email = ?, utilisateurs.dateNaissance = ?
     WHERE etudiants.id_etudiant = ?`,
      [data.nom, data.prenom, data.adresse, data.email, data.dateNaissance, id],
      callback
    );
  },
};

module.exports = Etudiant;
