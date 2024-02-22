/**
 * 1- add quiz authrization professor
 * 2- update quiz authrization professor
 * 3- delete quiz authrization professor
 * 4- get quiz authrization professor and student
 * 5- add answer authrization student
 * 5- get all answers authrization professor
 */
import random from 'random'
import Quiz from "../../../DB/Model/quiz.model.js"
import Answer from '../../../DB/Model/answer.model.js'

export const addQuiz = async (req,res,next)=>{
    const {subjectName,typeQuiz,questions,yearAcadmic,degree} = req.body
    const {_id} = req.authUser

     await Quiz.create({subjectName,typeQuiz,questions,yearAcadmic,degree,professorBy:_id})
    res.status(201).json({
        message:"success"
    })
}

//=========== get student ============== //


export const updateQuiz = async (req,res,next)=>{ 
    const {id} = req.params
    const {subjectName,typeQuiz,questions,yearAcadmic,degree} = req.body
    const {_id} = req.authUser

    const quiz =  await Quiz.updateOne({_id:id},{subjectName,typeQuiz,questions,yearAcadmic,degree,updatedBy:_id})
    if (!quiz.modifiedCount) return next(new Error("error updated",{cause:400}))
    res.status(201).json({
        message:"success"
    })
}

//=========== delete quiz ============== //

export const deleteQuiz = async(req,res,next)=>{
    const {quizId} = req.params
    const quiz = await Quiz.findByIdAndDelete(quizId)
    if(!quiz) return next({message:"error in delete",cause:400})
    const answers = await Answer.deleteMany({QuizId:quiz._id})
    if(!answers.deletedCount)return res.status(200).json({message:"no answers in this quiz"})
    res.status(200).json({
        message:"success",

    })


}

//=========== get quizzes for student ============== //

export const getQuizzesStudent = async(req,res,next)=>{
    const {yearAcadmic} = req.query
    const quizzes = await Quiz.find({yearAcadmic}).lean()
    // return quiz withaout answers
     for(let quiz of quizzes){
        quiz.questions = quiz.questions.map(ele=>ele.question)
     }
    res.status(200).json({
        message:"success",
         data:quizzes
    })
}
// ============ get spicfic quiz ===========
export const getQuizStudent = async(req,res,next)=>{
    const {quizId} = req.params

    const quiz = await Quiz.findById(quizId).lean()

// put correct answer to random index in array to show student and delete correct answer
    for(let question of quiz.questions){
        let randomItem =  random.int(0, question.wrong_answer.length)
        question.wrong_answer.splice(randomItem, 0, question.correct_answer);
        question.choose = question.wrong_answer
        delete question.wrong_answer;
        delete question.correct_answer;
    }

    res.status(200).json({
        message:"success",
        data:quiz
    })}

//=========== get quizzes for professor ============== //

export const getQuizzesProfessor = async()=>{
const {_id} = req.authUser
const quizzes = await Quiz.find({professorBy:_id})
res.status(200).json({
    message:"success",
    data:quizzes
})
}
 // get quiz by professor don't must the added quiz to be the same get becouse in future i want to add opreation in system role 
export const getQuizprofessor = async(req,res,next)=>{
    const {quizId} = req.params
    const quizzes = await Quiz.findById(quizId).populate({path:"answers",populate:{path:'studentId',select:'name code'}})
    res.status(200).json({
        message:"success",
        data:quizzes
    })
    }

