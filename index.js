import express from "express"
import authRouter from "./src/Module/Auth/auth.routes.js"
import userRouter from "./src/Module/User/user.routes.js"
import quizRouter from "./src/Module/Quiz/quiz.routes.js"
import answerRouter from "./src/Module/Answer/answer.routes.js"
import db_connection from "./DB/connection.js";
import { config } from "dotenv";
import { globalResponse } from "./src/Middlewares/global.middlewares.js";
config()

const app = express()

app.use(express.json())
app.use("/auth",authRouter)
app.use("/user",userRouter)
app.use("/quiz",quizRouter)
app.use("/answer",answerRouter)
app.use(globalResponse)





db_connection()
app.listen(3001,()=>{
    console.log("server running........");
})
