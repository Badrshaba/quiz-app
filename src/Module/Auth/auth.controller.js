 import User from "../../../DB/Model/user.model.js";
 import  jwt  from "jsonwebtoken";
 
 //============== sign up =============== //
 
 export const signUp = async (req, res, next) => {
   const { name, code,email,phoneNumber, password, yearAcadmic, gender,role } = req.body;
  // check student code
   if(code){
     const checkStudent = await User.findOne({code})
     if(checkStudent) return next(new Error("wrong your code",{cause:409}))
   }
   // email check
   const emailCheck = await User.findOne({ email });
   if (emailCheck) return next(new Error("email is already found", { cause: 409 }));
   // phone number check
   const checkPhoneNumber = await User.findOne({ phoneNumber });
   if (checkPhoneNumber) return next(new Error("phone number is already found", { cause: 409 }));
   // create user
   await User.create({ name, code,email,phoneNumber, password, yearAcadmic, gender,role });
   res.status(201).json({ message: "done" });
 };
 
 //============== signin =============== //
 
 export const signIn = async (req, res, next) => {
   const { phoneNumber,code, email, password } = req.body;
   let user;
   // user check
   if (phoneNumber) {
     const userCheck = await User.findOne({ phoneNumber });
     if (!userCheck) return next(new Error("invalid login", { cause: 400 }));
     user=userCheck
   }
   if (email) {
     const userCheck = await User.findOne({ email });
     if (!userCheck) return next(new Error("invalid login e", { cause: 400 }));
     user=userCheck
   }
   if (code) {
     const userCheck = await User.findOne({ code });
     if (!userCheck) return next(new Error("invalid login", { cause: 400 }));
     user=userCheck
   }
   const isPasswordMatched = user.password == password
   if(!isPasswordMatched) return next(new Error("invalid login p",{cause:400}))
   // create token
   const token = jwt.sign({id:user._id,email:user.email},process.env.TOKEN)
   // create user
   res.status(200).json({ message: "success" ,token});
 };
 