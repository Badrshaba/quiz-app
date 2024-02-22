/*
******* APIS *******
1- add answer
2- get answers
*/

import Answer from "../../../DB/Model/answer.model.js"
import Quiz from "../../../DB/Model/quiz.model.js"


export const addAnswer = async (req,res,next)=>{
    const {answers} = req.body
    const {QuizId} = req.query
    const {_id} = req.authUser
// check quiz
const quiz = await Quiz.findById(QuizId)
if(!quiz) return next({message:"quiz not exist",cause:404})
// check crrocet answer
let degree = []
for(let question of quiz.questions){ // question is object
   let arr = answers.filter((obj)=>obj.question==question.question&&obj.answer==question.correct_answer)
 degree.push(...arr)
}
// add answer
    await Answer.create({answers,degree:degree.length,studentId:_id,QuizId})
    res.status(201).json({
        message:"success",
        degree:degree.length
    })
}

export const getAnswer = async (req,res,next) =>{
    const {_id} = req.authUser
const quizzes = await Quiz.find({professorBy:_id})
let answersStudent = []
for (const quiz of quizzes) {
    const answers = await Answer.find({QuizId:quiz._id})
    answersStudent.push(answers)
}
res.status(200).json({message:"success",data:answersStudent})
}