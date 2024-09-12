const Student = require("../models/students.js");

exports.allStudents = (req, res) => {
  Student.getAll((err, students) => {
    if (err) throw err;
    res.render("trainer/crudStudents", { students });
  });
};



exports.deleteEtudiant = (req, res) => {
  const id = req.params.id;
  Student.deleteEtudiant(id, (err) => {
    if (err) {
      console.error("Error deleting student:", err);
      return res.status(500).send("Error deleting student");
    }
    res.redirect("/TRAINER/AllStudents");
  });
};


exports.createForm = (req, res) => {
  res.render("trainer/addStudent");
};


exports.createStudent = (req, res) => {
  const newStudent = {
    prenom: req.body.prenom,
    dateNaissance: req.body.dateNaissance,
    nom: req.body.nom,
    email: req.body.email,
    adresse: req.body.adresse,
  };
  Student.createStudent(newStudent, (err) => {
    if (err) throw err;
    res.redirect("/TRAINER/AllStudents");
  });
};
