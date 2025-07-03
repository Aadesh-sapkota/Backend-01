import { asyncHandler } from "../utils/asyncHandlers.js";
import { ApiError } from "../utils/apiErrors.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudnary.js";
import { ApiResponse  } from "../utils/apiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // get user details 
  const { fullName, username , email, password  } = req.body;

  // validate required fields
  if ([fullName, username, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  // check if user already exists
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "This username or email already exists");
  }

  // get file paths
  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

  if (avatarLocalPath && coverImageLocalPath){
    new ApiError(409,"Files not found")
  }
  //upload files on cloudnary

    const avatar = await uploadOnCloudinary(avatarLocalPath)
   const  coverImage = await uploadOnCloudinary(coverImageLocalPath)

   if(!avatar){
    new ApiError(400,"avatar is not given")
   }

   const user =  await User.create({
   
    fullName,
    avatar:avatar.url,
    username:username.toLowerCase(),
    email,
    password
   })

   const createdUser = await User.findById(User).select(
    "-password -refreshToken"
   )

   if(!checkUserStatus){
        new ApiError(500,"Internal server error by not being able to find the fields in the programs")
   }


   return res.status(200).json(
    new ApiResponse(201,createdUser,"user created sucessfully")
   )







});

export { registerUser };
