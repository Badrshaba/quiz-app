import { Router } from "express";
import * as answerController from "./answer.controller.js"
import expressAsyncHandler from "express-async-handler";
import { auth } from "../../Middlewares/auth.middlewares.js";
import { validationMiddleware } from "../../Middlewares/validation.middlewares.js";
import { addAnswerSchema } from "./answer.validation.js";

const router = Router()

router.post("/add_answer",auth(),validationMiddleware(addAnswerSchema),expressAsyncHandler(answerController.addAnswer))
router.get("/add_answer",auth(),expressAsyncHandler(answerController.addAnswer))


export default router 