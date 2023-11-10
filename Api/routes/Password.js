const express=require('express');
const passwordController=require('../controllers/Password')
const router=express.Router();

router.post('/forgotpassword',passwordController.resetPassword)

module.exports=router;