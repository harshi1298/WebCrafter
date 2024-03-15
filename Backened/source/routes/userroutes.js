import {Router} from "express";
import {registeruser} from "../controllers/user.controller.js"
import {loginuser}  from "../controllers/user.controller.js"
import {upload} from "../middlewares/multer.middleware.js"
const router=Router()
router.route("/register").post(
    upload.fields(
        [
            {
                name:"avatar",//name same as frontend
                maxCount:1
            },
            {
                name:"coverimage",
                maxCount:1
            }
        ]),
    registeruser)
    router.route("/login").post(loginuser)
export default router