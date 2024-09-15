const db = require('../config/database');



const level = {


    createLevel: (title ,min , max , callback)=>{

            const sql = 'INSERT INTO niveau (description , nbrPtsMax , nbrPtsMin) VALUES (?,?,?)';
            db.query(sql , [title , min , max ] , (err , result)=>{

                if(err) throw err;

                callback(result);
            });
    },

    getLevel: (callback) => {
        const sql = 'SELECT * FROM niveau';
        db.query(sql, (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    }
}

module.exports = level;