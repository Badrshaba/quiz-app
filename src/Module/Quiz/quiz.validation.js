import Joi from 'joi'


//============== object Id validator =============== //

const objectIdValidation = (value,helper)=>{
    const isvalid = Types.ObjectId.isValid(value)
    return isvalid ? value : helper.message('invalid objectId')
} 
//============== add quiz schema =============== //
export const addQuizSchema = {
    body: Joi.object({
        subjectName: Joi.string(),
        typeQuiz: Joi.string().valid('MCQ', 'Essay_tests')  ,
        questions: Joi.array(),
        degree: Joi.number(),
        yearAcadmic: Joi.string().valid("first","second","third","fourth"), 
    }).options({ presence: 'required' })
}

//============== update quiz schema =============== //
export const updateQuizSchema = {
    body: Joi.object({
        subjectName: Joi.string(),
        typeQuiz: Joi.string().valid('MCQ', 'Essay_tests')  ,
        questions: Joi.array(),
        degree: Joi.number(),
        yearAcadmic: Joi.string().valid("first","second","third","fourth"), 
    }) ,
    params:Joi.object({
        id:Joi.string().custom(objectIdValidation).required()
    })
}

//============== delete quiz schema =============== //
export const deleteQuizSchema = {
    params:Joi.object({
        quizId:Joi.string().custom(objectIdValidation).required()
    })
}

//============== get quiz schema =============== //
export const getQuizzesSchema = {
    query:Joi.object({
        yearAcadmic:Joi.string().valid("first","second","third","fourth").required()
    })
}

//============== get quiz schema =============== //
export const getQuizSchema = {
    params:Joi.object({
        quizId:Joi.string().custom(objectIdValidation).required()
    })
}

