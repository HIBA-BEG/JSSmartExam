const Requests = require("../models/requests.js");

exports.allRequests = (req, res) => {
    const id = req.session.user.studentId;

    Requests.getAll(id, (err, requests) => {
        if (err) throw err;
console.log(requests)
        res.render("student/retakeQuiz", { requests });
    });
};

exports.submitRetakeRequest = (req, res) => {
    const { testID, description } = req.body; 
    const etudiantID = req.session.user.studentId; 

  console.log({ testID, description })
    if (!testID || !description) {
        return res.status(400).send('Tous les champs sont obligatoires.');
    }

    
    Requests.submitRetakeRequest(description, testID, etudiantID)
        .then(() => {
            req.flash('success', 'Votre demande a été soumise avec succès.');
            res.redirect('/STUDENT/student/dashbord');
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Erreur lors de la soumission de la demande.');
        });
};