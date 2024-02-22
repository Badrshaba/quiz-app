import { Router } from "express";
import * as authController from "./auth.controller.js"
import expressAsyncHandler from "express-async-handler";
import { validationMiddleware } from "../../Middlewares/validation.middlewares.js";
import { signInSchema, signUpSchema } from "./auth.validation.js";

const router = Router()

router.post("/sign_up",validationMiddleware(signUpSchema),expressAsyncHandler(authController.signUp))
router.post("/signin",validationMiddleware(signInSchema),expressAsyncHandler(authController.signIn))

export default router