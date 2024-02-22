import { Schema, model } from "mongoose";


const quizSchema = new Schema({
    subjectName:{
        type:String,
        require:true,
        trim:true
    },
    typeQuiz:{
        type:String,
        enum:["MCQ","Essay_tests"],
        default:"MCQ",
        required:true
    },
    questions:[{
     question:{type:String,required:true},
     correct_answer:{type:String,required:true},
     wrong_answer:{type:Array,required:true},
    }],
    yearAcadmic:{
        type:String,
        enum:["first","second","third","fourth"],
        required:true
    },
    professorBy:{
        type:Schema.Types.ObjectId,
        ref:"user",
        required:true,
    },
    degree:{
        type:Number,
        required:true,
    },
    updatedBy:{
        type:Schema.Types.ObjectId,
        ref:"user",
    },
},{
timestamps:true,
toJSON:{virtuals:true},
toObject:{virtuals:true}
})

quizSchema.virtual('answers', {
    ref: 'answer',
    localField: '_id',
    foreignField: 'QuizId',
 
  });

const Quiz = model('quiz',quizSchema)

export default Quiz