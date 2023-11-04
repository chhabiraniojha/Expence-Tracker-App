const express=require('express');
const expenceController=require('../controllers/Expence')

const router=express.Router();

router.post('/addExpence',expenceController.addExpence)
router.get('/',expenceController.getExpence)
router.delete('/:id',expenceController.deleteExpence)


module.exports=router;