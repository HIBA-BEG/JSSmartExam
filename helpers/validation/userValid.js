const joi = require('joi');






const signUpShema = joi.object({

    FirstName: joi.string().min(3).max(25).required(),
    LastName: joi.string().min(3).max(25).required(),
    adress: joi.string().min(5).required(),
    birthDay: joi.date().max('12-31-2010').min('12-31-1930').required(),
    email: joi.string().email().required(),
    Password: joi.string().min(8).required(),
    Password: joi.string().min(8).required(),


});

module.exports = {signUpShema};