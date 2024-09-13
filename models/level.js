const db = require('../config/database');



const level = {


    createLevel: (title ,min , max , callback)=>{

            const sql = 'INSERT INTO niveau (description , nbrPtsMax , nbrPtsMin) VALUES (?,?,?)';
            db.query(sql , [title , min , max ] , (err , result)=>{

                if(err) throw err;

                callback(result);
            });
    }


}

module.exports = level;