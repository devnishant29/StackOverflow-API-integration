const express=require("express")
const router = express.Router()

const {SignUpController,getUser,LoginController}=require("../controller/userController");

router.route("/signup").post(SignUpController);
router.route("/login").post(LoginController);
router.route("/getAllUsers").get(getUser);

module.exports=router;
