const level = require('../models/level');
const levelSchema = require('../helpers/validation/levelValid');





exports.createLevel = (req , res)=>{

const {error} = levelSchema.validate(req.body);

if(error){

    return res.status(401).send(error.details[0].message);
}

const {title , min , max} = req.body;

level.createLevel(title , min , max , (result)=>{

    res.redirect('back');
})

}

