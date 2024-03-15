import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";//bearer token
const userschema=new Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            trim:true,
            index:true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
            trim:true,
        },
        fullname:{
            type:String,
            required:true,
            trim:true, 
        },
        avtar:{
            type:String  //cloudinary url
        },
        coverimage:{
            type:String  //cloudinary url  
        },
        password:{
            type:String,
            required:[true,"password is required"]
        },
        refreshtoken:{
            type:String,
        },
    },{timestamps:true});
userschema.pre("save",async function(next){
    if(!this.isModified("password"))return next();
    this.password=await bcrypt.hash(this.password,10)
    next();
})
//add method in user schema
userschema.methods.ispasswordcorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}
userschema.methods.generateacesstoken=function(){
    return jwt.sign(
        {
            _id:this._id,//id come from mongo db
            email:this.email,
            username:this.username,
            fullname:this.fullname,
        },
        process.env.ACESS_TOKEN_SECRET,
        {
            expiresin:process.env.ACESS_TOKEN_EXPIRY
        }
    )
}
userschema.methods.generaterefreshtoken=function(){
    return jwt.sign(
        {
            _id:this._id,//id come from mongo db
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresin:process.env.REFRESH_TOKEN_EXPIRY,
        }
    )
}
export const user=mongoose.model("user",userschema);
//bcrypt library help you to hash password
//for token used  jsonwebtoken