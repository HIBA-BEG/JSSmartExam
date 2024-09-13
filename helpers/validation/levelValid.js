const joi = require('joi');


const levelSchema = joi.object({

    title: joi.string().required(),
    min: joi.number().min(1).max(100).required(),
    max: joi.number().min(1).max(100).required()

})

module.exports = levelSchema;