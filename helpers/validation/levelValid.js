const joi = require('joi');


const levelSchema = joi.object({

    title: joi.string().required(),
    min: joi.number().required(),
    max: joi.number().required()

})

module.exports = levelSchema;