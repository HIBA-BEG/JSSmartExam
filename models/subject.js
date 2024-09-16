const db = require('../config/database');

module.exports = {
    addSubject: async (data) => {
        try {
            
            const [result] = await db
                .promise()
                .query(
                    'INSERT INTO sujets (title,formateurID) VALUES (?,?);',
                    [data.title, data.formateurID]
                );

            const subjectId = result.insertId;
            const sousSujetsTitle = data.subSujets;
            for (let i = 0; i < sousSujetsTitle.length; i++) {
                await db
                    .promise()
                    .query(
                        'INSERT INTO subSujets (title,sujetID) VALUES (?,?);',
                        [sousSujetsTitle[i], subjectId]
                    );
            }

            return result;
        } catch (err) {
            console.error('Error inserting sujet:', err);
        }
    },

    redAllSubject: async () => {
        try {
            const result = await db
                .promise()
                .query(
                    'SELECT * FROM sujets'
                )
            return result;

        } catch (err) {
            console.error('Error get all sujet:', err);
        }
    },

    AllSubject: (callback) => {
        db.query('SELECT * FROM sujets', (err, rows) => {
          if (err) {
            console.error('Error getting all subjects:', err);
            return callback(err, null);  // Send the error back to the callback
          }
          callback(null, rows);  // Success: send rows to the callback
        });
      },


    redSubjectById: async (id) => {
        try {
            const result = await db
                .promise()
                .query(
                    'SELECT * FROM sujets INNER JOIN subsujets ON subsujets.sujetID = sujets.id_sujet WHERE id_sujet = ?',
                    [id]
                )
            return result;

        } catch (err) {
            console.error('Error get sujet:', err);
        }
    },
    deleteSubject: async (id) => {
        try {
            const result = await db
                .promise()
                .query(
                    'DELETE FROM sujets WHERE id_sujet = ?',
                    [id]
                );
            return result;
        } catch (err) {
            console.error('Error deleting sujet:', err);
            throw err;
        }
    },

};
