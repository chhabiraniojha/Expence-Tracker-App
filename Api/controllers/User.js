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

exports.signin=async (req,res,next)=>{
  const {email,password}=req.body;
  try {
    const user=await Users.findAll({
      where: {
        email: email
      }
    })
    if(user.length>0){
     
      if(user[0].password==password){
        return res.status(200).json("success loged in")
      }else{
        return res.json("password mismatch")
      }
    }
    return res.status(200).json('user not found')
  } catch (error) {
    res.json(error)
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