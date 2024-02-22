import { Router } from "express";
import * as userController from "./user.controller.js"
import expressAsyncHandler from "express-async-handler";
import { auth } from "../../Middlewares/auth.middlewares.js";
import { validationMiddleware } from "../../Middlewares/validation.middlewares.js";
import { getStudentSchema, updeteUserSchema } from "./user.validation.js";
import { systemRoles } from "../../Utils/system-roles.js";

const router = Router()

router.put("/update_user",auth(),validationMiddleware(updeteUserSchema),expressAsyncHandler(userController.updateUser))
router.get("/get_student/:id",auth([systemRoles.PROFESSOR]),validationMiddleware(getStudentSchema),expressAsyncHandler(userController.getStudent))
router.delete("/",auth(),expressAsyncHandler(userController.deleteUser))
router.get("/",auth(),expressAsyncHandler(userController.getUser))



export default router  