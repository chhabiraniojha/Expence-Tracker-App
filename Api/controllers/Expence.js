const Expence=require('../models/Expence')

exports.addExpence=async (req,res,next)=>{
  const{expenceAmount,expenceDescription,expenceCategory}=req.body;

  try {
    const expence=Expence.create({expenceAmount,expenceDescription,expenceCategory})
    res.status(200).json("expence added")
  } catch (error) {
    console.log(err)
  }
  
}

exports.getExpence=async (req,res,next)=>{
    try {
        const expences=await Expence.findAll()
        res.json(expences)
    } catch (error) {
        console.log(err)
    }
}

exports.deleteExpence=async (req,res,next)=>{
  const id=req.params.id;
  try {
    await Expence.destroy({
      where: {
        id: id
      }
    });
    res.status(200).json(`id ${id} successfully deleted`)
  } catch (error) {
    console.log(error);
  }

}