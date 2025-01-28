const express=require('express')
const app=express()
const cors=require('cors')
require('dotenv').config()
const mongoose=require('mongoose')
const registerRoutes=require('./routes/register')
const loginRoutes=require('./routes/login')

//Middlewares & routes
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/register',registerRoutes)
app.use('/login',loginRoutes)

app.use((error, req, res, next) => {
    const message = error.message ;
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ message: message });
});

const connectDB=((url)=>{
    return  mongoose.connect(url)
})
const port=process.env.PORT || 5556
const start=async ()=>{
    try{
        await connectDB(process.env.MONGO_URI)
         app.listen(port,()=>{
         console.log(`Server is listening to port ${port}...`)
        })
    }
    catch(err){
        console.log('failed to connect');
    }
}
start()