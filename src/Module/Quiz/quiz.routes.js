import { Router } from "express";
import * as quizController from "./quiz.controller.js"
import expressAsyncHandler from "express-async-handler";
import { auth } from "../../Middlewares/auth.middlewares.js";
import { validationMiddleware } from "../../Middlewares/validation.middlewares.js";
import { addQuizSchema, deleteQuizSchema, getQuizSchema, getQuizzesSchema, updateQuizSchema } from "./quiz.validation.js";
const router = Router()

router.post("/add_quiz",auth(),validationMiddleware(addQuizSchema),expressAsyncHandler(quizController.addQuiz))
router.put("/update_quiz/:id",auth(),validationMiddleware(updateQuizSchema),expressAsyncHandler(quizController.updateQuiz))
router.delete("/delete_quiz/:quizId",auth(),validationMiddleware(deleteQuizSchema),expressAsyncHandler(quizController.deleteQuiz))
router.get("/get_quizzes",auth(),validationMiddleware(getQuizzesSchema),expressAsyncHandler(quizController.getQuizzesStudent))
router.get("/get_quiz/:quizId",auth(),validationMiddleware(getQuizSchema),expressAsyncHandler(quizController.getQuizStudent))
router.get("/get_quizzes_professor",auth(),expressAsyncHandler(quizController.getQuizzesProfessor))
router.get("/get_quizzes_professor/:quizId",auth(),validationMiddleware(getQuizSchema),expressAsyncHandler(quizController.getQuizprofessor))


export default router