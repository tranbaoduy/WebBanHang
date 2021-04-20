//Validate
const Joi = require('@hapi/joi'); 


//Schema
const schema = Joi.object({
    name: Joi.string().min(6).required(),
    passWord: Joi.string().min(6).required(),
    id: Joi.number().min(6).required(),
})

const schemaLogin = Joi.object({
    name: Joi.string().min(6).required(),
    passWord: Joi.string().min(6).required(),
})
//End Schema


//Validation
const registerValuedation = (data) => {
    const  { error } = schema.validate(data);
    if(error) return error.details[0].message
}

    

const loginValuedation = (data) => {
    const  { error } = schemaLogin.validate(data);
    if(error) return error.details[0].message
}
//End validation

module.exports.registerValuedation = registerValuedation;
module.exports.loginValuedation = loginValuedation;