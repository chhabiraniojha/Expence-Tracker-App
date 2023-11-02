const express=require("express");
const userController=require("../controllers/User")

const router=express.Router();


router.post("/signup",userController.signup)
router.get("/:email",userController.getUser)

module.exports=router;