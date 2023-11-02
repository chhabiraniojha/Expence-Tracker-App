const Users=require('../models/User')

exports.signup=async (req,res,next)=>{
      const newUser=req.body;
      try {
        const user = await Users.create(newUser);
        res.json(user);
      } catch (error) {
        console.log(error)
      }

}

exports.getUser=async (req,res,next)=>{
      // checking the email is already exits or not

      const email=req.params.email;
      try {
        const user= await Users.findAll({
          where: {
            email: email
          }
        });
        user.length>0?res.json(true):res.json(false)
        
      } catch (error) {
        console.log(error)
      }

}