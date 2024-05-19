const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRouter = require('./routes/user.route')
const authRouter = require('./routes/auth.route')

//config dotenv
dotenv.config();

//create express app
const app = express();

//body parser
app.use(express.json());

mongoose.connect(process.env.MONGO)
        .then(()=>{
            console.log('Connected to MongoDB');
        })
        .catch((err)=>{
            console.log(err);;
        })

//creating and starting server
app.listen(3000,()=>{
    console.log('Server running on port 3000');
})

app.use('/api/user',userRouter)
app.use('/api/auth',authRouter)
app.use((err,req,res,next)=>{
   const statusCode = err.statusCode || 500;
   const message = err.message || 'Internal Server Error'
   return res.status(statusCode).json({
    status:'fail',
    statusCode,
    message
   })
})