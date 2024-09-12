const db = require('../config/database');

module.exports = {
    addClass:async (data) => {
        try {
            const [result] = await db
                .promise()
                .query(
                    'INSERT INTO classes (nomclasse,formateurID) VALUES (?,?);',
                    [data.nomClass, data.formateurID]
                );
            return result;
        } catch (err) {
            console.error('Error inserting class:', err);
        }
    }
};
