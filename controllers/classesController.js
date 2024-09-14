const classModel = require('../models/classes');

exports.addClass = async (req, res) => {

    const Tid = req.session.user.trinerId;

    const {nomclasse} = req.body;  

    if (!nomclasse) {
        return res.status(400).json({ error: 'Missing required fields: nomClass or formateurID' });
    }

    
    try {

        const result = await classModel.addClass(nomclasse , Tid);
        // res.status(201).json({ message: 'Class added successfully', result });
        req.flash('success', 'Class added successfully');
        res.redirect('/TRAINER/AllStudents');
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: `An error occurred: ${error.message}` });
    }
};
