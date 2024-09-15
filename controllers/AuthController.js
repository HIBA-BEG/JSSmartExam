const bcrypt = require('bcrypt');
const user = require('../models/users.js');
const {signUpShema , loginShema , studentLoginShema} = require('../helpers/validation/userValid.js');
const session = require('express-session');




exports.signUp = (req , res) =>{


const {error} = signUpShema.validate(req.body);

if(error){

    res.status(400).send(error.details[0].message);
    return false ;
}   

    const {FirstName , LastName ,  adress , birthDay , email , Password , specialty } = req.body;

   

    bcrypt.hash(Password , 10 , (err , hashPassword)=>{

        if(err) throw err;

        user.createUser(FirstName , LastName ,  adress , birthDay , email , hashPassword , (result)=>{
            const userId = result.insertId;

           

            user.crateTrainer(specialty,userId,(result)=>{

                req.session.user = {
                    id: userId,
                    firstName: FirstName,
                    lastName: LastName,
                    email: email,
                    specialty: specialty
                };
        
                res.redirect('/TRAINER/dashboard');

            });
        }); 
    });
};




exports.login = (req , res) => {


    const {error} = loginShema.validate(req.body);

    if(error){
        res.status(401).send(error.details[0].message);
        return false;
    }

    const {email , Password} = req.body;

    user.findTrainerByEmail(email , (userData) => {

        if(!userData){
            return res.status(404).send('no match data');
        }

        bcrypt.compare(Password , userData.motdepasse , (err , isMatch)=>{

            if(err) throw err;
            if(isMatch){


                user.findTrainerClass(userData.id_formateur , (Tclass)=>{


                    req.session.user = {
                        id: userData.id_utilisateur,
                        firstName: userData.nom,
                        lastName: userData.prenom,
                        email: userData.email,
                        trinerId: userData.id_formateur,
                        specialty: userData.specialite,
                        className: Tclass.nomclasse,
                        classId: Tclass.id_classe
                        
                    }
                    res.redirect('/TRAINER/dashboard')
                    // console.log(req.session.user)
                })
                           
            }else{
                res.status(400).send('no match data')
            }
        });
    })
};



exports.logout = (req , res ) => {

    if(req.session){

        req.session.destroy(err => {

            if(err){
                req.status(401).send('it could not get logout');
            }else{
                res.redirect('/');
            }
        });
    }else{
        res.redirect('/');
    };

};


exports.studentLogin = (req , res) => {

    const {error} = studentLoginShema.validate(req.body);

    if(error){

        res.status(401).send(error.details[0].message);
       
    };  

    const {email} = req.body;

    user.findStudentByEmail(email , (user) => {

        if(!user){

           return res.status(400).send('no match data');
        }

        req.session.user = {

            id: user.utilisateurID,
            firstName: user.nom,
            lastName: user.prenom,
            email: user.email,
            studentId: user.id_etudiant,
            adress: user.adresse,
            birthDay: user.dateNaissance,
            
        }

        // console.log(req.session.user);
        res.redirect('/STUDENT/student/dashbord')
    })

}