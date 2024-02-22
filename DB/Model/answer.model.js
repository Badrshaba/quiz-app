import { Schema, model } from "mongoose";


const answerSchema = new Schema({
    QuizId:{
        type:Schema.Types.ObjectId,
        ref:"quiz",
        required:true,
    },
    answers:[{
        question:{type:String,required:true},
        answer:{type:String,required:true},
       }],
    studentId:{
        type:Schema.Types.ObjectId,
        ref:"user",
        required:true,
    },
    degree:{
        type:Number,
        required:true
    },
},{timestamps:true})

const Answer = model('answer',answerSchema)

export default Answer