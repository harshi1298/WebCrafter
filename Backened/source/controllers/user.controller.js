import {asynchandler} from "../utilities/asynchandler.js"
import {apierror} from "../utilities/apierror.js"
import {apiresponse} from "../utilities/apiresponse.js"
import { uploadoncloudinary} from "../utilities/cloudinary.js"
import {user} from "../models/user.model.js"
const generateacessandrefreshtokens=async(userid)=>{
    try{
       const User=await user.findById(userid)
      const acesstoken= User.generateacesstoken()
      const refreshtoken=User.generaterefreshtoken()
      User.refreshtoken=refreshtoken
      await User.save({validateBeforeSave:false})
      return {acesstoken,refreshtoken}
    }catch(error){
        throw new apierror(500,"something went wrong to create acess and refreshtokens")
    }
}
const registeruser=asynchandler(async(req,res)=>{
    //get user details from frontend
    //validation -not empty
    //check if already exist by usernme or password 
    //check for images oravatar
    //upload on it cloudinary,avatar
    //create user object-create entry in db
    //remove password and refresh taken from response
    //check for user creation 
    //return response
    const{fullname,email,username,password}=req.body//it can store the data from form and json 
    console.log("email:",email) 
    if(fullname===""){
        throw new apierror(400,"full name is required")
    };
    if(email===""){
        throw new apierror(400,"email name is required")
    };
    if(username===""){
        throw new apierror(400,"username is required")
    };
    if(password===""){
        throw new apierror(400,"password is required")
    };
   const existeduser =await user.findOne({
    $or:[{username},{email}]
   })
   if(existeduser){
    throw new apierror(409,"user with email or username already exist")
   }
   console.log(req.files)
   const avatarlocalpath=req.files?.avatar?.[0]?.path;
   const coverimagelocalpath=req.files?.coverimage?.[0]?.path;
   if(!avatarlocalpath){
    throw new apierror(400,"avatar file is required");   
   }
   const avatar=await uploadoncloudinary(avatarlocalpath)
   const coverimage=await uploadoncloudinary(avatarlocalpath)
   const User=await user.create({
    fullname,
   avatar:avatar.url,
    coverimage:coverimage?.url||"",
    email,
    password,
    username:username.toLowerCase()
   })
   const createduser=await user.findById(User._id).select(
    "-password -refreshtoken"
   )
   if(!createduser){
    throw new apierror(500,"User not registered");
   }
   return res.status(200).json(
    new apiresponse (202,createduser,"user created sucessfully")
   )
});
const loginuser=asynchandler(async(req,res)=>{
    //take username and password
    //check user exist or not with the help of name and email
    //validate useername and password
    //refresh and acess token
    //send cookie
    const {email,username,password}=req.body
    if(!username || !email){
        throw new apierror(400,"username or email is required")
    }
    const User=await user.findOne({
        $or:[{username},{email}]
    })
    if(!user){
        throw new apierror(405,"User not registered")
    }
    const isvalidpassword=await User.ispasswordcorrect(password)
    if(!isvalidpassword){
        throw new apierror(408,"Password is incoorect")
    }
    const {acesstoken,refreshtoken}=await generateacessandrefreshtokens(User._id) 
    const loggedinuser=await user.findById(user._id).select("-password","-refreshtoken")
    const option={
        httpOnly:true,//it is seen on local server but not modified by local server
        secure:true
    }
    return res.status(200).cookie("acesstoken",acesstoken,option).cookie("refreshtoken",refreshtoken,option).
        json(
        new apiresponse (202,{
            user:loggedinuser ,acesstoken ,refreshtoken
        },"user logged in sucessfully")
       )
})
export {registeruser,
loginuser };