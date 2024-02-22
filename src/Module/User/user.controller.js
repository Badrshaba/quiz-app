import Answer from "../../../DB/Model/answer.model.js";
import Quiz from "../../../DB/Model/quiz.model.js";
import User from "../../../DB/model/user.model.js";
import { systemRoles } from "../../Utils/system-roles.js";

//============== update user =============== //
export const updateUser = async (req, res, next) => {
  // get updated data in req.body
  const {
    name,
    code, 
    email,
    phoneNumber,
    password,
    yearAcadmic,
    gender,
  } = req.body;
  const {_id} = req.authUser
  // check the unique values is exist
  if (phoneNumber) {
    const userCheck = await User.findOne({ phoneNumber });
    if (userCheck)
      return next(
        new Error(" this phone number alraedy exist ", { cause: 400 })
      );
  }
  if (email) {
    const userCheck = await User.findOne({ email });
    if (userCheck)
      return next(new Error(" this email alraedy exist ", { cause: 400 }));
  }
  if (code) {
    const userCheck = await User.findOne({ code });
    if (userCheck)
      return next(new Error(" this code alraedy exist ", { cause: 400 }));
  }
  const update = {
    name,
    code,
    email,
    phoneNumber,
    password,
    yearAcadmic,
    gender,
  };
    const user = await User.findByIdAndUpdate(_id,update)
    if(!user.modifiedCount) return next(new Error("error in update", { cause: 400 }));
    res.status(200).json({
        message:"success",
    })
};

//============== delete user =============== //

export const deleteUser = async(req,res,next)=>{
    const {_id} = req.authUser
    const user = await User.findByIdAndDelete({_id})
    if(!user) return next(new Error("error in delete", { cause: 400 }));
    // check user is student or professor
    if(user.role === systemRoles.STUDENT){
        await Answer.deleteMany({studentId:user._id})
    }else if(user.role === systemRoles.PROFESSOR){
        await Quiz.deleteMany({professorBy:user._id})
        await Answer.deleteMany({professorBy:user._id})
    }
    res.status(200).json({message:"success"})
}

export const getUser = async(req,res,next)=>{
  const {_id} = req.authUser
  const user = await User.findById(_id)
  res.status(200).json({
    message:"seccuss",
    data:user
  })
}
//=========== get student ============== //

export const getStudent = async(req,res,next)=>{
    const {id} = req.params
    const user = await User.findById(id).populate({path:'answers',populate:{path:'QuizId',select:' subjectName degree '}})
    res.status(200).json({message:"success",data:user})
} 