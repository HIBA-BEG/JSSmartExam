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
