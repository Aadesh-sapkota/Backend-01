
import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
const router= Router()

 router.route("/register").post(
    upload.fields([
        //the accepted array field contains two objects 
        //1.avatar note:they should be on string
        //2.coverImage :this too
        {
            name:"avatar",
            maxCount:1
        },
        {
            name:"coverImage",
            maxCount:1
        }
    ]),
    registerUser
)

export default router