import Joi from 'joi'


//============== object Id validator =============== //

const objectIdValidation = (value,helper)=>{
    const isvalid = Types.ObjectId.isValid(value)
    return isvalid ? value : helper.message('invalid objectId')
} 

export const updeteUserSchema = {
    body: Joi.object({
        name: Joi.string().pattern(/^[a-zA-Z ]{3,30}$/),
        code: Joi.string().length(9).pattern(/^120[0-9]{6}$/),
        email: Joi.string().email().pattern(/^[a-zA-Z0-9]{4,30}@gmail.com$/),
        phoneNumber: Joi.string().pattern(/^01[0125][0-9]{8}$/),
        password: Joi.string().pattern(/^[a-zA-Z0-9]{6,15}$/), 
        yearAcadmic: Joi.string().valid("first","second","third","fourth"), 
        gender: Joi.string().valid('female', 'male')  
    }) 
}

export const getStudentSchema = {
    params: Joi.object({
        id:Joi.string().custom(objectIdValidation).required()
    })  
}  

