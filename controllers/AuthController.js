const bcrypt = require('bcrypt');
const user = require('../models/users.js');






exports.signUp = (req , res) =>{

    const {FirstName , LastName ,  adress , birthDay , email , Password} = req.body;

    if(!FirstName || !LastName || !adress || !birthDay || !email || !Password){

        return res.status(400).send('All fields are required');
    }

    bcrypt.hash(Password , 10 , (err , hashPassword)=>{

        if(err) throw err;

        user.createUser(FirstName , LastName ,  adress , birthDay , email , hashPassword , (result)=>{

        });
        res.redirect('/TRAINER/dashboard');
    });
};

exports.login = (req , res) => {

    const {email , Password} = req.body;

    user.findByEmail(email , (user) => {

        if(!user){
            return res.send('user not found');
        }

        bcrypt.compare(Password , user.motdepasse , (err , isMatch)=>{

            if(err) throw err;
            if(isMatch){
                res.redirect('/TRAINER/dashboard')
            }else{
                res.send('no match data')
            }
        });
    });
}