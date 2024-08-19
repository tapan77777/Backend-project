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


    const {fullNmae, email,username, password} = req.body
     console.log("email: ", email);


     if([fullNmae,email,password,username].some((field)=> field?.trim() === "")){
        throw new ApiError(400, "all field is required")
     }

     const exisetedUser = User.findOne({
        $or: [{username},{email}]
     })

     if(exisetedUser){
        throw new ApiError(409,"already exist")
     }

     const avatarLocalPath = req.files?.avatar[0]?.path;
     const coverImageLocalPath = req.files?.coverImage[0]?.path;

     if(!avatarLocalPath){
            throw new ApiError(400, "avatar is required")
     }

     const avatar = await uploadOnCloudinary(avatarLocalPath)
     const coverImage = await uploadOnCloudinary(coverImageLocalPath)

     if(!avatar){
        throw new (400, "avatar is required")
     }
     const user = await User.create({
        fullNmae,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
     })

     const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"

     )
     if(!createdUser){
        throw new ApiError(500, "something went wrong")
     }
     return res.status(201).json(
        new ApiResponse(200, createdUser, "user register sucessfully")
     )


})

export { registerUser };

