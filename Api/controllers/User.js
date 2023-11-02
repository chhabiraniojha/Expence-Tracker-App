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