import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerUser = asyncHandler( async(req, res) => {
    
    //get user details from frontend
    //validation - not empty
    //check if user already exist
    //check for images, check for avatar
    //upload them to cloudinary,avater
    //create user object - create entry in db
    //remove password and refersh token field from responce
    //check user creation 
    //resturn res

   const {fullName, email, username, password} = req.body
         // console.log("email:", email);

   if(
      [fullName,email,username,password].some((field)=>
      field?.trim()=="")
   ){
      throw new ApiError(400,"all fileds are required")
   }

   const existedUser = await User.findOne({
      $or:[{username},{email}]
   })
   if(existedUser){
      throw new ApiError(409,"user with email or username  already exist")

   }
   // console.log(req.files)
   const avtarLocalPath = req.files?.avatar[0]?.path;
   // const coverImageLoacalPath= req.files?.coverImage[0]?.path;

   let coverImageLoacalPath;
   if(req.files && Array.isArray(req.files.coverImage)&& req.files.coverImage.length >0){
      coverImageLoacalPath = req.files.coverImage[0].path
   }

   if(!avtarLocalPath){
      throw new ApiError(400, "Avtar is Required")
   }

   const avatar = await uploadOnCloudinary(avtarLocalPath)

   const coverImage = await uploadOnCloudinary(coverImageLoacalPath)

   if(!avatar){
      throw new ApiError(400,"avatar is required")
   }

   const user = await User.create({
      fullName,
      avatar:avatar.url,
      coverImage : coverImage?.url || "",
      email,
      password,
      username: username.toLowerCase()
   })

   const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
   )
   if(!createdUser){
      throw new ApiError(400, "Something Went Wrong while resgistering")
   }

   return res.status(201).json(
      new ApiResponse(200,createdUser, "user registered Successfully")
   )

})

export { registerUser };

