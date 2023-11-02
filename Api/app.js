const express=require('express');
const bodyParser=require('body-parser')
const userRoute=require('./routes/User')
const usersModel=require('./models/User')

const app=express();
app.use(bodyParser.json({extended:false}));


app.use("/users",userRoute)

usersModel.sync()
.then(result=>{
     app.listen(3000);
}).catch(err=>{
    console.log(err)
});
