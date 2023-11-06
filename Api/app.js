const express=require('express');
const bodyParser=require('body-parser')
const userRoute=require('./routes/User')
const expenceRoute=require('./routes/Expence')
const Users=require('./models/User')
const Expence=require('./models/Expence')
require('dotenv').config()


const app=express();
app.use(bodyParser.json({extended:false}));


app.use("/users",userRoute)
app.use("/expence",expenceRoute)

Users.hasMany(Expence)
Expence.belongsTo(Users)

Users.sync()
.then(result=>{
    Expence.sync()
    .then(result=>{
        app.listen(3000);
    })
    .catch(err=>{
        console.log(err)
    })
}).catch(err=>{
    console.log(err)
});
