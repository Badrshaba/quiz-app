import pkg from 'mongoose'
import { systemRoles } from '../../src/Utils/system-roles.js';
const  { Schema, model, models } =pkg;

const userSchema = new Schema({
    name:{
        type:String,
        require:true,
        trim:true
        
    },
    code:{
        type:String,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
    },
    phoneNumber:{
        type:String,
        required:true,
        unique:true
    },
    yearAcadmic:{
        type:String,
        enum:["first","second","third","fourth"] 
    },
    gender:{
        type:String,
        enum:["male","female"],
        default:"male",
    },
    role:{
        type:String,
        enum:[systemRoles.STUDENT,systemRoles.PROFESSOR],
        default:systemRoles.STUDENT,
    },
    degree:Object,

},{
    timestamps:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
})



userSchema.virtual('answers', {
    ref: 'answer',
    localField: '_id',
    foreignField: 'studentId',
 
  });



export default models.user || model('user',userSchema) 