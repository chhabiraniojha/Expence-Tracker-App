const express=require('express');
const bodyParser=require('body-parser')
const userRoute=require('./routes/User')
const expenceRoute=require('./routes/Expence')
const usersModel=require('./models/User')
const expenceModel=require('./models/Expence')

const app=express();
app.use(bodyParser.json({extended:false}));


app.use("/users",userRoute)
app.use("/expence",expenceRoute)

usersModel.sync()
.then(result=>{
    expenceModel.sync()
    .then(result=>{
        app.listen(3000);
    })
    .catch(err=>{
        console.log(err)
    })
}).catch(err=>{
    console.log(err)
});
