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


    crateTrainer : (specialty , userId , callback) => {

        const sql = 'INSERT INTO formateurs (specialite , utilisateurID) VALUES (?,?)';
        db.query(sql , [specialty, userId] , (err , result) => {

            if(err) throw err;
            callback(result);
        }) 
    },

    findTrainerByEmail: (email , callback) => {

        const sql = `SELECT * FROM utilisateurs JOIN formateurs ON utilisateurs.id_utilisateur = formateurs.utilisateurID WHERE utilisateurs.email = ?`;
        db.query(sql , [email], (err , result) => {

            if(err) throw err ;
            callback(result[0]);
        })
    }



   
}

module.exports = user;