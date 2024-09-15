const db = require('../config/database');



const Quastion = {


    crateQuastion: (points ,numberOfAnswers ,Question, subject , level, testID , callback)=>{

            const sql = 'INSERT INTO questions (nbrPoints , nbrReponses , texteQuestion , sujetID , niveauID ,id_test) VALUES (?,?,?,?,?,?)';
            db.query(sql , [points , numberOfAnswers , Question ,subject , level, testID ] , (err , result)=>{

                if(err) throw err;

                callback(result);
            });
    },


    InterAnswers: (texteReponse ,solution, questionID , callback)=>{

        const sql = 'INSERT INTO reponses (texteReponse , solution , questionID  ) VALUES (?,?,?)';
        db.query(sql , [texteReponse , solution , questionID ] , (err , result)=>{

            if(err) throw err;

            callback(result);
        });
},

   
    
}

module.exports = Quastion;