
const express = require('express');

const mongoose = require('mongoose');

const dotenv = require('dotenv').config();

const authrouter = require('./route/auth');

const verifyToken = require('./verifyToken.js');

const userRouter = require('./route/Users.js');



const app = express();


mongoose.connect(process.env.DB_CONNECT,{ useNewUrlParser: true ,useUnifiedTopology: true},
    () =>{
        console.log("connect succeed!!")
    })
app.use(express.json())
app.use('/api',authrouter);
app.use('/api/user',userRouter);


app.listen(3000, () => console.log('Server Up and running'));