const express=require('express');
const expenceController=require('../controllers/Expence')
const userAuthentication=require('../middleWire/Auth')

const router=express.Router();

router.post('/addExpence',userAuthentication,expenceController.addExpence)
router.get('/',userAuthentication,expenceController.getExpence)
router.delete('/:id',expenceController.deleteExpence)


module.exports=router;