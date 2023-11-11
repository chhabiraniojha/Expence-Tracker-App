const express=require('express');
const bodyParser=require('body-parser')
const userRoute=require('./routes/User')
const expenceRoute=require('./routes/Expence')
const purchaseRoute=require('./routes/Purchase')
const leaderBordRoute=require('./routes/LeaderBoard')
const passwordRoute=require('./routes/Password')
const sequelize=require('./util/database')
const Users=require('./models/User')
const Expence=require('./models/Expence')
const Order=require('./models/Order');
const ForgotPassword=require('./models/ForgotPassword')
require('dotenv').config()


const app=express();
app.use(bodyParser.json({extended:false}));


app.use("/users",userRoute)
app.use("/expence",expenceRoute)
app.use("/purchase",purchaseRoute)
app.use('/leaderboard',leaderBordRoute)
app.use('/password',passwordRoute)

Users.hasMany(Expence)
Expence.belongsTo(Users)

Users.hasMany(Order)
Order.belongsTo(Users)

Users.hasMany(ForgotPassword)
ForgotPassword.belongsTo(Users)



sequelize.sync()
.then(res=>{
    app.listen(3000)
}).catch(err=>{
    console.log(err)
})
