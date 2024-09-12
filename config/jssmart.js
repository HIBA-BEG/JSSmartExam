


exports.Tables = [
    `CREATE TABLE IF NOT EXISTS classes (
      id_classe INT AUTO_INCREMENT PRIMARY KEY,
      nomclasse VARCHAR(255) DEFAULT NULL,
      formateurID INT DEFAULT NULL,
      FOREIGN KEY (formateurID) REFERENCES formateurs(id_formateur)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`,
  
    `CREATE TABLE IF NOT EXISTS demande (
      id_demande INT PRIMARY KEY,
      description VARCHAR(255) DEFAULT NULL,
      confirmation TINYINT(1) DEFAULT NULL,
      testID INT DEFAULT NULL,
      etudiantID INT DEFAULT NULL,
      FOREIGN KEY (etudiantID) REFERENCES etudiants(id_etudiant),
      FOREIGN KEY (testID) REFERENCES tests(id_test)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`,
  
    `CREATE TABLE IF NOT EXISTS etudiants (
      id_etudiant INT AUTO_INCREMENT PRIMARY KEY,
      dateinscription DATE DEFAULT NULL,
      utilisateurID INT DEFAULT NULL,
      classeID INT DEFAULT NULL,
      FOREIGN KEY (utilisateurID) REFERENCES utilisateurs(id_utilisateur),
      FOREIGN KEY (classeID) REFERENCES classes(id_classe)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`,
  
    `CREATE TABLE IF NOT EXISTS formateurs (
      id_formateur INT AUTO_INCREMENT PRIMARY KEY,
      specialite VARCHAR(255) DEFAULT NULL,
      utilisateurID INT DEFAULT NULL,
      FOREIGN KEY (utilisateurID) REFERENCES utilisateurs(id_utilisateur)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`,
  
    `CREATE TABLE IF NOT EXISTS medias (
      id_media INT AUTO_INCREMENT PRIMARY KEY,
      type ENUM('image','video','figure','son') DEFAULT NULL,
      url VARCHAR(255) DEFAULT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`,
  
    `CREATE TABLE IF NOT EXISTS niveau (
      id_niveau INT AUTO_INCREMENT PRIMARY KEY,
      description VARCHAR(255) DEFAULT NULL,
      nbrPtsMax INT DEFAULT NULL,
      nbrPtsMin INT DEFAULT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`,
  
    `CREATE TABLE IF NOT EXISTS questions (
      id_question INT AUTO_INCREMENT PRIMARY KEY,
      nbrPoints INT DEFAULT NULL,
      nbrReponses INT DEFAULT NULL,
      texteQuestion TEXT,
      sujetID INT DEFAULT NULL,
      niveauID INT DEFAULT NULL,
      mediaID INT DEFAULT NULL,
      FOREIGN KEY (sujetID) REFERENCES sujets(id_sujet),
      FOREIGN KEY (niveauID) REFERENCES niveau(id_niveau),
      FOREIGN KEY (mediaID) REFERENCES medias(id_media)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`,
  
    `CREATE TABLE IF NOT EXISTS reponses (
      id_reponse INT AUTO_INCREMENT PRIMARY KEY,
      texteReponse TEXT,
      solution TINYINT(1) DEFAULT NULL,
      questionID INT DEFAULT NULL,
      FOREIGN KEY (questionID) REFERENCES questions(id_question)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`,
  
    `CREATE TABLE IF NOT EXISTS subsujets (
      id_subsujet INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) DEFAULT NULL,
      sujetID INT DEFAULT NULL,
      FOREIGN KEY (sujetID) REFERENCES sujets(id_sujet)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`,
  
    `CREATE TABLE IF NOT EXISTS sujets (
      id_sujet INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) DEFAULT NULL,
      formateurID INT DEFAULT NULL,
      FOREIGN KEY (formateurID) REFERENCES formateurs(id_formateur)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`,
  
    `CREATE TABLE IF NOT EXISTS tests (
      id_test INT PRIMARY KEY,
      date_debut DATETIME DEFAULT NULL,
      numero_essai INT DEFAULT NULL,
      successScore INT DEFAULT NULL,
      scoreEtudiant INT DEFAULT NULL,
      sujetID INT DEFAULT NULL,
      formateurID INT DEFAULT NULL,
      FOREIGN KEY (sujetID) REFERENCES sujets(id_sujet),
      FOREIGN KEY (formateurID) REFERENCES formateurs(id_formateur)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`,
  
    `CREATE TABLE IF NOT EXISTS utilisateurs (
      id_utilisateur INT AUTO_INCREMENT PRIMARY KEY,
      nom VARCHAR(255) DEFAULT NULL,
      prenom VARCHAR(255) DEFAULT NULL,
      adresse VARCHAR(255) DEFAULT NULL,
      dateNaissance DATE DEFAULT NULL,
      email VARCHAR(255) DEFAULT NULL,
      motdepasse VARCHAR(255) DEFAULT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`
  ];