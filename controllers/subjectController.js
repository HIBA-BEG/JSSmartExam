const subjectModel = require('../models/subject');

exports.addSubject = async (req, res) => {

    const data = req.body;


    // data.formateurID = formateurID;
    if (!data) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    data.formateurID = req.session.user.trinerId;
    console.log(data);

    try {
        const result = await subjectModel.addSubject(data)
        // res.status(201).json({ message: 'Class added successfully', result });
        req.flash('success', 'subject added successfully');
        res.redirect('/TRAINER/subjectSubtopic');
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: `An error occurred: ${error.message}` });
    }
};


exports.redAllSubjects = async (req, res) => {
    try {
        const subjects = await subjectModel.redAllSubject();
        return subjects[0];
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: `An error occurred: ${error.message}` });
    }
};

exports.redSubjectById = async (id) => {
    try {


        const subjects = await subjectModel.redSubjectById(id);



        return subjects
    } catch (error) {
        console.error("Error:", error);

    }
};

exports.deleteSubject = async (req, res) => {
    const id = req.params.id;
    try {
        await subjectModel.deleteSubject(id);
        req.flash('success', 'Subject deleted successfully');
        res.redirect('/TRAINER/subjectSubtopic');
    } catch (error) {
        console.error('Error deleting subject:', error);
        res.status(500).send('Error deleting subject');
    }
};