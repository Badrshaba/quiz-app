import Joi from 'joi'


//============== object Id validator =============== //

const objectIdValidation = (value,helper)=>{
    const isvalid = Types.ObjectId.isValid(value)
    return isvalid ? value : helper.message('invalid objectId')
} 


export const addAnswerSchema = {
    body: Joi.object({
        answers: Joi.array(),
    }) ,
    query: Joi.object({
        QuizId:Joi.string().custom(objectIdValidation).required()
    })  
}


