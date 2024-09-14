const session = require('express-session');
const db = require('../config/database');

module.exports = {
    addClass:async (nomclasse , Tid) => {
        try {

            const [result] = await db
                .promise()
                .query(
                    'INSERT INTO classes (nomclasse,formateurID) VALUES (?,?);',
                    [nomclasse, Tid]
                );

            return result;
        } catch (err) {
            console.error('Error inserting class:', err);
        }
    }
};
