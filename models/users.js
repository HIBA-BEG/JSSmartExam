const db = require('../config/database');



const user = {

    findByEmail: (email , callback)=>{

        const sql = 'SELECT * FROM utilisateurs WHERE email = ?';
        db.query(sql , [email] , (err , result) =>{

            if(err) throw err;
            callback(result[0]);
        })
    },


    createUser: (FirstName , LastName ,  adress , birthDay , email , hashPassword , callback ) =>{

        const sql = 'INSERT  INTO utilisateurs (nom , prenom , adresse ,dateNaissance , email , motdepasse ) VALUES (?,?,?,?,?,?)';
        db.query(sql , [FirstName , LastName ,  adress , birthDay , email , hashPassword] , (err , result)=>{

            if(err) throw err;
            callback(result);
        })
    },

   
}

module.exports = user;