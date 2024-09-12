const bcrypt = require('bcrypt');
const user = require('../models/users.js');
const {signUpShema} = require('../helpers/validation/userValid.js');




exports.signUp = (req , res) =>{


const {error} = signUpShema.validate(req.body);

if(error){

    res.status(400).send(error.details[0].message);
}   

    const {FirstName , LastName ,  adress , birthDay , email , Password , specialty } = req.body;

    bcrypt.hash(Password , 10 , (err , hashPassword)=>{

        if(err) throw err;

        user.createUser(FirstName , LastName ,  adress , birthDay , email , hashPassword , (result)=>{
            const userId = result.insertId;


            user.crateTrainer(specialty,userId,(result)=>{

                res.redirect('/TRAINER/dashboard');

            });
        }); 
    });
};




exports.login = (req , res) => {

    const {email , Password} = req.body;

    user.findByEmail(email , (user) => {

        if(!user){
            return res.status(404).send('no match data');
        }

        bcrypt.compare(Password , user.motdepasse , (err , isMatch)=>{

            if(err) throw err;
            if(isMatch){
                res.redirect('/TRAINER/dashboard')
            }else{
                res.status(400).send('no match data')
            }
        });
    });
}