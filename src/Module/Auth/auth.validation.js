import Joi from 'joi'
import { systemRoles } from '../../Utils/system-roles.js'

export const signUpSchema = {
    body: Joi.object({
        name: Joi.string().pattern(/^[a-zA-Z ]{3,30}$/).required(),
        code: Joi.when('role',{
            is:systemRoles.STUDENT,
            then:Joi.string().length(9).pattern(/^120[0-9]{6}$/).required()
        }),  
        email: Joi.string().email().pattern(/^[a-zA-Z0-9]{4,30}@gmail.com$/).required(),
        password: Joi.string().pattern(/^[a-zA-Z0-9]{6,15}$/).required(),
        phoneNumber: Joi.string().pattern(/^01[0125][0-9]{8}$/).required(),
        yearAcadmic: Joi.string().valid("first","second","third","fourth").required(),
        gender: Joi.string().valid('female', 'male') ,
        role: Joi.string().valid(systemRoles.STUDENT, systemRoles.PROFESSOR).required(),
        degree: Joi.object() 
    })
    
}
 
export const signInSchema = {
    body: Joi.object({
        code:Joi.string().length(9).pattern(/^120[0-9]{6}$/), 
        email: Joi.string().email().pattern(/^[a-zA-Z0-9]{4,30}@gmail.com$/),
        phoneNumber: Joi.string().pattern(/^01[0125][0-9]{8}$/),
        password: Joi.string().pattern(/^[a-zA-Z0-9]{6,15}$/).required(),
    })
    
}


